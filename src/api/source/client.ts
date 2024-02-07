import type {
  RequestAddSource,
  RequestCreateCRMPlugin,
  RequestDeleteSource,
  RequestUpdateCRMPlugin,
  RequestUpdateSource,
  RequestUpdateSourceById,
  ResponseAddSources,
  ResponseCreateCRMPlugin,
  ResponseGetCRMPlugin,
  ResponseGetCRMPlugins,
  ResponseGetSourceById,
  ResponseGetSources,
  ResponseUpdateCRMPlugin,
  ResponseUpdateSourceById,
  ResponseUpdateSources,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

import type { JSONValue, With } from "../../typings/utility.ts";

export class SourceApi extends Endpoint {
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

  /** Метод позволяет создать CRM Plugin. */
  createCRMPlugin(plugin: RequestCreateCRMPlugin): Promise<ResponseCreateCRMPlugin> {
    return this.rest.post<ResponseCreateCRMPlugin>({
      url: `/api/v4/website_buttons`,
      payload: plugin as JSONValue,
    });
  }

  /** Метод позволяет подключить к CRM Plugin онлайн-чат. */
  connectChatToCRMPluginById(source_id: number): Promise<void> {
    return this.rest.post<void>({
      url: `/api/v4/website_buttons/${source_id}/online_chat`,
    });
  }

  /** Метод позволяет внести изменения в существующий CRM Plugin. */
  updateCRMPluginById(source_id: number, data: RequestUpdateCRMPlugin): Promise<ResponseUpdateCRMPlugin> {
    return this.rest.patch<ResponseUpdateCRMPlugin>({
      url: `/api/v4/website_buttons/${source_id}`,
      payload: data as JSONValue,
    });
  }

  /** Метод позволяет получить параметры модели одного CRM Plugin. */
  getCRMPluginById(source_id: number): Promise<ResponseGetCRMPlugin> {
    return this.rest.get<ResponseGetCRMPlugin>({
      url: `/api/v4/website_buttons/${source_id}`,
    });
  }

  /** Метод позволяет получить пагинированный список параметров моделей всех CRM Plugin в аккаунте. */
  getCRMPlugins(params?: {
    with?: With<["scripts"]>;
    page?: number;
    limit?: number;
  }): Promise<ResponseGetCRMPlugins> {
    return this.rest.get<ResponseGetCRMPlugins>({
      url: `/api/v4/website_buttons`,
      query: query(params),
    });
  }
}
