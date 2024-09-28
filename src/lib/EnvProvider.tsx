import { EnvClientProvider } from "./client/EnvClient";
import { EnvServer } from "./server/EnvServer";

export function EnvProvider({ env }: { env?:string }) {
  const jsonEnv = env ? JSON.parse(env) : {};
  EnvServer.init(jsonEnv);

  return <EnvClientProvider env={env} />;
}