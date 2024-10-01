import { pipeline } from "@xenova/transformers";

const text = `
how are you, where are you from
`;

async function runModel() {
  // Load distilGPT2 pipeline for text generation
  const model = await pipeline('text-generation', 'Xenova/distilgpt2');

  // Generate text with production-ready parameters
  const result = await model(text, {
    temperature: 0.7,            // Moderated randomness
    max_new_tokens: 50,          // Maximum new tokens to generate
    max_length: 100,             // Total length of output, including input
    repetition_penalty: 1.2,     // Penalize repetitive tokens
    no_repeat_ngram_size: 3,     // Avoid repeating 3-grams
    num_beams: 5,                // Increase the number of beams for better accuracy
    num_return_sequences: 1,     // Return one sequence
    do_sample: false,            // Disable sampling to use deterministic beam search
    top_k: 50,                   // Use top-k sampling (if do_sample=true)
    top_p: 0.9,                  // Use top-p nucleus sampling (if do_sample=true)
    early_stopping: true,        // Stop early when all beams finish
    pad_token_id: 50256,         // ID for padding token (GPT-2 default pad token)
    eos_token_id: 50256,         // ID for end of sequence token (GPT-2 default eos token)
    length_penalty: 1.0,         // Neutral length penalty
  });

  console.log(result);
}

runModel();
