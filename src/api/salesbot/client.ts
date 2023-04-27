import type { RequestRunSalesBotTask, ResponseRunSalesBotTasks } from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";

export class SalesBotApi extends Endpoint {
  /** Метод для запуска Salesbot. Ограничение, не более 100 задач за раз. */
  runTask(tasks: RequestRunSalesBotTask[]): Promise<ResponseRunSalesBotTasks> {
    return this.rest.post<ResponseRunSalesBotTasks>({
      url: "/api/v2/salesbot/run",
      payload: tasks,
    });
  }
}
