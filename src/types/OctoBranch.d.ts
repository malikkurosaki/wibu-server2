/* eslint-disable @typescript-eslint/no-explicit-any */
export interface OctoBranch {
  name: string;
  commit: Commit;
  protected: boolean;
}
interface Commit {
  sha: string;
  url: string;
}