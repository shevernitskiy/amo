import type {
  RequestAddStatus,
  RequestUpdateStatus,
  ResponseAddStatuses,
  ResponseGetStatusById,
  ResponseGetStatuses,
  ResponseUpdateStatus,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";

export class StatusApi extends Endpoint {
  /** Метод позволяет получить список статусов покупателей в аккаунте. */
  getStatuses(): Promise<ResponseGetStatuses> {
    return this.rest.get<ResponseGetStatuses>({
      url: "/api/v4/customers/statuses",
    });
  }

  /** Метод позволяет получить модель статуса покупателя в аккаунте по ID статуса. */
  getStatuseById(id: number): Promise<ResponseGetStatusById> {
    return this.rest.get<ResponseGetStatusById>({
      url: `/api/v4/customers/statuses/${id}`,
    });
  }

  /** Метод позволяет добавлять статусы покупателей в аккаунт пакетно. */
  addStatuses(statuses: RequestAddStatus[]): Promise<ResponseAddStatuses> {
    return this.rest.post<ResponseAddStatuses>({
      url: "/api/v4/customers/statuses",
      payload: statuses,
    });
  }

  /** Метод позволяет редактировать статус покупателей в аккаунте. */
  updateStatusById(id: number, status: RequestUpdateStatus): Promise<ResponseUpdateStatus> {
    return this.rest.patch<ResponseUpdateStatus>({
      url: `/api/v4/customers/statuses/${id}`,
      payload: status,
    });
  }

  /** Метод позволяет удалить статус покупателей в аккаунте. */
  deleteStatusById(id: number): Promise<void> {
    return this.rest.delete<void>({
      url: `/api/v4/customers/statuses/${id}`,
    });
  }
}
