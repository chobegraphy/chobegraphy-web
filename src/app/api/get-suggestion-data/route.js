export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const collectionsParam = searchParams.get("collections");

  if (!collectionsParam) {
    return new Response(
      JSON.stringify({ message: "Collections array is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const collections = JSON.parse(collectionsParam);
  if (!Array.isArray(collections) || collections.length === 0) {
    return new Response(
      JSON.stringify({ message: "Invalid collections array" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const GITHUB_USERNAME = "chobegraphy";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_PREFIX = "ChobegraphyPictureApi";
  let allPictures = [];

  try {
    // Fetch all repositories
    const repoResponse = await fetch(
      `https://api.github.com/user/repos?per_page=100&type=all`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    const repos = await repoResponse.json();
    if (!Array.isArray(repos)) {
      return new Response(
        JSON.stringify({
          message: "Error fetching repositories",
          error: repos,
        }),
        { status: 500 }
      );
    }

    // Filter repositories that match ChobegraphyPictureApi followed by numbers
    const filteredRepos = repos.filter(
      (repo) =>
        repo.name.startsWith(REPO_PREFIX) &&
        !isNaN(repo.name.replace(REPO_PREFIX, ""))
    );

    // Fetch PictureApi.json from each repo
    for (const repo of filteredRepos) {
      const fileResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/contents/PictureApi.json`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3.raw",
          },
        }
      );

      if (fileResponse.ok) {
        const fileData = await fileResponse.json();
        if (Array.isArray(fileData)) {
          allPictures.push(...fileData);
        }
      }
    }

    // Match images based on collections
    let matchedImages = new Map(); // Use Map to store unique images by _id

    collections.forEach((collection) => {
      let filtered = allPictures.filter((image) =>
        image.collections.some(
          (col) =>
            col.label === collection.label || col.value === collection.value
        )
      );

      filtered.slice(0, 5).forEach((image) => {
        if (!matchedImages.has(image._id)) {
          matchedImages.set(image._id, image); // Store unique images by _id
        }
      });
    });

    // Convert Map values to an array (unique images by _id)
    let uniqueImages = Array.from(matchedImages.values());

    // Shuffle the results
    uniqueImages = uniqueImages.sort(() => Math.random() - 0.5);

    return new Response(JSON.stringify(uniqueImages), {
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
