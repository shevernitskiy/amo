import type { ShortLink } from "@typings/entities.ts";
import type { Links } from "@typings/utility.ts";

export type RequestCreateShortLink = ShortLink[];
export type ResponseCreateShortLinks = Links & {
  _embedded: {
    short_links: (ShortLink & { account_id: number })[];
  };
};
