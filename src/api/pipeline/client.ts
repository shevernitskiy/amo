import type { JSONValue } from "@typings/utility.ts";
import type {
  ReponseGetPipeline,
  ReponseGetPipelines,
  ReponseGetStatus,
  ReponseGetStatusesPipeline,
  RequestAddPipeline,
  RequestAddStatus,
  RequestUpdatePipeline,
  RequestUpdateStatus,
  ResponseAddPipelines,
  ResponseAddStatuses,
  ResponseUpdatePipeline,
  ResponseUpdateStatus,
} from "./types.ts";
import { RestClient } from "@core/rest-client.ts";

export class PipelineApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить список воронок сделок в аккаунте. */
  getPipelines(): Promise<ReponseGetPipelines> {
    return this.rest.get<ReponseGetPipelines>({
      url: "/api/v4/leads/pipelines",
    });
  }

  /** Метод позволяет получить модель воронки сделок по ID */
  getPipelineById(id: number): Promise<ReponseGetPipeline> {
    return this.rest.get<ReponseGetPipeline>({
      url: `/api/v4/leads/pipelines/${id}`,
    });
  }

  /** Метод позволяет добавлять воронки в аккаунт пакетно. */
  addPipelines(pipelines: RequestAddPipeline[]): Promise<ResponseAddPipelines> {
    return this.rest.post<ResponseAddPipelines>({
      url: "/api/v4/leads/pipelines",
      payload: pipelines as JSONValue,
    });
  }

  /** Метод позволяет редактировать воронку в аккаунте по ID. */
  updatePipelinesById(id: number, pipeline: RequestUpdatePipeline): Promise<ResponseUpdatePipeline> {
    return this.rest.patch<ResponseUpdatePipeline>({
      url: `/api/v4/leads/pipelines/${id}`,
      payload: pipeline as JSONValue,
    });
  }

  /** Метод позволяет удалить воронку в аккаунте по ID */
  deletePipelineById(id: number): Promise<void> {
    return this.rest.delete<void>({
      url: `/api/v4/leads/pipelines/${id}`,
    });
  }

  /** Метод позволяет получить список статусов воронки сделок в аккаунте по ID */
  getStatusesByPipelineId(pipeline_id: number): Promise<ReponseGetStatusesPipeline> {
    return this.rest.get<ReponseGetStatusesPipeline>({
      url: `/api/v4/leads/pipelines/${pipeline_id}/statuses`,
    });
  }

  /** Метод позволяет получить модель статуса воронки сделок в аккаунте по ID статуса. */
  getStatusesById(id: number, pipeline_id: number): Promise<ReponseGetStatus> {
    return this.rest.get<ReponseGetStatus>({
      url: `/api/v4/leads/pipelines/${pipeline_id}/statuses/${id}`,
    });
  }

  /** Метод позволяет добавлять статусы воронки в аккаунт пакетно. */
  addStatuses(pipeline_id: number, statuses: RequestAddStatus[]): Promise<ResponseAddStatuses> {
    return this.rest.post<ResponseAddStatuses>({
      url: `/api/v4/leads/pipelines/${pipeline_id}/statuses`,
      payload: statuses as JSONValue,
    });
  }

  /** Метод позволяет редактировать статус воронки в аккаунте. */
  updateStatusById(id: number, pipeline_id: number, status: RequestUpdateStatus): Promise<ResponseUpdateStatus> {
    return this.rest.patch<ResponseUpdateStatus>({
      url: `/api/v4/leads/pipelines/${pipeline_id}/statuses/${id}`,
      payload: status as JSONValue,
    });
  }

  /** Метод позволяет удалить статус в аккаунте. */
  deleteStatusById(id: number, pipeline_id: number): Promise<void> {
    return this.rest.delete<void>({
      url: `/api/v4/leads/pipelines/${pipeline_id}/statuses/${id}`,
    });
  }
}