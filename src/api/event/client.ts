import type { With } from "@typings/utility.ts";
import type { ReponseGetEventById, ReponseGetEvents, ReponseGetEventsTypes } from "./types.ts";
import { RestClient } from "@core/rest-client.ts";
import { FilterLike, filterLikeToString } from "@helpers/filter.ts";

export class EventApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить список событий. */
  getEvents(params?: {
    with?: With<["contact_name", "lead_name", "company_name", "catalog_element_name", "customer_name", "catalog_name"]>;
    page?: number;
    limit?: number;
    // TODO: special case value_before, value_after
    filter?: FilterLike<
      ["id", "created_at", "created_by", "entity", "entity_id", "type"],
      ["id", "created_at", "created_by", "entity", "entity_id", "type"],
      ["created_at"],
      number,
      number
    >;
  }): Promise<ReponseGetEvents> {
    return this.rest.get<ReponseGetEvents>({
      url: "/api/v4/events",
      query: params === undefined ? undefined : {
        ...params,
        with: params.with === undefined ? undefined : params.with.join(","),
        filter: params.filter === undefined ? undefined : filterLikeToString(params.filter),
      },
    });
  }

  /** Метод позволяет получить данные конкретного события по ID. */
  getEventById(id: number, params?: {
    with?: With<["contact_name", "lead_name", "company_name", "catalog_element_name", "customer_name", "catalog_name"]>;
  }): Promise<ReponseGetEventById> {
    return this.rest.get<ReponseGetEventById>({
      url: `/api/v4/events/${id}`,
      query: params?.with === undefined ? undefined : { with: params.with.join(",") },
    });
  }

  /** Метод позволяет получить все доступные для аккаунта типы событий. */
  getEventsTypes(language_code: string): Promise<ReponseGetEventsTypes> {
    return this.rest.get<ReponseGetEventsTypes>({
      url: `/api/v4/events/types`,
      query: language_code === undefined ? undefined : { language_code: language_code },
    });
  }
}
