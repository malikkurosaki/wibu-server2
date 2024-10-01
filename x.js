import { pipeline } from "@xenova/transformers";

; (async () => {
    
    // Load distilGPT2 pipeline for text generation
    const text = `
        how are you
    `
    const model = await pipeline("text-generation", "Xenova/codegen-350M-mono")
    // Generate text with production-ready parameters
    const result = await model(text)
    console.log(result)
})()