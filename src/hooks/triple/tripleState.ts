export type InitialState = {
  state: "Initial";
};

export type LoadingState = {
  state: "Loading";
};

export type SuccessState<T> = {
  state: "Success";
  data: T;
};

export type FailedState = {
  state: "Failed";
  errorMessage: string;
};

export type TripleState<T> =
  | InitialState
  | LoadingState
  | SuccessState<T>
  | FailedState;
