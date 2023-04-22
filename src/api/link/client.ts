import type { JSONValue } from "@typings/utility.ts";
import type {
  ReponseGetLinksByEntityId,
  ReponseGetLinksByEntityType,
  RequestAddLinkByEntityId,
  RequestAddLinkByEntityType,
  RequestDeleteLinkByEntityId,
  RequestDeleteLinkByEntityType,
  ResponseAddLinksByEntityId,
  ResponseAddLinksByEntityType,
} from "./types.ts";
import { RestClient } from "@core/rest-client.ts";

export class LinkApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить связанные сущности по типу основной сущности. */
  getLinksByEntityType(entity_type: "leads" | "contacts" | "companies" | "customers", params?: {
    // filter?: Filter[];
  }): Promise<ReponseGetLinksByEntityType> {
    return this.rest.get<ReponseGetLinksByEntityType>({
      url: `/api/v4/${entity_type}/links`,
    });
  }

  /** Метод позволяет получить связанные сущности по ID основной сущности. */
  getLinksByEntityId(id: number, entity_type: "leads" | "contacts" | "companies" | "customers", params?: {
    // filter?: Filter[];
  }): Promise<ReponseGetLinksByEntityId> {
    return this.rest.get<ReponseGetLinksByEntityId>({
      url: `/api/v4/${entity_type}/${id}/links`,
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
