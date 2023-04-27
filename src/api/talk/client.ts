import type { ResponseGetTalkById } from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";

export class TalkApi extends Endpoint {
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
