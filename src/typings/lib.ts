import { OAuth } from "@typings/auth.ts";
import { JSONValue } from "@typings/utility.ts";

export type Options = {
  http_request_delay?: number;
  on_token?: (token: OAuth) => void | Promise<void>;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestInit = {
  url: string;
  query?: Record<string, unknown>;
  payload?: JSONValue;
};
