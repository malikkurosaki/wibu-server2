export async function forkSync(
  token: string,
  {
    sourceOwner = "bipproduction",
    owner = "malikkurosaki", // Owner fork
    repo = "hipmi",
    branch = "main" // Default branch
  }: {
    sourceOwner?: string;
    owner?: string;
    repo: string;
    branch: string;
  }
) {
  try {
    // Check if the repo needs sync
    const comparisonResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/compare/${branch}...${sourceOwner}:${branch}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json"
        }
      }
    );

    const comparisonData = await comparisonResponse.json();

    // If no changes need to be synced
    if (comparisonData.status === "identical") {
      return {
        status: 200,
        text: "No need to sync. The fork is up to date with the upstream repository.",
        json: comparisonData
      };
    }

    // If there are changes, proceed with pull request and merge
    if (comparisonData.status === "diverged" || comparisonData.status === "ahead" || comparisonData.status === "behind") {
      const pullRequestResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: "Sync with upstream",
            head: `${sourceOwner}:${branch}`, // branch dari source repo (upstream)
            base: branch // branch di fork yang akan menerima update
          })
        }
      );

      const pullRequestData = await pullRequestResponse.json();

      if (pullRequestResponse.status !== 201) {
        return {
          status: pullRequestResponse.status,
          text: pullRequestData.message || "Failed to create pull request",
          json: pullRequestData
        };
      }

      const pullNumber = pullRequestData.number;

      // Automatically merge the pull request
      const mergeResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/merge`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            commit_title: `Merge pull request #${pullNumber} from ${sourceOwner}:${branch}`,
            merge_method: "merge" // You can also use "squash" or "rebase" if needed
          })
        }
      );

      const mergeData = await mergeResponse.json();

      return {
        status: mergeResponse.status,
        text: mergeData.message || "Pull request merged successfully",
        json: mergeData
      };
    }
  } catch (error) {
    console.error("Error during pull and merge:", error);
    return {
      status: 500,
      text: "" + error,
      json: toJson((await error) + "")
    };
  }
}

function toJson(data: string) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
