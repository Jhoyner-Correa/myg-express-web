"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTracking } from "./api";

export function useTracking(code: string | null) {
  return useQuery({
    queryKey: ["tracking", code],
    queryFn: () => fetchTracking(code!),
    enabled: !!code,
    retry: 1,
    staleTime: 0,
  });
}
