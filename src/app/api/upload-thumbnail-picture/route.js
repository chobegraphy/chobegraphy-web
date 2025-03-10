import axios from "axios";

// GitHub settings
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = "chobegraphy";
const BASE_REPO_NAME = "ThumbnailStorage";

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

// POST request handler for Next.js API route
export async function POST(req) {
  try {
    // Handle preflight request (OPTIONS)
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

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
        return new Response(JSON.stringify({ error: "No file uploaded" }), {
          status: 400,
        });
      }

      const bytes = await file.arrayBuffer();
      photo = Buffer.from(bytes).toString("base64");
    } else {
      return new Response(
        JSON.stringify({ error: "Unsupported content type" }),
        { status: 400 }
      );
    }

    // File size check
    const fileSizeInMB = Buffer.byteLength(photo, "base64") / (1024 * 1024);
    if (fileSizeInMB > 30) {
      return new Response(
        JSON.stringify({ error: "File size exceeds 30MB limit" }),
        { status: 400 }
      );
    }

    // Select the repository
    let currentRepo = BASE_REPO_NAME;
    let repoSize = await getRepoSize(currentRepo);

    // If repo exceeds 4.5GB, create a new one
    if (repoSize && repoSize >= 4500) {
      currentRepo = await createNewRepo();
    }

    // Check if file already exists in the repository
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

    // Upload the file to GitHub
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

    // Image URL from GitHub
    const imageUrl = `https://raw.githubusercontent.com/${OWNER}/${currentRepo}/main/${finalFilename}`;

    // Respond with the image URL
    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
