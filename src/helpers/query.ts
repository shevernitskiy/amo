import { filterLikeToString } from "@helpers/filter.ts";
import { order } from "@helpers/order.ts";

// deno-lint-ignore no-explicit-any
export function query(params?: any): Record<string, unknown> {
  return params === undefined ? undefined : {
    ...params,
    with: params.with === undefined ? undefined : params.with.join(","),
    order: params.order === undefined ? undefined : order(params.order),
    filter: params.filter === undefined ? undefined : filterLikeToString(params.filter),
  };
}
