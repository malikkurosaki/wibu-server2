"use client";
import { Octokit } from "@octokit/core";

export const wibuOctokit = (token: string) =>
  new Octokit({
    auth: token
  });
