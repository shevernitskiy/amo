import { Order } from "@typings/utility.ts";

// deno-lint-ignore no-explicit-any
export function order(value: Order<any>): [string, string] {
  return [`order[${value.param}]`, value.type];
}
