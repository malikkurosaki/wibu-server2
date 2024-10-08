import { spawn } from "child_process";

export async function GET(request: Request) {
  const text = new URL(request.url).searchParams.get("text");
  if (text) {
    
    const child = spawn("/bin/bash", [
      "-c",
      `npx tsx --version`
    ]);
    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    child.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    child.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });

    return new Response(JSON.stringify({ success: true, text }));
  }
  return new Response(JSON.stringify({ text }));
}
