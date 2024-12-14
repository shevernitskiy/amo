import { BypassQueue, ConcurrentPool, DelayQueue } from "./async-queue.ts";
import { ApiError } from "../errors/api.ts";
import { AuthError } from "../errors/auth.ts";
import { HttpError } from "../errors/http.ts";
import { NoContentError } from "../errors/no-content.ts";

import type { OAuth, OAuthCode, OAuthRefresh } from "../typings/auth.ts";
import type { HttpMethod, Options, RequestInit } from "../typings/lib.ts";

export class RestClient {
  private url_base: string;
  private queue: DelayQueue<Response> | ConcurrentPool<Response> | BypassQueue<Response>;
  private _token?: OAuth;

  constructor(
    private base_url: string,
    private auth: OAuthCode | OAuth & Pick<OAuthRefresh, "client_id" | "client_secret" | "redirect_uri">,
    private options?: Options,
  ) {
    this.url_base = `https://${this.base_url}`; //subdomain.amocrm.ru | subdomain.kommo.com
    if (this.isOAuth(this.auth)) {
      this._token = {
        token_type: this.auth.token_type,
        expires_in: this.auth.expires_in,
        access_token: this.auth.access_token,
        refresh_token: this.auth.refresh_token,
        expires_at: this.auth.expires_at ?? 0,
      };
    }
    if (options?.request_delay === 0) {
      this.queue = new BypassQueue<Response>();
    } else if (options?.request_delay && options.request_delay > 0) {
      this.queue = new DelayQueue<Response>(options?.request_delay);
    } else {
      this.queue = new ConcurrentPool<Response>(
        options?.concurrent_request ?? 7,
        options?.concurrent_timeframe ?? 1000,
      );
    }
  }

  get token(): OAuth | undefined {
    return this._token;
  }

  private async authorization(value: OAuthCode | OAuthRefresh): Promise<void> {
    const res = await this.queue.push(() =>
      fetch(`${this.url_base}/oauth2/access_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      })
    );
    if (res.ok === false) {
      throw new AuthError(res.body ? await res.json() : "Empty");
    }
    const data = (await res.json()) as OAuth;
    this._token = { ...data, expires_at: Date.now() + (data.expires_in * 1000) };
    if (this.options?.on_token !== undefined) {
      this.options.on_token(this._token);
    }
  }

  private async checkToken(): Promise<void> {
    if (this._token === undefined && this.isOAuthCode(this.auth)) {
      await this.authorization(this.auth);
    } else if (this._token !== undefined && Date.now() >= this._token.expires_at) {
      await this.authorization({
        client_id: this.auth.client_id,
        client_secret: this.auth.client_secret,
        grant_type: "refresh_token",
        refresh_token: this._token.refresh_token,
        redirect_uri: this.auth.redirect_uri,
      });
    }
  }

  private async checkError(res: Response, method: HttpMethod): Promise<void> {
    if (res.ok !== false && res.status !== 204) return;
    if (res.status === 204 && method === "DELETE") return;
    if (res.headers.get("Content-Type") === "application/problem+json") {
      throw new ApiError(res.body ? await res.json() : "Error", `${res.status} ${res.statusText}, ${res.url}`);
    } else if (res.status === 204) {
      throw new NoContentError(`${res.status} ${res.statusText}, ${res.url}`);
    } else {
      throw new HttpError(res.body ? await res.text() : `${res.status} ${res.statusText}, ${res.url}`);
    }
  }

  async request<T>(method: HttpMethod, init: RequestInit): Promise<T> {
    try {
      await this.checkToken();
      const target = `${init.url_base ?? this.url_base}${init?.url}${init.query ? "?" + init.query : ""}`;

      const res = await this.queue.push(() =>
        fetch(target, {
          method: method,
          headers: {
            "Authorization": `${this._token?.token_type} ${this._token?.access_token}`,
            "Content-Type": "application/json",
            ...init.headers,
          },
          body: init.payload ? JSON.stringify(init.payload) : undefined,
        })
      );

      await this.checkError(res, method);
      return res.body ? (await res.json()) as T : null as T;
    } catch (err) {
      if (this.options?.on_error) {
        this.options.on_error(err as Error | AuthError | ApiError | NoContentError | HttpError);
        return null as T;
      } else {
        throw err;
      }
    }
  }

  get<T>(init: RequestInit): Promise<T> {
    return this.request<T>("GET", init);
  }

  post<T>(init: RequestInit): Promise<T> {
    return this.request<T>("POST", init);
  }

  patch<T>(init: RequestInit): Promise<T> {
    return this.request<T>("PATCH", init);
  }

  delete<T>(init: RequestInit): Promise<T> {
    return this.request<T>("DELETE", init);
  }

  put<T>(init: RequestInit): Promise<T> {
    return this.request<T>("PUT", init);
  }

  private isOAuthCode(
    auth: OAuthCode | OAuth & Pick<OAuthRefresh, "client_id" | "client_secret" | "redirect_uri">,
  ): auth is OAuthCode {
    return (auth as OAuthCode).code !== undefined;
  }

  private isOAuth(auth: OAuthCode | OAuth): auth is OAuth {
    return (auth as OAuth).access_token !== undefined && (auth as OAuth).expires_at !== undefined &&
      (auth as OAuth).refresh_token !== undefined;
  }
}
