"use client";
import { Envs } from "@/types/Envs";
export class EnvClient {
  static env: Envs;
  static init(env: Envs) {
    this.env = env;
  }
}
export function EnvClientProvider({ env }: { env?: string }) {
  const jsonEnv = env ? JSON.parse(env) : {};

  EnvClient.init(jsonEnv);
  return null;
}