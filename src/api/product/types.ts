import type { Links } from "../../typings/utility.ts";

export type ResponseEnableProducts = Links & {
  is_enabled: true;
  catalog_id: number;
};

export type ResponseGetStatusProducts = ResponseEnableProducts;
