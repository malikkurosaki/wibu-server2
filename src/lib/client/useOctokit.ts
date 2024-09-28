import { useLocalStorage, useShallowEffect } from "@mantine/hooks";

export function useOctokit<T>(key: string, octokitFetch: Promise<T | null>) {
  const [data, setData] = useLocalStorage<T | null>({
    key: key,
    defaultValue: null
  });
  useShallowEffect(() => {
    octokitFetch.then((data) => {
      if (data) setData(data);
    });
  }, []);

  return [data, setData] as const;
}
