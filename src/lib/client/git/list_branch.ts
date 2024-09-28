/* eslint-disable @typescript-eslint/no-explicit-any */
import { appConfig } from "@/lib/app_config";

import { OctoBranch } from "@/types/OctoBranch";
import { wibuOctokit } from "../wibu_octikit";
export async function listBranches(token: string, repo: string) {
  try {
    const response = await wibuOctokit(token).request(
      "GET /repos/{owner}/{repo}/branches",
      {
        owner: appConfig.repoOwner,
        repo,
        page: 1,
        per_page: 100
      }
    );

    const data = response.data as any as OctoBranch[];
    return data;
  } catch (error) {
    return [] as OctoBranch[];
  }
}
