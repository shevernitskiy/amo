import { createHash, createHmac } from "node:crypto";
import { Endpoint } from "../../core/endpoint.ts";
import { JSONValue } from "../../typings/utility.ts";

export class ChatApi extends Endpoint {
  headers(
    url: string,
    method: string,
    secret: string,
    body: JSONValue = "",
  ): Record<string, string | number | boolean> {
    const date = (new Date()).toUTCString();
    const body_hash = createHash("md5")
      .update(JSON.stringify(body))
      .digest("hex")
      .toLowerCase();
    const signature = createHmac("sha1", secret)
      .update([method.toUpperCase(), body_hash, "application/json", date, url].join("n"))
      .digest("hex")
      .toLowerCase();
    return {
      "Date": date,
      "Content-Type": "application/json",
      "Content-MD5": body_hash.toLowerCase(),
      "X-Signature": signature.toLowerCase(),
    };
  }
}
