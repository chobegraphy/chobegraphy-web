import axios from "axios";
import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "chobegraphy";
const BASE_REPO_NAME = "UserImgStorage";

// Function to get repository size
const getRepoSize = async (repoName) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${OWNER}/${repoName}`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );
    return response.data.size / 1024; // Convert KB to MB
  } catch (error) {
    console.error(
      "Error fetching repo size:",
      error.response?.data || error.message
    );
    return null;
  }
};

// Function to create a new private repository
const createNewRepo = async () => {
  let count = 1;
  let newRepoName;

  while (true) {
    newRepoName = `${BASE_REPO_NAME}-${count}`;
    try {
      await axios.get(`https://api.github.com/repos/${OWNER}/${newRepoName}`, {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      });
      count++; // If repo exists, increment count
    } catch (error) {
      if (error.response?.status === 404) break; // Repo doesn't exist, create it
      throw error;
    }
  }

  // Create the private repository
  await axios.post(
    "https://api.github.com/user/repos",
    { name: newRepoName, private: false },
    { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
  );

  return newRepoName;
};

// **POST** request handler for Next.js API route
export async function POST(req) {
  try {
    let photo, filename;

    // Check if the request is JSON or form-data
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      // JSON request (Base64 string)
      const body = await req.json();
      photo = body.photo;
      filename = body.filename || "uploaded-image.jpg";
    } else if (contentType.includes("multipart/form-data")) {
      // Form-data request (File upload)
      const formData = await req.formData();
      const file = formData.get("photo");
      filename = formData.get("filename") || "uploaded-image.jpg";

      if (!file) {
        return NextResponse.json(
          { error: "No file uploaded" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      photo = Buffer.from(bytes).toString("base64");
    } else {
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 400 }
      );
    }

    // File size check
    const fileSizeInMB = Buffer.byteLength(photo, "base64") / (1024 * 1024);
    if (fileSizeInMB > 30) {
      return NextResponse.json(
        { error: "File size exceeds 30MB limit" },
        { status: 400 }
      );
    }

    let currentRepo = BASE_REPO_NAME;
    let repoSize = await getRepoSize(currentRepo);

    // If repo exceeds 4.5GB, create a new one
    if (repoSize && repoSize >= 4500) {
      currentRepo = await createNewRepo();
    }

    // Check if file already exists
    const url = `https://api.github.com/repos/${OWNER}/${currentRepo}/contents/${filename}`;
    const fileExists = await axios
      .get(url, { headers: { Authorization: `token ${GITHUB_TOKEN}` } })
      .then(() => true)
      .catch((err) =>
        err.response?.status === 404 ? false : Promise.reject(err)
      );

    let finalFilename = filename;
    if (fileExists) {
      const fileExtension = filename.split(".").pop();
      const baseName = filename.replace(`.${fileExtension}`, "");
      finalFilename = `${baseName}-${Date.now()}.${fileExtension}`;
    }

    // Upload the file
    const uploadUrl = `https://api.github.com/repos/${OWNER}/${currentRepo}/contents/${finalFilename}`;
    await axios.put(
      uploadUrl,
      { message: `Add ${finalFilename}`, content: photo },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const imageUrl = `https://raw.githubusercontent.com/${OWNER}/${currentRepo}/main/${finalFilename}`;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error(
      "Error uploading file:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
