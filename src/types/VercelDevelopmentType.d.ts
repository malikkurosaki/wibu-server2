/* eslint-disable @typescript-eslint/no-explicit-any */
export interface VercelDevelopmentType {
  deployments: Deployment[];
  pagination: Pagination;
}
interface Pagination {
  count: number;
  next: number;
  prev: number;
}
interface Deployment {
  uid: string;
  name: string;
  url: string;
  created: number;
  source: string;
  state: string;
  readyState: string;
  readySubstate?: string;
  type: string;
  creator: Creator;
  inspectorUrl: string;
  meta: Meta;
  target: null | string;
  aliasError?: null;
  aliasAssigned: null | number;
  isRollbackCandidate: boolean;
  createdAt: number;
  buildingAt: number;
  ready: number;
  projectSettings: ProjectSettings;
}
interface ProjectSettings {
  commandForIgnoringBuildStep: null;
}
interface Meta {
  githubCommitAuthorName: string;
  githubCommitMessage: string;
  githubCommitOrg: string;
  githubCommitRef: string;
  githubCommitRepo: string;
  githubCommitSha: string;
  githubDeployment: string;
  githubOrg: string;
  githubRepo: string;
  githubRepoOwnerType: string;
  githubCommitRepoId: string;
  githubRepoId: string;
  githubRepoVisibility: string;
  githubCommitAuthorLogin: string;
  branchAlias: string;
  githubPrId?: string;
  githubDeploymentAuthorizedBy?: string;
  action?: string;
  originalDeploymentId?: string;
}
interface Creator {
  uid: string;
  email: string;
  username: string;
  githubLogin: string;
}
