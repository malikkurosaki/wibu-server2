/* eslint-disable @typescript-eslint/no-explicit-any */
export interface VercelProject {
  accountId: string;
  speedInsights: SpeedInsights;
  autoExposeSystemEnvs: boolean;
  autoAssignCustomDomains: boolean;
  autoAssignCustomDomainsUpdatedBy: string;
  buildCommand: string;
  createdAt: number;
  crons: Crons;
  devCommand: null;
  directoryListing: boolean;
  env: Env[];
  framework: string;
  gitForkProtection: boolean;
  gitLFS: boolean;
  id: string;
  installCommand: string;
  lastRollbackTarget: null;
  lastAliasRequest: null;
  name: string;
  nodeVersion: string;
  outputDirectory: null;
  publicSource: null;
  resourceConfig: ResourceConfig;
  rootDirectory: null;
  serverlessFunctionRegion: string;
  sourceFilesOutsideRootDirectory: boolean;
  ssoProtection: SsoProtection;
  updatedAt: number;
  live: boolean;
  gitComments: GitComments;
  webAnalytics: WebAnalytics;
  link: Link;
  latestDeployments: LatestDeployment[];
  targets: Targets;
}
interface Targets {
  production: Production;
  preview: LatestDeployment;
}
interface Production {
  alias: string[];
  aliasAssigned: number;
  aliasError: null;
  automaticAliases: string[];
  builds: any[];
  createdAt: number;
  createdIn: string;
  creator: Creator;
  deploymentHostname: string;
  forced: boolean;
  id: string;
  meta: Meta;
  name: string;
  plan: string;
  private: boolean;
  readyState: string;
  readySubstate: string;
  target: string;
  teamId: string;
  type: string;
  url: string;
  userId: string;
  withCache: boolean;
  buildingAt: number;
  readyAt: number;
  previewCommentsEnabled: boolean;
}
interface LatestDeployment {
  alias: string[];
  aliasAssigned: number;
  aliasError: null;
  automaticAliases: string[];
  builds: any[];
  createdAt: number;
  createdIn: string;
  creator: Creator;
  deploymentHostname: string;
  forced: boolean;
  id: string;
  meta: Meta;
  name: string;
  plan: string;
  private: boolean;
  readyState: string;
  readySubstate: string;
  target: null;
  teamId: string;
  type: string;
  url: string;
  userId: string;
  withCache: boolean;
  buildingAt: number;
  readyAt: number;
  previewCommentsEnabled: boolean;
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
}
interface Creator {
  uid: string;
  email: string;
  username: string;
  githubLogin: string;
}
interface Link {
  type: string;
  repo: string;
  repoId: number;
  org: string;
  gitCredentialId: string;
  productionBranch: string;
  sourceless: boolean;
  createdAt: number;
  updatedAt: number;
  deployHooks: any[];
}
interface WebAnalytics {
  id: string;
}
interface GitComments {
  onPullRequest: boolean;
  onCommit: boolean;
}
interface SsoProtection {
  deploymentType: string;
}
interface ResourceConfig {
  functionDefaultMemoryType: string;
}
interface Env {
  key: string;
  target: string[];
  configurationId: null;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: null | string;
  id: string;
  type: string;
  value: string;
  comment?: string;
}
interface Crons {
  enabledAt: number;
  disabledAt: null;
  updatedAt: number;
  deploymentId: string;
  definitions: any[];
}
interface SpeedInsights {
  id: string;
  hasData: boolean;
}