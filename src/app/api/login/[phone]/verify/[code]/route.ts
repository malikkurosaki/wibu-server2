import { appConfig } from "@/lib/app_config";
import prisma from "@/lib/prisma";
import { sessionCreate } from "wibu";

const encodeKey = process.env.WIBU_SERVER2_ENCODED_KEY!;

export async function POST(
  request: Request,
  { params }: { params: { phone: string; code: string } }
) {
  console.log(params);
  const pinFind = await prisma.pinVerification.findUnique({
    where: {
      phone: params.phone
    }
  });

  if (!pinFind) {
    console.log("Pin not found");
    return new Response(
      JSON.stringify({ error: "Something went wrong, pin not found" }),
      {
        status: 422
      }
    );
  }

  if (pinFind.pin !== params.code) {
    console.log("Pin not match");
    return new Response(
      JSON.stringify({ error: "Something went wrong, pin not match" }),
      {
        status: 422
      }
    );
  }

  const userCreate = await prisma.user.upsert({
    where: {
      phone: params.phone
    },
    update: {},
    create: {
      phone: params.phone
    }
  });

  const session = await sessionCreate({
    user: userCreate,
    exp: "7 year",
    sessionKey: appConfig.sessionKey,
    encodedKey: encodeKey
  });

  return new Response(JSON.stringify({ session }));
}
