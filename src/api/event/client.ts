import type { With } from "../../typings/utility.ts";
import type { ResponseGetEventById, ResponseGetEvents, ResponseGetEventsTypes } from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import type { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

export class EventApi extends Endpoint {
  /** Метод позволяет получить список событий. */
  getEvents(params?: {
    with?: With<["contact_name", "lead_name", "company_name", "catalog_element_name", "customer_name", "catalog_name"]>;
    page?: number;
    limit?: number;
    // TODO: special case value_before, value_after
    filter?: FilterLike<
      ["id", "created_at", "created_by", "entity", "entity_id", "type"],
      ["id", "created_by", "entity", "entity_id", "type"],
      ["created_at"],
      never,
      never
    >;
  }): Promise<ResponseGetEvents> {
    return this.rest.get<ResponseGetEvents>({
      url: "/api/v4/events",
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретного события по ID. */
  getEventById(id: number, params?: {
    with?: With<["contact_name", "lead_name", "company_name", "catalog_element_name", "customer_name", "catalog_name"]>;
  }): Promise<ResponseGetEventById> {
    return this.rest.get<ResponseGetEventById>({
      url: `/api/v4/events/${id}`,
      query: query(params),
    });
  }

  /** Метод позволяет получить все доступные для аккаунта типы событий. */
  getEventsTypes(language_code: string): Promise<ResponseGetEventsTypes> {
    return this.rest.get<ResponseGetEventsTypes>({
      url: `/api/v4/events/types`,
      query: query({ language_code: language_code }),
    });
  }
}
