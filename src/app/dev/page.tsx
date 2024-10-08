"use client";
import { Button, Textarea } from "@mantine/core";
import { useState, useEffect, useRef, useCallback } from "react";

interface WorkerMessage {
  text: string;
}

export default function Home() {
  // TODO: Add state variables
  const [result, setResult] = useState<string | null>(null);
  const [dataText, setDataText] = useState<string | null>(null);

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
          setResult(JSON.stringify(e.data));
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
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">Transformers.js</h1>
      <h2 className="text-2xl mb-4 text-center">Next.js template</h2>

      <Textarea
        className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter text here"
        onInput={(e) => setDataText(e.currentTarget.value)}
      />
      <Button onClick={() => classify(dataText || "")}>send</Button>

      {ready !== null && (
        <pre className="bg-gray-100 p-2 rounded">
          {!ready || !result ? "Loading..." : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
