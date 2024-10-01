import { spawn } from "child_process";
import path from "path";

export async function GET(request: Request) {
  const text = new URL(request.url).searchParams.get("text");
  if (text) {
    const child = spawn("/bin/bash", [
      "-c",
      `npx tsx ${path.resolve(process.cwd(), "x.ts")}`
    ]);
    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    return new Response(JSON.stringify({ success: true, text }));
  }
  return new Response(JSON.stringify({ text }));
}
