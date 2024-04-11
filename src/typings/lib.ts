import type { OAuth } from "./auth.ts";
import type { ApiError } from "../errors/api.ts";
import type { AuthError } from "../errors/auth.ts";
import type { HttpError } from "../errors/http.ts";
import type { NoContentError } from "../errors/no-content.ts";
import type { WebhookError } from "../errors/webhook.ts";

import type { JSONValue } from "./utility.ts";

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
