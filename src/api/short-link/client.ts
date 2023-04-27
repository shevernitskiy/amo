import type { RequestCreateShortLink, ResponseCreateShortLinks } from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";

export class ShortLinkApi extends Endpoint {
  createShortLinks(links: RequestCreateShortLink[]): Promise<ResponseCreateShortLinks> {
    return this.rest.post<ResponseCreateShortLinks>({
      url: "/api/v4/short_links",
      payload: links,
    });
  }
}
