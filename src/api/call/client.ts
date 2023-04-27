import type { RequestAddCall, ResponseAddCalls } from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";

export class CallApi extends Endpoint {
  /** Данный метод позволяет пакетно добавлять звонки в карточки сущностей. */
  addCalls(calls: RequestAddCall[]): Promise<ResponseAddCalls> {
    return this.rest.post<ResponseAddCalls>({
      url: "/api/v4/calls",
      payload: calls,
    });
  }
}
