import { createHash, createHmac } from "node:crypto";
import { ApiError } from "../../errors/api.ts";
import { HttpError } from "../../errors/http.ts";
import { NoContentError } from "../../errors/no-content.ts";
import { ConcurrentPool, DelayQueue } from "../async-queue.ts";

import type { HttpMethod, Options, RequestInit } from "../../typings/lib.ts";
import type { JSONValue } from "../../typings/utility.ts";

export class ChatsRestClient {
  private url_base: string;
  private queue: DelayQueue<Response> | ConcurrentPool<Response>;

  constructor(
    private base_url: string,
    private secretKey: string,
    private options?: Options,
  ) {
    this.url_base = `https://${this.base_url}`; //amojo.amocrm.ru | amojo.kommo.com

    if (options?.request_delay) {
      this.queue = new DelayQueue<Response>(options.request_delay);
    } else {
      this.queue = new ConcurrentPool<Response>(
        options?.concurrent_request ?? 7,
        options?.concurrent_timeframe ?? 1000,
      );
    }
  }

  private getHeaders(body: JSONValue): Headers {
    const contentType = "application/json";
    const date = new Date().toUTCString().replace(
      /(\w+), (\d+) (\w+) (\d+) (\d+):(\d+):(\d+) GMT/,
      "$1, $2 $3 $4 $5:$6:$7 +0000",
    );

    const checkSum = createHash("md5")
      .update(JSON.stringify(body))
      .digest("hex")
      .toLowerCase();
    const signature = createHmac("sha1", this.secretKey)
      .update(JSON.stringify(body))
      .digest("hex")
      .toLowerCase();

    const headers = new Headers();
    headers.append("Date", date);
    headers.append("Content-Type", contentType);
    headers.append("Content-MD5", checkSum);
    headers.append("X-Signature", signature);

    return headers;
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
      const target = `${this.url_base}${init.url}${init.query ? "?" + init.query : ""}`;
      const headers = this.getHeaders(init.payload || {});

      const res = await this.queue.push(() =>
        fetch(target, {
          method: method,
          headers: headers,
          body: init.payload ? JSON.stringify(init.payload) : undefined,
        })
      );

      await this.checkError(res, method);
      return res.body ? (await res.json()) as T : null as T;
    } catch (err) {
      if (this.options?.on_error) {
        this.options.on_error(err);
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
}
