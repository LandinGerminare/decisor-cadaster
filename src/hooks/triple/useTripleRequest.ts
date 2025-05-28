import { api } from "@/api/api";
import { AxiosError, AxiosRequestConfig } from "axios";
import { useTripleState } from "./useTripleState";

type MethodI = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestParams {
  url: string;
  body?: any;
  params?: any;
  config?: AxiosRequestConfig;
  defaultError?: string;
}

export interface RequestCallbacks<T> {
  onSuccess?: (data: T) => void;
  onLoading?: () => void;
  onError?: (errorMessage: string) => void;
  onComplete?: () => void;
}

export const useTripleRequest = <T>(
  m: MethodI,
  callbacks?: RequestCallbacks<T>
) => {
  const [data, setLoading, setSuccess, setFailed] = useTripleState<T>();

  const request = async (
    args: RequestParams,
    onResult?: RequestCallbacks<T>
  ): Promise<void> => {
    setLoading();
    onResult?.onLoading && onResult?.onLoading();
    callbacks?.onLoading && callbacks?.onLoading();
    try {
      const response = await api(args.url, {
        data: args.body,
        method: m,
        params: args.params,
        ...args.config,
      });
      setSuccess(response.data);
      callbacks?.onSuccess && callbacks?.onSuccess(response.data);
      onResult?.onSuccess && onResult?.onSuccess(response.data);
    } catch (e) {
      let errorMessage =
        args.defaultError ||
        "Ocorreu um erro desconhecido. Tente novamente mais tarde.";
      if (e instanceof AxiosError && e.response?.headers.customErrorMessage) {
        errorMessage = e.response?.headers.customErrorMessage;
      }
      setFailed(errorMessage);
      onResult?.onError && onResult?.onError(errorMessage);
      callbacks?.onError && callbacks?.onError(errorMessage);
    } finally {
      onResult?.onComplete && onResult?.onComplete();
      callbacks?.onComplete && callbacks?.onComplete();
    }
  };

  return [data, request] as const;
};
