import type { Talk } from "../../typings/entities.ts";
import type { Embedded, Links, Page } from "../../typings/utility.ts";

export type ResponseGetTalkById = Links & Talk & Pick<Embedded, "contacts" | "leads" | "customers">;

export type ResponseGetTalks = Page & Links & {
  _embedded: {
    talks: (Links & Talk & Pick<Embedded, "contacts" | "leads" | "customers">)[];
  };
};
