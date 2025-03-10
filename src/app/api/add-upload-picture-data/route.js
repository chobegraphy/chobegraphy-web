// src/app/api/add-upload-picture-data/route.js

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "chobegraphy";
const REPO_PREFIX = "ChobegraphyPictureApi";
const FILE_PATH = "PictureApi.json";
const MAX_REPO_SIZE = 4.5 * 1024 * 1024 * 1024; // 4.5 GB in bytes

async function getRepoSize(repoName) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${OWNER}/${repoName}`,
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );
    return response.data.size * 1024; // Convert from KB to bytes
  } catch (error) {
    console.error(
      "Error fetching repo size:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch repo size");
  }
}

async function createNewRepo() {
  try {
    const repoNumber = await getLatestRepoNumber();
    const newRepoName = `${REPO_PREFIX}-${repoNumber + 1}`;
    const response = await axios.post(
      "https://api.github.com/user/repos",
      {
        name: newRepoName,
        private: true, // or false based on your preference
      },
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );

    // Initialize the new repo with a PictureApi.json file
    await axios.put(
      `https://api.github.com/repos/${OWNER}/${newRepoName}/contents/${FILE_PATH}`,
      {
        message: "Initial commit with PictureApi.json",
        content: Buffer.from("[]").toString("base64"), // Empty array as initial content
      },
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );

    return newRepoName;
  } catch (error) {
    console.error(
      "Error creating new repo:",
      error.response?.data || error.message
    );
    throw new Error("Failed to create new repo");
  }
}

async function getLatestRepoNumber() {
  try {
    const response = await axios.get(
      "https://api.github.com/users/chobegraphy/repos",
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );

    const repoNames = response.data.map((repo) => repo.name);
    const matchingRepos = repoNames.filter((name) =>
      name.startsWith(REPO_PREFIX)
    );
    const repoNumbers = matchingRepos.map((name) =>
      parseInt(name.split("-")[1], 10)
    );
    return Math.max(...repoNumbers, 0); // Return the latest repo number
  } catch (error) {
    console.error(
      "Error fetching repos:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get latest repo number");
  }
}

export async function POST(req) {
  const newPicture = await req.json();
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
