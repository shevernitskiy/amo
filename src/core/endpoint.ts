import type { RestClient } from "./rest-client.ts";

export class Endpoint {
  constructor(protected rest: RestClient) {}
}
