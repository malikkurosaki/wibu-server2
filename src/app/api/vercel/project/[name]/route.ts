import { EnvServer } from "@/lib/server/EnvServer";
import { AnyType } from "@/types/ComplexRecord ";

const env = process.env as AnyType;
EnvServer.init(env);
export async function GET(
  req: Request,
  { params }: { params: { name: string } }
) {
  const res = await fetch(`https://api.vercel.com/v9/projects/${params.name}`, {
    headers: {
      Authorization: `Bearer ${EnvServer.env.WIBU_SERVER2_VERCEL_KEY}`
    }
  });

  return new Response(res.body);
}
