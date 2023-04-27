import type { RequestCreateShortLink, ResponseCreateShortLinks } from "./types.ts";
import { RestClient } from "../../core/rest-client.ts";

export class ShortLinkApi {
  constructor(private rest: RestClient) {}

  createShortLinks(links: RequestCreateShortLink[]): Promise<ResponseCreateShortLinks> {
    return this.rest.post<ResponseCreateShortLinks>({
      url: "/api/v4/short_links",
      payload: links,
    });
  }
}
