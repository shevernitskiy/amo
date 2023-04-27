import type { ResponseGetTalkById } from "./types.ts";
import { RestClient } from "../../core/rest-client.ts";

export class TalkApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить данные конкретной беседы по ID. */
  getTalkById(id: number): Promise<ResponseGetTalkById> {
    return this.rest.get<ResponseGetTalkById>({
      url: `/api/v4/talks/${id}`,
    });
  }

  /** Метод позволяет запустить NPS-бота или закрыть беседу по ID. */
  closeTalkById(id: number, params?: {
    force_close: boolean;
  }): Promise<void> {
    return this.rest.post<void>({
      url: `/api/v4/talks/${id}/close`,
      payload: params,
    });
  }
}
