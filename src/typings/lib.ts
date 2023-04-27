import { OAuth } from "./auth.ts";
import { JSONValue } from "./utility.ts";

export type Options = {
  request_delay?: number;
  on_token?: (token: OAuth) => void | Promise<void>;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestInit = {
  url: string;
  url_base?: string;
  query?: string;
  payload?: JSONValue;
  headers?: Record<string, string | number | boolean>;
};
