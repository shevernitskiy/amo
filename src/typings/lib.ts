import { OAuth } from "./auth.ts";

export type Options = {
  request_delay?: number;
  on_token?: (token: OAuth) => void | Promise<void>;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestInit = {
  url: string;
  url_base?: string;
  query?: string;
  payload?: BodyInit;
  headers?: Record<string, string | number | boolean>;
};
