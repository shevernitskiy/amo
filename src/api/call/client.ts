import type { RequestAddCall, ResponseAddCalls } from "./types.ts";
import { RestClient } from "../../core/rest-client.ts";

export class CallApi {
  constructor(private rest: RestClient) {}

  /** Данный метод позволяет пакетно добавлять звонки в карточки сущностей. */
  addCalls(calls: RequestAddCall[]): Promise<ResponseAddCalls> {
    return this.rest.post<ResponseAddCalls>({
      url: "/api/v4/calls",
      payload: calls,
    });
  }
}
