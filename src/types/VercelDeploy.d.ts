/* eslint-disable @typescript-eslint/no-explicit-any */
export interface VercelDeploy {
  created: number;
  date: number;
  deploymentId: string;
  id: string;
  text: string;
  type: string;
  serial: string;
  info: Info;
}
interface Info {
  type: string;
  name: string;
  entrypoint: string;
}