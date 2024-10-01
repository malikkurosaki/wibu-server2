/* eslint-disable @typescript-eslint/no-explicit-any */
import { pipeline, PipelineType } from "@xenova/transformers";

type ProgressCallback = (progress: any) => void;

const P = () => class PipelineSingleton {
    static task:PipelineType  = 'text-classification';
    static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
    static instance: any = null;

    static async getInstance(progress_callback?: ProgressCallback): Promise<any> {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

let PipelineSingleton: ReturnType<typeof P>;

if (process.env.NODE_ENV !== 'production') {
    if (!(global as any).PipelineSingleton) {
        (global as any).PipelineSingleton = P();
    }
    PipelineSingleton = (global as any).PipelineSingleton;
} else {
    PipelineSingleton = P();
}

export default PipelineSingleton;
