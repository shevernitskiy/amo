import type { Links, Page, RequestId } from "@typings/utility.ts";
import type { Task } from "@typings/entities.ts";

export type ReponseGetTasks = Page & Links & {
  _embedded: {
    tasks: ReponseGetTaskById[];
  };
};

export type ReponseGetTaskById = Task & Links;
export type RequestAddTask = Partial<
  Pick<
    Task,
    | "responsible_user_id"
    | "entity_id"
    | "entity_type"
    | "is_completed"
    | "task_type_id"
    | "text"
    | "duration"
    | "complete_till"
    | "result"
    | "created_by"
    | "updated_by"
    | "created_at"
    | "updated_at"
  > & RequestId
>;

export type ResponseAddTasks = Links & {
  _embedded: {
    tasks: (Links & Pick<Task, "id"> & RequestId)[];
  };
};

export type RequestUpdateTask = RequestAddTask & Pick<Task, "id">;
export type ResponseUpdateTasks = Links & {
  _embedded: {
    tasks: (Links & Pick<Task, "id" | "updated_at"> & RequestId)[];
  };
};

export type RequestUpdateTaskById = RequestAddTask;
export type ResponseUpdateTaskById = Links & Pick<Task, "id" | "updated_at"> & RequestId;
export type RequestCompleteTask = Partial<Pick<Task, "is_completed" | "result" | "id">>;
export type ResponseCompleteTasks = ResponseUpdateTasks;
export type RequestCompleteTaskById = Partial<Pick<Task, "is_completed" | "result">>;
export type ResponseCompleteTaskById = ResponseUpdateTaskById;
