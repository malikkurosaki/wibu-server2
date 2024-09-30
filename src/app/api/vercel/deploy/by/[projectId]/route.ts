import { EnvServer } from "@/lib/server/EnvServer";
import { AnyType } from "@/types/ComplexRecord ";

const env = process.env as AnyType;
EnvServer.init(env);
export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  const projectId = params.projectId;

  if (!projectId) {
    return new Response(JSON.stringify({ error: "projectId is required" }), {
      status: 500
    });
  }
  const resFetch = await fetch(
    `https://api.vercel.com/v6/deployments?limit=100&projectId=${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${EnvServer.env.WIBU_SERVER2_VERCEL_KEY}`
      }
    }
  );

  return new Response(resFetch.body);
}
