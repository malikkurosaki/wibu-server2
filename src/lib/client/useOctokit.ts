import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";

export function useOctokit<T>(key: string, octokitFetch: Promise<T | null>) {
  const [data, setData] = useState<T | null>(null);
  useShallowEffect(() => {
    octokitFetch.then((data) => {
      if (data) setData(data);
    });
  }, []);

  return [data, setData] as const;
}
