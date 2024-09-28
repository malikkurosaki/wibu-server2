import { appConfig } from "@/lib/app_config";
import { sessionDelete } from "wibu";

export async function POST() {
    sessionDelete({sessionKey: appConfig.sessionKey});
    return new Response(JSON.stringify({ success: true }));
}