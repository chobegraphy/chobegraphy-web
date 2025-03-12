export async function GET() {
  const GITHUB_USERNAME = "chobegraphy";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_PREFIX = "Collections";
  let allCollections = [];

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

    // Filter repositories that contain "Collections" in their name
    const filteredRepos = repos.filter((repo) =>
      repo.name.includes(REPO_PREFIX)
    );

    // Fetch Collections.json from each repo
    for (const repo of filteredRepos) {
      const fileResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/contents/Collections.json`,
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
          allCollections.push(...fileData);
        }
      }
    }

    return new Response(JSON.stringify(allCollections), {
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
