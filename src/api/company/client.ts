import type { JSONValue, Order, With } from "@typings/utility.ts";
import type {
  ReponseGetCompanies,
  ReponseGetCompanyById,
  RequestAddCompany,
  RequestUpdateCompany,
  ResponseAddCompanies,
  ResponseUpdateCompanies,
  ResponseUpdateCompany,
} from "./types.ts";
import { RestClient } from "@core/rest-client.ts";
import { order } from "@helpers/order.ts";

export class CompanyApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить список компаний в аккаунте. */
  getCompanies(params?: {
    with?: With<["catalog_elements", "leads", "customers", "contacts"]>;
    page?: number;
    limit?: number;
    query?: string | number;
    // filter?: Filter[];
    order?: Order<["updated_at", "id"]>;
  }): Promise<ReponseGetCompanies> {
    return this.rest.get<ReponseGetCompanies>({
      url: "/api/v4/companies",
      query: params === undefined ? undefined : {
        ...params,
        with: params.with === undefined ? undefined : params.with.join(","),
        order: params.order === undefined ? undefined : order(params.order),
      },
    });
  }

  /** Метод позволяет получить данные конкретной компании по ID. */
  getCompanyById(id: number, params?: {
    with?: With<["catalog_elements", "leads", "customers", "contacts"]>;
  }): Promise<ReponseGetCompanyById> {
    return this.rest.get<ReponseGetCompanyById>({
      url: `/api/v4/companies/${id}`,
      query: params?.with === undefined ? undefined : { with: params.with.join(",") },
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