export type ApplicationError = BoundaryError | RequestError;

export type BoundaryError = {
  type: "BOUNDARY";
  route: {
    path: string;
    query?: any;
  };
  stackTrace: string;
  text: string;
  userAgent: string;
  screen: {
    width: number;
    height: number;
  };
};

export type RequestError = {
  type: "REQUEST";
  text: string;
  request: {
    url?: string;
    params?: string;
    headers?: any;
    statusCode?: number;
    body?: any;
    method?: string;
    userAgent?: string;
  };
};
