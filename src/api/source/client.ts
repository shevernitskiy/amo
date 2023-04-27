import type { JSONValue } from "../../typings/utility.ts";
import type {
  RequestAddSource,
  RequestDeleteSource,
  RequestUpdateSource,
  RequestUpdateSourceById,
  ResponseAddSources,
  ResponseGetSourceById,
  ResponseGetSources,
  ResponseUpdateSourceById,
  ResponseUpdateSources,
} from "./types.ts";
import { RestClient } from "../../core/rest-client.ts";
import { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

export class SourceApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить список источников интеграции. */
  getSources(params?: {
    filter?: FilterLike<["external_id"], ["external_id"], never, never, never>;
  }): Promise<ResponseGetSources> {
    return this.rest.get<ResponseGetSources>({
      url: "/api/v4/sources",
      query: query(params),
    });
  }

  /** Метод позволяет получить список источников интеграции. */
  getSourceById(id: number): Promise<ResponseGetSourceById> {
    return this.rest.get<ResponseGetSourceById>({
      url: `/api/v4/sources/${id}`,
    });
  }

  /** Метод позволяет получить список источников интеграции. */
  addSources(sources: RequestAddSource[]): Promise<ResponseAddSources> {
    return this.rest.post<ResponseAddSources>({
      url: "/api/v4/sources",
      payload: sources as JSONValue,
    });
  }

  /** Метод позволяет редактировать источники пакетно. */
  updateSources(sources: RequestUpdateSource[]): Promise<ResponseUpdateSources> {
    return this.rest.patch<ResponseUpdateSources>({
      url: "/api/v4/sources",
      payload: sources as JSONValue,
    });
  }

  /** Метод позволяет редактировать источники ID. */
  updateSourceById(id: number, source: RequestUpdateSourceById): Promise<ResponseUpdateSourceById> {
    return this.rest.patch<ResponseUpdateSourceById>({
      url: `/api/v4/sources/${id}`,
      payload: source as JSONValue,
    });
  }

  /** Метод позволяет удалить источники пакетно. */
  deleteSources(sources: RequestDeleteSource[]): Promise<void> {
    return this.rest.delete<void>({
      url: "/api/v4/sources",
      payload: sources as JSONValue,
    });
  }

  /** Метод позволяет удалить источники ID. */
  deleteSourceById(id: number): Promise<void> {
    return this.rest.delete<void>({
      url: `/api/v4/sources/${id}`,
    });
  }
}
