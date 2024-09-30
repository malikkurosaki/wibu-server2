import { EnvServer } from "@/lib/server/EnvServer";
import { AnyType } from "@/types/ComplexRecord ";

const env = process.env as AnyType;
EnvServer.init(env);
export async function GET(
  req: Request,
  { params }: { params: { deployId: string } }
) {
  const id = params.deployId;
  if (!id) return new Response("Required id", { status: 400 });
  const res = await fetch(
    "https://api.vercel.com/v3/deployments/" + id + "/events?limit=-1",
    {
      headers: {
        Authorization: `Bearer ${EnvServer.env.WIBU_SERVER2_VERCEL_KEY}`
      },
      method: "get"
    }
  );

  return new Response(res.body);
}
