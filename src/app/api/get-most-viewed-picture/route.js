export async function GET(req) {
  const GITHUB_USERNAME = "chobegraphy";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_PREFIX = "ChobegraphyPictureApi";

  let allImages = [];

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
      return Response.json(
        { message: "Error fetching repositories", error: repos },
        { status: 500 }
      );
    }

    // Filter repositories that match "ChobegraphyPictureApi-*" pattern
    const filteredRepos = repos.filter(
      (repo) =>
        repo.name.startsWith(REPO_PREFIX) &&
        !isNaN(repo.name.replace(REPO_PREFIX, ""))
    );

    // Fetch PictureApi.json from each repo and combine data
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
          allImages = [...allImages, ...fileData];
        }
      }
    }

    // Sorting functions
    const sortByView = [...allImages].sort(
      (a, b) => (b.view || 0) - (a.view || 0)
    );
    const sortByDownload = [...allImages].sort(
      (a, b) => (b.download || 0) - (a.download || 0)
    );
    const sortByReact = [...allImages].sort(
      (a, b) => (b.react || 0) - (a.react || 0)
    );

    return new Response(
      JSON.stringify({
        mostViewed: sortByView.slice(0, 10), // Top 10 most viewed images
        mostDownloaded: sortByDownload.slice(0, 10), // Top 10 most downloaded images
        mostReacted: sortByReact.slice(0, 10), // Top 10 most reacted images
      }),
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
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
