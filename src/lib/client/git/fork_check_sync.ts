import { wibuOctokit } from "../wibu_octikit";


export async function forkCheckSync(token: string,{
  sourceOwner = "bipproduction",
  repo,
  branch,
  forkOwner = "malikkurosaki",
  forkBranch
}: {
  sourceOwner?: string;
  repo: string;
  branch: string;
  forkOwner?: string;
  forkBranch?: string;
}) {
  try {
    const comparison = await wibuOctokit(token).request(
      "GET /repos/{owner}/{repo}/compare/{base}...{head}",
      {
        owner: forkOwner, // Owner of the forked repo
        repo: repo, // Forked repo name
        base: `${sourceOwner}:${branch}`, // Source repository and branch
        head: forkBranch || branch // Fork branch
      }
    );

    // Return true if the fork is behind, else return false
    return comparison.data.behind_by > 0;
  } catch (error) {
    console.error("Error comparing branches:", error);
    return false;
  }
}
