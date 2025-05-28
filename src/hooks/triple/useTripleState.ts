import { useState } from "react";
import { TripleState } from "./tripleState";

export const useTripleState = <T>(): [
  TripleState<T>,
  () => void,
  (data: T) => void,
  (errorMessage: string) => void
] => {
  const [data, setData] = useState<TripleState<T>>({
    state: "Initial",
  });

  const setSuccess = (data: T) => {
    setData({ state: "Success", data: data });
  };

  const setLoading = () => {
    setData({ state: "Loading" });
  };

  const setFailed = (errorMessage: string) => {
    setData({ state: "Failed", errorMessage: errorMessage });
  };

  return [data, setLoading, setSuccess, setFailed];
};
