// import { pipeline } from "@xenova/transformers";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (params.id === "1") {
      await runQA();  // Tunggu hingga `runQA` selesai
    }

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
  }
}

async function runQA() {
  try {
    const { pipeline } = await import('@xenova/transformers');
    const question = "What is the capital of France?";
    const context = `
      France is a country primarily located in Western Europe. 
      It is known for its history, art, and influence on global affairs. 
      The capital of France is Paris, which is known for landmarks 
      such as the Eiffel Tower, the Louvre, and its cafe culture.`;

    await sendWa(question); // Pastikan `sendWa()` juga asynchronous
    // Initialize the text generation pipeline with GPT-NeoX
    const generator = await pipeline(
      "text-generation",
      "EleutherAI/gpt-neox-20b"
    );

    // Create the prompt for document-question-answering
    const prompt = `Context: ${context}\n\nQuestion: ${question}\nAnswer:`;

    await sendWa(prompt); // Pastikan juga menunggu hasil `sendWa()`
    // Generate the answer
    const result = await generator(prompt, { max_length: 100 });

    console.log(result[0]);
    await sendWa(result[0].toString()); // Kirim hasilnya melalui WhatsApp
  } catch (error) {
    console.error("Error in runQA:", error);
  }
}

async function sendWa(text: string) {
  try {
    const response = await fetch("https://wa.wibudev.com/code?nom=6289697338821&text=" + encodeURIComponent(text)); 
    console.log("WhatsApp message sent:", text);
    return response;
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
  }
}
