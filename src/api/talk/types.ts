import type { Talk } from "../../typings/entities.ts";
import type { Embedded, Links } from "../../typings/utility.ts";

export type ResponseGetTalkById = Links & Talk & Pick<Embedded, "contacts" | "leads" | "customers">;
