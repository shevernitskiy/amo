import type { JSONValue, Order, With } from "../../typings/utility.ts";
import type {
  RequestAddCompany,
  RequestUpdateCompany,
  ResponseAddCompanies,
  ResponseGetCompanies,
  ResponseGetCompanyById,
  ResponseUpdateCompanies,
  ResponseUpdateCompany,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import type { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

export class CompanyApi extends Endpoint {
  /** Метод позволяет получить список компаний в аккаунте. */
  getCompanies(params?: {
    with?: With<["catalog_elements", "leads", "customers", "contacts"]>;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: FilterLike<
      ["id", "name", "created_by", "updated_by", "responsible_user_id"],
      ["id", "name", "created_by", "updated_by", "responsible_user_id"],
      ["created_at", "updated_at", "closest_task_at"],
      never,
      number
    >;
    order?: Order<["updated_at", "id"]>;
  }): Promise<ResponseGetCompanies> {
    return this.rest.get<ResponseGetCompanies>({
      url: "/api/v4/companies",
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретной компании по ID. */
  getCompanyById(id: number, params?: {
    with?: With<["catalog_elements", "leads", "customers", "contacts"]>;
  }): Promise<ResponseGetCompanyById> {
    return this.rest.get<ResponseGetCompanyById>({
      url: `/api/v4/companies/${id}`,
      query: query(params),
    });
  }

  /** Метод позволяет добавлять компании в аккаунт пакетно. */
  addCompanies(companies: RequestAddCompany[]): Promise<ResponseAddCompanies> {
    return this.rest.post<ResponseAddCompanies>({
      url: "/api/v4/companies",
      payload: companies as JSONValue,
    });
  }

  /** Метод позволяет редактировать компаний пакетно. */
  updateCompanies(companies: RequestUpdateCompany[]): Promise<ResponseUpdateCompanies> {
    return this.rest.patch<ResponseUpdateCompanies>({
      url: "/api/v4/companies",
      payload: companies as JSONValue,
    });
  }

  /** Метод позволяет редактировать данные конкретной компании по ID. */
  updateCompaniesById(id: number, company: RequestUpdateCompany): Promise<ResponseUpdateCompany> {
    return this.rest.patch<ResponseUpdateCompany>({
      url: `/api/v4/companies/${id}`,
      payload: company as JSONValue,
    });
  }
}
