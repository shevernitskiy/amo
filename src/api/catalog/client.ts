import type { JSONValue, With } from "@typings/utility.ts";
import type {
  ReponseGetCatalog,
  ReponseGetCatalogElement,
  ReponseGetCatalogElements,
  ReponseGetCatalogs,
  RequestAddCatalog,
  RequestAddCatalogElement,
  RequestUpdateCatalog,
  RequestUpdateCatalogElement,
  ResponseAddCatalogElements,
  ResponseAddCatalogs,
  ResponseUpdateCatalog,
  ResponseUpdateCatalogElement,
  ResponseUpdateCatalogElements,
  ResponseUpdateCatalogs,
} from "./types.ts";
import { RestClient } from "@core/rest-client.ts";
import { FilterLike, filterLikeToString } from "@helpers/filter.ts";

export class CatalogApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить доступные списки в аккаунте. */
  getCatalogs(params?: {
    page?: number;
    limit?: number;
  }): Promise<ReponseGetCatalogs> {
    return this.rest.get<ReponseGetCatalogs>({
      url: "/api/v4/catalogs",
      query: params,
    });
  }

  /** Метод позволяет получить данные конкретного списка по ID. */
  getCatalogById(id: number): Promise<ReponseGetCatalog> {
    return this.rest.get<ReponseGetCatalog>({
      url: `/api/v4/catalogs/${id}`,
    });
  }

  /** Метод позволяет добавлять списки в аккаунт пакетно. */
  addCatalogs(catalogs: RequestAddCatalog[]): Promise<ResponseAddCatalogs> {
    return this.rest.post<ResponseAddCatalogs>({
      url: "/api/v4/catalogs",
      payload: catalogs as JSONValue,
    });
  }

  /** Метод позволяет редактировать списки пакетно. */
  updateCatalogs(leads: RequestUpdateCatalog[]): Promise<ResponseUpdateCatalogs> {
    return this.rest.patch<ResponseUpdateCatalogs>({
      url: "/api/v4/catalogs",
      payload: leads as JSONValue,
    });
  }

  /** Метод позволяет редактировать данные конкретного списка по ID. */
  updateCatalogById(id: number, catalogs: RequestUpdateCatalog): Promise<ResponseUpdateCatalog> {
    return this.rest.patch<ResponseUpdateCatalog>({
      url: `/api/v4/catalogs/${id}`,
      payload: catalogs as JSONValue,
    });
  }

  /** Метод позволяет получить доступные элементы списка в аккаунте. */
  getCatalogElementsByCatalogId(catalog_id: number, params?: {
    with?: With<["invoice_link"]>;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: FilterLike<["id"], ["id"], never, never, never>;
  }): Promise<ReponseGetCatalogElements> {
    return this.rest.get<ReponseGetCatalogElements>({
      url: `/api/v4/catalogs/${catalog_id}/elements`,
      query: params === undefined ? undefined : {
        ...params,
        with: params.with === undefined ? undefined : params.with.join(","),
        filter: params.filter === undefined ? undefined : filterLikeToString(params.filter),
      },
    });
  }

  /** Метод позволяет получить элемент списка по его ID. */
  getCatalogElementById(id: number, catalog_id: number, params?: {
    with?: With<["invoice_link"]>;
  }): Promise<ReponseGetCatalogElement> {
    return this.rest.get<ReponseGetCatalogElement>({
      url: `/api/v4/catalogs/${catalog_id}/elements/${id}`,
      query: params === undefined ? undefined : {
        ...params,
        with: params.with === undefined ? undefined : params.with.join(","),
      },
    });
  }

  /** Метод позволяет добавлять списки в аккаунт пакетно. */
  addCatalogElements(catalog_id: number, catalogs: RequestAddCatalogElement[]): Promise<ResponseAddCatalogElements> {
    return this.rest.post<ResponseAddCatalogElements>({
      url: `/api/v4/catalogs/${catalog_id}`,
      payload: catalogs as JSONValue,
    });
  }

  /** Метод позволяет редактировать элементы списков пакетно. */
  updateCatalogElements(
    catalog_id: number,
    catalogs_elements: RequestUpdateCatalogElement[],
  ): Promise<ResponseUpdateCatalogElements> {
    return this.rest.patch<ResponseUpdateCatalogElements>({
      url: `/api/v4/catalogs/${catalog_id}/elements`,
      payload: catalogs_elements as JSONValue,
    });
  }

  /** Метод позволяет редактировать данные конкретного эелемента списка по ID. */
  updateCatalogElementById(
    id: number,
    catalog_id: number,
    catalogs_element: RequestUpdateCatalogElement,
  ): Promise<ResponseUpdateCatalogElement> {
    return this.rest.patch<ResponseUpdateCatalogElement>({
      url: `/api/v4/catalogs/${catalog_id}/elements/${id}`,
      payload: catalogs_element as JSONValue,
    });
  }
}
