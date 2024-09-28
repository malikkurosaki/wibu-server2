import { OctokitRepo } from "@/types/OctokitRepo";
import { Octokit } from "@octokit/core";

export async function listRepo({ accessToken }: { accessToken: string }) {
  const octokit = new Octokit({ auth: accessToken });
  const response = await octokit.request("GET /users/{username}/repos", {
    username: "malikkurosaki",
    per_page: 100, // Mengambil hingga 100 repositori dalam satu halaman
    page: 1 // Halaman pertama
  });

  const data: OctokitRepo[] = response.data as OctokitRepo[];
  return data;
}
