import { hookstate } from "@hookstate/core";

type Log = {
  status: number;
  text: string;
  json: Record<string, string>[];
};
export const branchSyncLog = hookstate<Log | null>(null);
