import { filterLikeToString } from "../helpers/filter.ts";
import { order } from "../helpers/order.ts";

// deno-lint-ignore no-explicit-any
export function query(params?: any): string {
  if (params === undefined || params === null) return "";

  const query = params === undefined ? undefined : {
    ...params,
    with: params.with === undefined ? undefined : params.with.join(","),
    order: params.order === undefined ? undefined : order(params.order),
    filter: params.filter === undefined ? undefined : filterLikeToString(params.filter),
    chat_id: params.chat_id === undefined ? undefined : params.chat_id.join(","),
    contact_id: params.contact_id === undefined ? undefined : params.contact_id.join(","),
  };

  const result: string[] = [];

  const common = new URLSearchParams(
    Object.entries(query)
      .filter((item) => item[1] !== undefined && item[0] !== "filter" && item[0] !== "order")
      .map<string[]>((item) => [item[0], String(item[1])]),
  ).toString();

  if (common !== "") {
    result.push(common);
  }
  if (query.order !== undefined) {
    result.push(query.order[0] + "=" + query.order[1]);
  }
  if (query.filter !== undefined) {
    result.push(query.filter.toString());
  }

  return result.filter((item) => item !== "").join("&");
}
