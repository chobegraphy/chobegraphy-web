// pages/api/likePicture.js
export async function POST(req) {
  const GITHUB_USERNAME = "chobegraphy";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const LIKED_REPO_BASE = "PictureLikedStorage";
  const LIKED_FILE_PATH = "Storage.json";
  const MAX_REPO_SIZE = 4.5 * 1024 * 1024 * 1024; // 4.5 GB in bytes

  // Function to check repo size
  async function getRepoSize(repo) {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}`,
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );
    const data = await response.json();
    return data.size * 1024; // size is in KB, convert to bytes
  }

  // Function to create a new repository
  async function createNewRepo(baseRepoName) {
    const newRepoName = `${baseRepoName}-${Date.now()}`;
    const response = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
      body: JSON.stringify({
        name: newRepoName,
        private: true, // All repositories are private
      }),
    });

    if (!response.ok) {
      throw new Error("Error creating repository");
    }

    // Initialize the Storage.json file in the new repository
    await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${newRepoName}/contents/${LIKED_FILE_PATH}`,
      {
        method: "PUT",
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
        body: JSON.stringify({
          message: "Initialize Storage.json",
          content: Buffer.from(JSON.stringify([])).toString("base64"),
        }),
      }
    );

    return newRepoName;
  }

  // Function to find the next available repo name
  async function findAvailableRepoName() {
    let repoIndex = 1;
    let newRepoName;

    while (true) {
      newRepoName = `${LIKED_REPO_BASE}-${repoIndex}`;
      const size = await getRepoSize(newRepoName).catch(() => 0); // Handle not found errors
      if (size < MAX_REPO_SIZE) {
        return newRepoName;
      }
      repoIndex++;
    }
  }

  try {
    const { UserId, PictureId } = await req.json();

    // Determine the appropriate repository to use
    let repoName = await findAvailableRepoName();

    // Check if the Storage.json file exists, if not, create it
    const fileResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/contents/${LIKED_FILE_PATH}`,
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );

    if (fileResponse.status === 404) {
      // If file not found, create it
      await createNewRepo(repoName);
    }

    // Fetch storage data from GitHub
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/contents/${LIKED_FILE_PATH}`,
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );
    const fileData = await getFileResponse.json();
    const storageData = JSON.parse(
      Buffer.from(fileData.content, "base64").toString("utf-8")
    );

    // Find the user data by UserId
    let userData = storageData.find((user) => user.UserId === UserId);
    if (!userData) {
      // If user doesn't exist, create a new one
      userData = { UserId, PictureLiked: [] };
      storageData.push(userData);
    }

    // Check if the PictureId already exists in the liked array
    if (!userData.PictureLiked.includes(PictureId)) {
      userData.PictureLiked.push(PictureId);
    }

    // Encode updated data back to base64
    const updatedContent = Buffer.from(
      JSON.stringify(storageData, null, 2)
    ).toString("base64");

    // Update file on GitHub
    const updateResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/contents/${LIKED_FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `Liked picture ${PictureId} for user ${UserId}`,
          content: updatedContent,
          sha: fileData.sha, // Required to update an existing file
        }),
      }
    );

    if (!updateResponse.ok) {
      return new Response(
        JSON.stringify({ message: "Error updating Storage.json" }),
        { status: updateResponse.status }
      );
    }

    // Return success response with the updated user data and entireStorageData
    return new Response(
      JSON.stringify({
        success: true,
        message: "Picture liked successfully",
        updatedData: userData, // Send updated user data
        entireData: storageData, // Send entire updated data
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
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
