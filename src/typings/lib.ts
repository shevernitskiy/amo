import { OAuth } from "./auth.ts";
import { ApiError } from "../errors/api.ts";
import { AuthError } from "../errors/auth.ts";
import { HttpError } from "../errors/http.ts";
import { NoContentError } from "../errors/no-content.ts";
import { WebhookError } from "../errors/webhook.ts";

import { JSONValue } from "./utility.ts";

export type Options = {
  request_delay?: number;
  concurrent_request?: number;
  concurrent_timeframe?: number;
  on_token?: (token: OAuth) => void | Promise<void>;
  on_error?: (error: Error | AuthError | ApiError | NoContentError | HttpError | WebhookError) => void | Promise<void>;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestInit = {
  url: string;
  url_base?: string;
  query?: string;
  payload?: JSONValue;
  headers?: Record<string, string | number | boolean>;
};
