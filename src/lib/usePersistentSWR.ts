import { useEffect, useState } from "react";
import useSWR from "swr";

export function usePersistentSWR<T>(key: string, fetcher: () => Promise<T>) {
  const [fallback, setFallback] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(key);
      if (stored) {
        setFallback(JSON.parse(stored));
      }
    }
  }, [key]);

  return useSWR<T>(
    key,
    async () => {
      const data = await fetcher();
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(data));
      }
      return data;
    },
    {
      fallbackData: fallback,
      revalidateOnMount: true,
      refreshInterval: 30_000,
    }
  );
}
