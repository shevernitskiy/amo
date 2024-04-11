import type { JSONValue, Order } from "../../typings/utility.ts";
import type {
  RequestAddTask,
  RequestCompleteTask,
  RequestCompleteTaskById,
  RequestUpdateTask,
  RequestUpdateTaskById,
  ResponseAddTasks,
  ResponseCompleteTaskById,
  ResponseCompleteTasks,
  ResponseGetTaskById,
  ResponseGetTasks,
  ResponseUpdateTaskById,
  ResponseUpdateTasks,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import type { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

export class TaskApi extends Endpoint {
  /** Метод позволяет получить список задач в аккаунте. */
  getTasks(params?: {
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: FilterLike<
      ["responsible_user_id", "is_completed", "task_type", "entity_type", "entity_id", "id", "updated_at"],
      ["responsible_user_id", "task_type", "entity_id", "id"],
      ["updated_at"],
      never,
      never
    >;
    order?: Order<["created_at", "complete_till", "id"]>;
  }): Promise<ResponseGetTasks> {
    return this.rest.get<ResponseGetTasks>({
      url: "/api/v4/tasks",
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретной задачи по ID. */
  getTaskById(id: number): Promise<ResponseGetTaskById> {
    return this.rest.get<ResponseGetTaskById>({
      url: `/api/v4/tasks/${id}`,
    });
  }

  /** Метод позволяет добавлять задачи в аккаунт пакетно. */
  addTasks(tasks: RequestAddTask[]): Promise<ResponseAddTasks> {
    return this.rest.post<ResponseAddTasks>({
      url: "/api/v4/tasks",
      payload: tasks as JSONValue,
    });
  }

  /** Метод позволяет редактировать задачи пакетно. */
  updateTasks(tasks: RequestUpdateTask[]): Promise<ResponseUpdateTasks> {
    return this.rest.patch<ResponseUpdateTasks>({
      url: "/api/v4/tasks",
      payload: tasks as JSONValue,
    });
  }

  /** Метод позволяет редактировать данные конкретной задачи по ID. */
  updateTaskById(id: number, task: RequestUpdateTaskById): Promise<ResponseUpdateTaskById> {
    return this.rest.patch<ResponseUpdateTaskById>({
      url: `/api/v4/tasks/${id}`,
      payload: task as JSONValue,
    });
  }

  /** Метод позволяет завершить задачи пакетно. */
  completeTasks(tasks: RequestCompleteTask[]): Promise<ResponseCompleteTasks> {
    return this.rest.patch<ResponseCompleteTasks>({
      url: "/api/v4/tasks",
      payload: tasks as JSONValue,
    });
  }

  /** Метод позволяет завершить конкретную задачу по ID. */
  completeTaskById(id: number, task: RequestCompleteTaskById): Promise<ResponseCompleteTaskById> {
    return this.rest.patch<ResponseCompleteTaskById>({
      url: `/api/v4/tasks/${id}`,
      payload: task as JSONValue,
    });
  }
}
