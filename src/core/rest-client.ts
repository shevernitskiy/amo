import type { HttpMethod, Options, RequestInit } from "../typings/lib.ts";
import type { OAuth, OAuthCode, OAuthRefresh } from "../typings/auth.ts";
import { AsyncQueue } from "./async-queue.ts";
import { AuthError } from "../errors/auth.ts";

export class RestClient {
  private url_base: string;
  private queue: AsyncQueue<Response>;
  private _token?: OAuth;

  constructor(
    private subdomain: string,
    private auth: OAuthCode | OAuth & Pick<OAuthRefresh, "client_id" | "client_secret" | "redirect_uri">,
    private options?: Options,
  ) {
    this.url_base = `https://${this.subdomain}.amocrm.ru`;
    if (this.isOAuth(this.auth)) {
      this._token = {
        token_type: this.auth.token_type,
        expires_in: this.auth.expires_in,
        access_token: this.auth.access_token,
        refresh_token: this.auth.refresh_token,
        expires_at: this.auth.expires_at ?? 0,
      };
    }
    this.queue = new AsyncQueue<Response>(options?.request_delay ?? 150);
  }

  get token(): OAuth | undefined {
    return this._token;
  }

  async authorization(value: OAuthCode | OAuthRefresh): Promise<void> {
    try {
      console.log("authorization", value, `${this.url_base}/oauth2/access_token`);
      const res = await this.queue.push(fetch, `${this.url_base}/oauth2/access_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      if (res.ok === false) {
        throw new AuthError(await res.json());
      }
      const data = (await res.json()) as OAuth;
      this._token = { ...data, expires_at: Date.now() + (data.expires_in * 1000) };
      if (this.options?.on_token !== undefined) {
        this.options.on_token(this._token);
      }
    } catch (err) {
      throw err;
    }
  }

  async request<T>(method: HttpMethod, init: RequestInit): Promise<T> {
    console.log(init);

    if (this._token === undefined && this.isOAuthCode(this.auth)) {
      console.log("AUTH BY CODE");
      await this.authorization(this.auth);
    } else if (this._token !== undefined && Date.now() >= this._token.expires_at) {
      console.log("AUTH BY REFRESH");
      await this.authorization({
        client_id: this.auth.client_id,
        client_secret: this.auth.client_secret,
        grant_type: "refresh_token",
        refresh_token: this._token.refresh_token,
        redirect_uri: this.auth.redirect_uri,
      });
    }

    const target = `${init.url_base ?? this.url_base}${init?.url}${init.query ? "?" + init.query : ""}`;

    console.log("REQUEST", target, init.payload);

    const res = await this.queue.push(fetch, target, {
      method: method,
      headers: {
        "Authorization": `${this._token?.token_type} ${this._token?.access_token}`,
        "Content-Type": "application/json",
      },
      body: init.payload ? JSON.stringify(init.payload) : undefined,
    });

    if (res.ok === false) {
      if (res.headers.get("Content-Type") === "application/problem+json") {
        // TODO: make ApiError
        console.log("API ERROR");
        // throw new ApiError(await res.json(), `${res.status} ${res.statusText}, ${res.url}`);
      } else {
        // TODO: make HttpError
        console.log("NE API ERROR");
        // throw new HttpError("HttpError\n" + await res.text());
      }
    }

    return (await res.json()) as T;
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

  isOAuthCode(
    auth: OAuthCode | OAuth & Pick<OAuthRefresh, "client_id" | "client_secret" | "redirect_uri">,
  ): auth is OAuthCode {
    return (auth as OAuthCode).code !== undefined;
  }

  isOAuth(auth: OAuthCode | OAuth): auth is OAuth {
    return (auth as OAuth).access_token !== undefined && (auth as OAuth).expires_at !== undefined &&
      (auth as OAuth).refresh_token !== undefined;
  }
}
