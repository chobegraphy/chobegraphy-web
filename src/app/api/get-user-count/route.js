export async function GET(req) {
  const GITHUB_USERNAME = "chobegraphy";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_PREFIX = "ChobegraphyUser";
  let totalDataCount = 0;
  // CORS Configuration: Allow both Live and Localhost
  const allowedHosts = ["localhost:3000", "chobegraphy.vercel.app"];
  const origin = req.headers.get("host") || "";

  if (!allowedHosts.includes(origin)) {
    return new Response(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
  try {
    // Fetch all repositories for the user (including private repos)
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

    // Filter repositories that match ChobegraphyUser followed by numbers
    const filteredRepos = repos.filter(
      (repo) =>
        repo.name.startsWith(REPO_PREFIX) &&
        !isNaN(repo.name.replace(REPO_PREFIX, ""))
    );

    // Fetch UserData.json from each repo
    for (const repo of filteredRepos) {
      const fileResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/contents/UserData.json`,
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
          totalDataCount += fileData.length;
        }
      }
    }

    return Response.json(
      { totalDataCount },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin,
        },
      }
    );
  } catch (error) {
    return Response.json(
      { message: "Server Error", error: error.message },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": origin,
        },
      }
    );
  }
}
