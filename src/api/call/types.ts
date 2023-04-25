import type { Links, RequestId, Total } from "@typings/utility.ts";
import type { Call } from "@typings/entities.ts";

export type RequestAddCall = Call & RequestId;
export type ResponseAddCalls = Total & {
  // deno-lint-ignore no-explicit-any
  errors: any[];
  _embedded: {
    calls: (RequestId & {
      id: number;
      entity_id: number;
      entity_type: string;
      account_id: number;
      _embedded: {
        entity: Links & { id: number };
      };
    })[];
  };
};
