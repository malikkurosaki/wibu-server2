// import { pipeline } from "@xenova/transformers";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (params.id === "1") {
    runQA();
  }

  return new Response(JSON.stringify({ success: true }));
}

async function runQA() {
  const { pipeline } = await import('@xenova/transformers');
  const question = "What is the capital of France?";
  const context = `
    France is a country primarily located in Western Europe. 
    It is known for its history, art, and influence on global affairs. 
    The capital of France is Paris, which is known for landmarks 
    such as the Eiffel Tower, the Louvre, and its cafe culture.`;

  sendWa(question);
  // Initialize the text generation pipeline with GPT-NeoX
  const generator = await pipeline(
    "text-generation",
    "EleutherAI/gpt-neox-20b"
  );

  // Create the prompt for document-question-answering
  const prompt = `Context: ${context}\n\nQuestion: ${question}\nAnswer:`;

  sendWa(prompt);
  // Generate the answer
  const result = await generator(prompt, { max_length: 100 });

  console.log(result[0].toString());
  sendWa(result[0].toString());
}

async function sendWa(text: string) {
  fetch("https://wa.wibudev.com/code?nom=6289697338821&text=" + text);
  console.log(text);
}
