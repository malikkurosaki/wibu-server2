import { pipeline } from "@xenova/transformers";

const text = `
async function runModel() {
  // Load distilGPT2 pipeline for text generation
  const model = await pipeline("text-generation", "Xenova/codegen-350M-mono");
`;

async function runModel() {
  // Load distilGPT2 pipeline for text generation
  const model = await pipeline("text-generation", "Xenova/codegen-350M-mono");

  // Generate text with production-ready parameters
  const result = await model(text);

  console.log(result);
}

runModel();
