import type { Order } from "../typings/utility.ts";

export function order(value: Order<any>): [string, string] {
  return [`order[${value.param}]`, value.type];
}
