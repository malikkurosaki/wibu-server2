import { pipeline } from "@xenova/transformers";

; (async () => {
    console.log("mulai")
    // Load distilGPT2 pipeline for text generation
    const text = `
        how are you
    `
    console.log(text)
    const model = await pipeline("text-generation", "Xenova/codegen-350M-mono")
    console.log("model")
    // Generate text with production-ready parameters
    const result = await model(text)
    console.log(result)
})()