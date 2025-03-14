export async function GET(req) {
  const GITHUB_USERNAME = "chobegraphy";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_PREFIX = "ChobegraphyPictureApi";
  const url = new URL(req.url);
  const filterType = url.searchParams.get("filter"); // recent, popular, oldest
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = url.searchParams.has("limit")
    ? parseInt(url.searchParams.get("limit"))
    : null;

  let pictureData = [];

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
        JSON.stringify({ message: "Error fetching repositories" }),
        { status: 500 }
      );
    }

    // Filter repositories matching ChobegraphyPictureApi
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
          pictureData.push(...fileData);
        }
      }
    }

    // Sorting based on filterType
    if (filterType === "recent") {
      pictureData.sort(
        (a, b) => new Date(b.uploadedTime) - new Date(a.uploadedTime)
      );
    } else if (filterType === "popular") {
      pictureData.sort(
        (a, b) =>
          b.view - a.view || b.download - a.download || b.react - a.react
      );
    } else if (filterType === "oldest") {
      pictureData.sort(
        (a, b) => new Date(a.uploadedTime) - new Date(b.uploadedTime)
      );
    }

    // Apply pagination if limit is set
    let paginatedData = pictureData;
    if (limit !== null) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      paginatedData = pictureData.slice(startIndex, endIndex);
    }

    return new Response(
      JSON.stringify({ pictures: paginatedData, total: pictureData.length }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Server Error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
