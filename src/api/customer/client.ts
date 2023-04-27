import type { JSONValue, With } from "../../typings/utility.ts";
import type {
  RequestAddCustomer,
  RequestAddTransactionsToCustomer,
  RequestUpdateBonusPoints,
  RequestUpdateCustomer,
  RequestUpdateCustomerById,
  ResponseAddCustomers,
  ResponseAddTransactionsToCustomer,
  ResponseCustomerSubscriptionById,
  ResponseGetCustomerById,
  ResponseGetCustomers,
  ResponseGetTransactions,
  ResponseUpdateBonusPoints,
  ResponseUpdateCustomerById,
  ResponseUpdateCustomers,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

export class CustomerApi extends Endpoint {
  /** Метод позволяет включать/выключать функционал покупателей, а также менять режим функционала. */
  updateCustomersMode(params: {
    mode: "segments" | "periodicity";
    is_enabled: boolean;
  }): Promise<typeof params> {
    return this.rest.patch<typeof params>({
      url: "/api/v4/customers/mode",
      payload: params as JSONValue,
    });
  }

  /** Метод позволяет получить список покупателей в аккаунте. */
  getCustomers(params?: {
    with?: With<["catalog_elements", "contacts", "companies"]>;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: FilterLike<
      ["id", "name", "pipeline_id", "status_id", "created_by", "updated_by", "responsible_user_id"],
      ["id", "name", "pipeline_id", "status_id", "created_by", "updated_by", "responsible_user_id"],
      ["next_price", "next_date", "created_at", "updated_at", "closed_at", "closest_task_at"],
      never,
      number
    >;
  }): Promise<ResponseGetCustomers> {
    return this.rest.get<ResponseGetCustomers>({
      url: "/api/v4/customers",
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретного покупателя по ID. */
  getCustomerById(id: number, params?: {
    with?: With<["catalog_elements", "contacts", "companies"]>;
  }): Promise<ResponseGetCustomerById> {
    return this.rest.get<ResponseGetCustomerById>({
      url: `/api/v4/customers/${id}`,
      query: query(params),
    });
  }

  /** Метод позволяет добавлять покупателей в аккаунт пакетно. */
  addCustomers(customers: RequestAddCustomer[]): Promise<ResponseAddCustomers> {
    return this.rest.post<ResponseAddCustomers>({
      url: "/api/v4/customers",
      payload: customers as JSONValue,
    });
  }

  /** Метод позволяет редактировать покупателей пакетно. */
  updateCustomers(customers: RequestUpdateCustomer[]): Promise<ResponseUpdateCustomers> {
    return this.rest.patch<ResponseUpdateCustomers>({
      url: "/api/v4/customers",
      payload: customers as JSONValue,
    });
  }

  /** Метод позволяет редактировать покупателей по ID. */
  updateCustomerById(id: number, customer: RequestUpdateCustomerById): Promise<ResponseUpdateCustomerById> {
    return this.rest.patch<ResponseUpdateCustomerById>({
      url: `/api/v4/customers/${id}`,
      payload: customer as JSONValue,
    });
  }

  /** Метод позволяет получить список транзакций в аккаунте. */
  getTransactions(params?: {
    page?: number;
    limit?: number;
    filter?: FilterLike<["id"], ["id"], never, never, never>;
  }): Promise<ResponseGetTransactions> {
    return this.rest.get<ResponseGetTransactions>({
      url: "/api/v4/customers/transactions",
      query: query(params),
    });
  }

  /** Метод позволяет получить список транзакций покупателя по ID. */
  getTransactionsByCustomerId(customer_id: number, params?: {
    page?: number;
    limit?: number;
    filter?: FilterLike<["id"], ["id"], never, never, never>;
  }): Promise<ResponseGetCustomerById> {
    return this.rest.get<ResponseGetCustomerById>({
      url: `/api/v4/customers/${customer_id}/transactions`,
      query: query(params),
    });
  }

  /** Метод позволяет добавлять транзакции к конкретному покупателю в аккаунт пакетно. */
  addTransactionsToCustomer(
    customer_id: number,
    transactions: RequestAddTransactionsToCustomer[],
  ): Promise<ResponseAddTransactionsToCustomer> {
    return this.rest.post<ResponseAddTransactionsToCustomer>({
      url: `/api/v4/customers/${customer_id}/transactions`,
      payload: transactions as JSONValue,
    });
  }

  /** Метод позволяет удалить транзакцию в аккаунте. */
  deleteTransactionsById(id: number): Promise<void> {
    return this.rest.delete<void>({
      url: `/api/v4/customers/transactions/${id}`,
    });
  }

  /** Метод позволяет удалить транзакцию в аккаунте. */
  updateBonusPointsByCustomerId(id: number, points: RequestUpdateBonusPoints): Promise<ResponseUpdateBonusPoints> {
    return this.rest.post<ResponseUpdateBonusPoints>({
      url: `/api/v4/customers/${id}/bonus_points`,
      payload: points as JSONValue,
    });
  }

  /** Метод позволяет получить подписчиков конкретной сущности. */
  getCustomerSubscriptionById(customer_id: number, params?: {
    page?: number;
    limit?: number;
  }): Promise<ResponseCustomerSubscriptionById> {
    return this.rest.get<ResponseCustomerSubscriptionById>({
      url: `/api/v4/customers/${customer_id}/subscriptions`,
      query: query(params),
    });
  }
}
