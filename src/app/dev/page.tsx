"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface WorkerMessage {
  text: string;
}

export default function Home() {
  // TODO: Add state variables
  const [result, setResult] = useState<string | null>(null);

  // Create a reference to the worker object.
  const worker = useRef<Worker | null>(null);
  const [ready, setReady] = useState<boolean | null>(null);

  // We use the `useEffect` hook to set up the worker as soon as the `Home` component is mounted.
  useEffect(() => {
    if (!worker.current) {

      worker.current = new Worker(
        new URL("/public/worker.js", import.meta.url),
        {
          type: "module"
        }
      );
      
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e: MessageEvent) => {
      switch (e.data.status) {
        case "initiate":
          setReady(false);
          break;
        case "ready":
          setReady(true);
          break;
        case "complete":
          setResult(e.data.output[0]);
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () => {
      if (worker.current) {
        worker.current.removeEventListener("message", onMessageReceived);
      }
    };
  }, [ready]);

  const classify = useCallback((text: string) => {
    if (worker.current) {
      const message: WorkerMessage = { text };
      worker.current.postMessage(message);
    }
  }, []);

  return (
    <div>
      <h1>Text Classification</h1>
      <button onClick={() => classify("Sample text")}>Classify Text</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}
