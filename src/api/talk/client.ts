import type { ResponseGetTalkById, ResponseGetTalks } from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import type { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

export class TalkApi extends Endpoint {
  /** Метод позволяет получить список бесед в аккаунте. */
  getTalks(params?: {
    page?: number;
    limit?: number;
    filter?: FilterLike<
      ["talk_id", "contact_id", "entity_id", "entity_type", "only_in_work"],
      ["talk_id", "contact_id", "entity_id"],
      never,
      never,
      never
    >;
  }): Promise<ResponseGetTalks> {
    return this.rest.get<ResponseGetTalks>({
      url: "/api/v4/talks",
      query: query(params),
    });
  }

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
