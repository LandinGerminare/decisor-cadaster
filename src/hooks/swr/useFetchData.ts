import useSWR, { mutate } from "swr";
import { TripleState } from "../triple/tripleState";
import { api } from "@/api/api";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function useFetchData<T>(url: string | null) {
  const { data, error, isValidating } = useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const tripleState: TripleState<T> = {
    state: error ? "Failed" : data ? "Success" : "Loading",
    data: data as T,
    ...(error && {
      errorMessage: error?.response?.data?.display_text
        ? error.response?.data?.display_text
        : error?.message || "Unknown error occurred",
    }),
  };

  const mutateData = async () => {
    if (url?.includes("purchase-book") && !url.includes("frame-month")) {
      await mutate(url, undefined, { revalidate: true });
    } else {
      await mutate(url);
    }
  };

  return {
    data,
    error,
    isLoading: isValidating,
    isError: !!error,
    tripleState,
    mutateData,
  };
}
