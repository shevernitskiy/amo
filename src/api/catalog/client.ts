import type { JSONValue, With } from "../../typings/utility.ts";
import type {
  RequestAddCatalog,
  RequestAddCatalogElement,
  RequestUpdateCatalog,
  RequestUpdateCatalogElement,
  ResponseAddCatalogElements,
  ResponseAddCatalogs,
  ResponseGetCatalog,
  ResponseGetCatalogElement,
  ResponseGetCatalogElements,
  ResponseGetCatalogs,
  ResponseUpdateCatalog,
  ResponseUpdateCatalogElement,
  ResponseUpdateCatalogElements,
  ResponseUpdateCatalogs,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import type { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

export class CatalogApi extends Endpoint {
  /** Метод позволяет получить доступные списки в аккаунте. */
  getCatalogs(params?: {
    page?: number;
    limit?: number;
  }): Promise<ResponseGetCatalogs> {
    return this.rest.get<ResponseGetCatalogs>({
      url: "/api/v4/catalogs",
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретного списка по ID. */
  getCatalogById(id: number): Promise<ResponseGetCatalog> {
    return this.rest.get<ResponseGetCatalog>({
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
  }): Promise<ResponseGetCatalogElements> {
    return this.rest.get<ResponseGetCatalogElements>({
      url: `/api/v4/catalogs/${catalog_id}/elements`,
      query: query(params),
    });
  }

  /** Метод позволяет получить элемент списка по его ID. */
  getCatalogElementById(id: number, catalog_id: number, params?: {
    with?: With<["invoice_link"]>;
  }): Promise<ResponseGetCatalogElement> {
    return this.rest.get<ResponseGetCatalogElement>({
      url: `/api/v4/catalogs/${catalog_id}/elements/${id}`,
      query: query(params),
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
