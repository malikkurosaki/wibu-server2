import { EnvServer } from "@/lib/server/EnvServer";
import { AnyType } from "@/types/ComplexRecord ";

const env = process.env as AnyType;
EnvServer.init(env);
export async function GET() {
//   console.log(EnvServer.env.WIBU_SERVER2_VERCEL_KEY,"wibu");
  const res = await fetch(`https://api.vercel.com/v1/webhooks`, {
    headers: {
      Authorization: `Bearer ${EnvServer.env.WIBU_SERVER2_VERCEL_KEY}`
    },
    method: "get"
  });

  return new Response(res.body);
}
