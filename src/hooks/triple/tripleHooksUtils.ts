import { AxiosError } from "axios";

export function getCustomError(e: unknown, defaultError: string) {
  if (e instanceof AxiosError && e.response?.headers.customErrorMessage) {
    return e.response?.headers.customErrorMessage;
  } else {
    return defaultError;
  }
}
