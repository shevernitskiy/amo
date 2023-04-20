import type { JSONValue, Order, With } from "@typings/utility.ts";
import type {
  ReponseGetLeadById,
  ReponseGetLeads,
  RequestAddComplex,
  RequestAddLead,
  RequestUpdateLead,
  ResponseAddComplex,
  ResponseAddLeads,
  ResponseUpdateLead,
  ResponseUpdateLeads,
} from "./types.ts";
import { RestClient } from "@core/rest-client.ts";
import { order } from "@helpers/order.ts";

export class LeadApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить список сделок в аккаунте. */
  getLeads(params?: {
    with?: With<
      ["catalog_elements", "is_price_modified_by_robot", "loss_reason", "contacts", "only_deleted", "source_id"]
    >;
    page?: number;
    limit?: number;
    query?: string | number;
    // filter?: Filter[];
    order?: Order<["created_at", "updated_at", "id"]>;
  }): Promise<ReponseGetLeads> {
    return this.rest.get<ReponseGetLeads>({
      url: "/api/v4/leads",
      query: params === undefined ? undefined : {
        ...params,
        with: params.with === undefined ? undefined : params.with.join(","),
        order: params.order === undefined ? undefined : order(params.order),
      },
    });
  }

  /** Метод позволяет получить данные конкретной сделки по ID. */
  getLeadById(id: number, params?: {
    with?: With<
      ["catalog_elements", "is_price_modified_by_robot", "loss_reason", "contacts", "only_deleted", "source_id"]
    >;
  }): Promise<ReponseGetLeadById> {
    return this.rest.get<ReponseGetLeadById>({
      url: `/api/v4/leads/${id}`,
      query: params?.with === undefined ? undefined : { with: params.with.join(",") },
    });
  }

  /** Метод позволяет добавлять сделки в аккаунт пакетно. */
  addLeads(leads: RequestAddLead[]): Promise<ResponseAddLeads> {
    return this.rest.post<ResponseAddLeads>({
      url: "/api/v4/leads",
      payload: leads as JSONValue,
    });
  }

  /** Метод позволяет редактировать сделки пакетно. */
  updateLeads(leads: RequestUpdateLead[]): Promise<ResponseUpdateLeads> {
    return this.rest.patch<ResponseUpdateLeads>({
      url: "/api/v4/leads",
      payload: leads as JSONValue,
    });
  }

  /** Метод позволяет редактировать данные конкретной сделки по ID. */
  updateLeadById(id: number, lead: RequestUpdateLead): Promise<ResponseUpdateLead> {
    return this.rest.patch<ResponseUpdateLead>({
      url: `/api/v4/leads/${id}`,
      payload: lead as JSONValue,
    });
  }

  /** Метод позволяет добавлять сделки c контактом и компанией в аккаунт пакетно. Добавляемые данные могут быть проверены в контроле дублей. */
  addComplex(leads: RequestAddComplex[]): Promise<ResponseAddComplex[]> {
    return this.rest.post<ResponseAddComplex[]>({
      url: "/api/v4/leads/complex",
      payload: leads as JSONValue,
    });
  }
}
