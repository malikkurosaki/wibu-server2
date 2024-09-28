import { waPinHandler } from "wibu";
import _ from "lodash";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { phone: string } }
) {
  const pin = _.random(1000, 9999).toString();
  const data = await waPinHandler({ nom: +params.phone, text: pin });

  if (!data.id)
    return new Response(
      JSON.stringify({ error: "Something went wrong, try again" }),
      {
        status: 422
      }
    );

  await prisma.pinVerification.upsert({
    where: {
      phone: params.phone
    },
    create: {
      phone: params.phone,
      pin
    },
    update: {
      pin
    }
  });

  return new Response(JSON.stringify({ data }));
}
