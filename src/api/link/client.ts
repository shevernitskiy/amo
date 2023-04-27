import type { JSONValue } from "../../typings/utility.ts";
import type {
  RequestAddLinkByEntityId,
  RequestAddLinkByEntityType,
  RequestDeleteLinkByEntityId,
  RequestDeleteLinkByEntityType,
  ResponseAddLinksByEntityId,
  ResponseAddLinksByEntityType,
  ResponseGetLinksByEntityId,
  ResponseGetLinksByEntityType,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

export class LinkApi extends Endpoint {
  /** Метод позволяет получить связанные сущности по типу основной сущности. */
  getLinksByEntityType(entity_type: "leads" | "contacts" | "companies" | "customers", params?: {
    filter?: FilterLike<["to_entity_id", "to_entity_type", "to_catalog_id"], ["entity_id"], never, never, never>;
  }): Promise<ResponseGetLinksByEntityType> {
    return this.rest.get<ResponseGetLinksByEntityType>({
      url: `/api/v4/${entity_type}/links`,
      query: query(params),
    });
  }

  /** Метод позволяет получить связанные сущности по ID основной сущности. */
  getLinksByEntityId(id: number, entity_type: "leads" | "contacts" | "companies" | "customers", params?: {
    filter?: FilterLike<["to_entity_id", "to_entity_type", "to_catalog_id"], never, never, never, never>;
  }): Promise<ResponseGetLinksByEntityId> {
    return this.rest.get<ResponseGetLinksByEntityId>({
      url: `/api/v4/${entity_type}/${id}/links`,
      query: query(params),
    });
  }

  /** Метод позволяет прикреплять сущности к нескольким сущностям. */
  addLinksByEntityType(
    entity_type: "leads" | "contacts" | "companies" | "customers",
    links: RequestAddLinkByEntityType[],
  ): Promise<ResponseAddLinksByEntityType> {
    return this.rest.post<ResponseAddLinksByEntityType>({
      url: `/api/v4/${entity_type}/link`,
      payload: links as JSONValue,
    });
  }

  /** Метод позволяет прикреплять сущности к основной сущности. */
  addLinksByEntityId(
    id: number,
    entity_type: "leads" | "contacts" | "companies" | "customers",
    links: RequestAddLinkByEntityId[],
  ): Promise<ResponseAddLinksByEntityId> {
    return this.rest.post<ResponseAddLinksByEntityId>({
      url: `/api/v4/${entity_type}/${id}/link`,
      payload: links as JSONValue,
    });
  }

  /** Метод позволяет прикреплять сущности к основной сущности. */
  deleteLinksByEntityId(
    id: number,
    entity_type: "leads" | "contacts" | "companies" | "customers",
    links: RequestDeleteLinkByEntityId[],
  ): Promise<void> {
    return this.rest.post<void>({
      url: `/api/v4/${entity_type}/${id}/unlink`,
      payload: links as JSONValue,
    });
  }

  /** Метод позволяет открепить сущности у основных сущностей. */
  deleteLinksByEntityType(
    entity_type: "leads" | "contacts" | "companies" | "customers",
    links: RequestDeleteLinkByEntityType[],
  ): Promise<void> {
    return this.rest.post<void>({
      url: `/api/v4/${entity_type}/unlink`,
      payload: links as JSONValue,
    });
  }
}
