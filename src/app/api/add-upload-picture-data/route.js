export async function POST(req) {
  const newPicture = await req.json();

  // Check if the new data has a description
  if (!newPicture.description || newPicture.description.trim() === "") {
    return new Response(JSON.stringify({ error: "Description is required" }), {
      status: 400,
    });
  }

  newPicture._id = uuidv4();

  try {
    // Check if repo exists and its size
    const repoName = REPO_PREFIX;
    let repoSize = await getRepoSize(repoName);

    // If repo size exceeds 4.5 GB, create a new repo
    let selectedRepo = repoName;
    if (repoSize > MAX_REPO_SIZE) {
      selectedRepo = await createNewRepo();
    }

    // Get the file content from the selected repo
    const getFileResponse = await axios.get(
      `https://api.github.com/repos/${OWNER}/${selectedRepo}/contents/${FILE_PATH}`,
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );

    const fileContent = Buffer.from(
      getFileResponse.data.content,
      "base64"
    ).toString("utf8");
    const pictureApiData = JSON.parse(fileContent);

    // Check if the new picture already exists
    const isDuplicate = pictureApiData.some(
      (picture) => picture.url === newPicture.url
    );
    if (isDuplicate) {
      return new Response(JSON.stringify({ error: "Picture already exists" }), {
        status: 400,
      });
    }

    // Add the new picture at the beginning of the array
    pictureApiData.unshift(newPicture);

    // Update the file content
    const updatedContent = Buffer.from(
      JSON.stringify(pictureApiData, null, 2)
    ).toString("base64");

    // Commit the updated file to GitHub
    await axios.put(
      `https://api.github.com/repos/${OWNER}/${selectedRepo}/contents/${FILE_PATH}`,
      {
        message: "Update PictureApi.json with new data",
        content: updatedContent,
        sha: getFileResponse.data.sha, // File SHA is required for updates
      },
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );

    // Respond with the updated data
    return new Response(
      JSON.stringify({
        message: "Picture added and file updated on GitHub",
        data: pictureApiData[0], // Send the new picture data
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return new Response(
      JSON.stringify({ error: "Failed to update the file on GitHub" }),
      { status: 500 }
    );
  }
}
