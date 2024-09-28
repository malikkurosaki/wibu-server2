// app/api/webhook/route.ts

export async function POST(req: Request) {
  try {
    // Capture the request body
    const body = await req.json();

    // Handle the webhook payload here
    console.log("Webhook payload received:", body);

    // Return a success response
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    // Handle errors, such as parsing errors
    console.error("Error processing webhook:", error);

    return new Response(JSON.stringify({ success: false, error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
