import { NextRequest } from "next/server";
import { wibuMiddleware } from "wibu";
import { appConfig } from "./lib/app_config";
const WIBU_SERVER2_ENCODED_KEY = process.env.WIBU_SERVER2_ENCODED_KEY!;
export const middleware = (req: NextRequest) =>
  wibuMiddleware(req, {
    apiPath: "/api",
    encodedKey: WIBU_SERVER2_ENCODED_KEY,
    loginPath: "/login",
    publicRoutes: ["/login"],
    publicRoutePatterns: [/^\/login\/\w+/, /^\/api\/login\/\w+/],
    userPath: "/user",
    sessionKey: appConfig.sessionKey
  });

// Konfigurasi buat middleware Next.js
export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"] // Ignore Next.js internals and static files
};
