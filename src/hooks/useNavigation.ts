"use client";
import { useRouter } from "next/router";

export function useNavigation() {
  const router = useRouter();

  const navigate = (
    path: string,
    query?: Record<string, any>,
    options?: { replace?: boolean }
  ) => {
    const replace = options?.replace ?? false;

    if (query) {
      const queryString = new URLSearchParams(query).toString();
      return replace
        ? router.replace(`${path}?${queryString}`)
        : router.push(`${path}?${queryString}`);
    }

    return replace ? router.replace(path) : router.push(path);
  };

  const goBack = () => router.back();

  return {
    navigate,
    goBack,
    pathname: router.pathname,
    query: router.query,
    preFetch: router.prefetch,
  };
}
