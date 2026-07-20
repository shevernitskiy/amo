import type { JSONValue, With } from "../../typings/utility.ts";
import type { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";
import type {
  RequestRunSalesBot,
  RequestRunSalesBot4Task,
  RequestRunSalesBotTask,
  RequestStopSalesBot,
  ResponseGetSalesBotById,
  ResponseGetSalesBots,
  ResponseRunSalesBotTasks,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";

export class SalesBotApi extends Endpoint {
  /** Метод позволяет получить список Salesbot в аккаунте. Метод API v4. */
  getSalesBots(params?: {
    with?: With<["favorite"]>;
    page?: number;
    limit?: number;
    filter?: FilterLike<["id", "type_functionality"], ["id", "type_functionality"], never, never, never>;
  }): Promise<ResponseGetSalesBots> {
    return this.rest.get<ResponseGetSalesBots>({
      url: "/api/v4/bots",
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретного Salesbot по ID. Метод API v4. */
  getSalesBotById(id: number, params?: {
    with?: With<["favorite"]>;
  }): Promise<ResponseGetSalesBotById> {
    return this.rest.get<ResponseGetSalesBotById>({
      url: `/api/v4/bots/${id}`,
      query: query(params),
    });
  }

  /** Метод запускает Salesbot по его ID для указанной сущности. Метод API v4. */
  runSalesBot(id: number, task: RequestRunSalesBot): Promise<void> {
    return this.rest.post<void>({
      url: `/api/v4/bots/${id}/run`,
      payload: task as JSONValue,
    });
  }

  /** Метод позволяет запускать Salesbot пакетно (не более 100 задач за раз). Метод API v4. */
  runSalesBots(tasks: RequestRunSalesBot4Task[]): Promise<void> {
    return this.rest.post<void>({
      url: "/api/v4/bots/run",
      payload: tasks as JSONValue,
    });
  }

  /** Метод позволяет остановить Salesbot по его ID. Остановка доступна только для сущностей типа leads. Метод API v4. */
  stopSalesBot(id: number, task: RequestStopSalesBot): Promise<void> {
    return this.rest.post<void>({
      url: `/api/v4/bots/${id}/stop`,
      payload: task as JSONValue,
    });
  }

  /** Метод для запуска Salesbot (устаревший метод API v2). Ограничение, не более 100 задач за раз. */
  runTask(tasks: RequestRunSalesBotTask[]): Promise<ResponseRunSalesBotTasks> {
    return this.rest.post<ResponseRunSalesBotTasks>({
      url: "/api/v2/salesbot/run",
      payload: tasks as JSONValue,
    });
  }
}
