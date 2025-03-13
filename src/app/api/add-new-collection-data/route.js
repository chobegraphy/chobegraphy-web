export async function POST(req) {
  const GITHUB_USERNAME = "chobegraphy";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_NAME = "Collections"; // Change this to your actual repo name
  const FILE_PATH = "Collections.json"; // Path to the JSON file

  try {
    const newEntry = await req.json();

    // Get the current data from Collections.json
    const fileResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!fileResponse.ok) {
      return new Response(
        JSON.stringify({ message: "Error fetching existing data" }),
        { status: fileResponse.status }
      );
    }

    const fileData = await fileResponse.json();
    const existingData = JSON.parse(
      Buffer.from(fileData.content, "base64").toString("utf-8")
    );

    // Append new data to existing data
    if (!Array.isArray(existingData)) {
      return new Response(
        JSON.stringify({ message: "Invalid data format in Collections.json" }),
        { status: 500 }
      );
    }

    const updatedData = [...existingData, newEntry];

    // Encode the updated data
    const updatedContent = Buffer.from(
      JSON.stringify(updatedData, null, 2)
    ).toString("base64");

    // Commit the updated data to GitHub
    const updateResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: "Updated Collections.json with new entry",
          content: updatedContent,
          sha: fileData.sha, // Required to update an existing file
        }),
      }
    );

    if (!updateResponse.ok) {
      return new Response(
        JSON.stringify({ message: "Error updating Collections.json" }),
        { status: updateResponse.status }
      );
    }

    return new Response(JSON.stringify(updatedData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Server Error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
