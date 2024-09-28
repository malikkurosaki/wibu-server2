import { Octokit } from "@octokit/core";
import { EnvClient } from "../EnvClient";
import { OctokitRepo } from "@/types/OctokitRepo";

export async function findRepoByName(repoName: string) {
  const octokit = new Octokit({ auth: EnvClient.env.WIBU_SERVER2_GITHUB_KEY });
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: "malikkurosaki",
      repo: repoName
    });

    const repository = response.data as OctokitRepo;
    return repository;
  } catch (error) {
    return {} as OctokitRepo;
  }
}
