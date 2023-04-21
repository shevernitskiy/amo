import type { Links, Total } from "@typings/utility.ts";
import type { Pipeline, PipelineStatus } from "@typings/entities.ts";

export type ReponseGetPipelines = Links & Total & {
  _embedded: {
    pipelines: ReponseGetPipeline[];
  };
};

export type ReponseGetPipeline = Links & Pipeline & {
  _embedded: {
    statuses: (Links & PipelineStatus)[];
  };
};

export type RequestAddPipeline =
  & Partial<Pick<Pipeline, "name" | "sort" | "is_main" | "is_unsorted_on">>
  & {
    request_id?: string;
    _embedded?: {
      statuses?: Partial<PipelineStatus>[];
    };
  };

export type ResponseAddPipelines = Total & Links & {
  _emebdded: {
    pipelines: (Links & Pipeline & {
      _embedded: {
        statuses: (Links & PipelineStatus)[];
      };
    })[];
  };
};

export type RequestUpdatePipeline = Partial<Pick<Pipeline, "name" | "sort" | "is_main" | "is_unsorted_on">>;

export type ResponseUpdatePipeline = ReponseGetPipeline;

export type ReponseGetStatusesPipeline = ReponseGetPipelines;

export type ReponseGetStatus = Links & PipelineStatus;

export type RequestAddStatus = {
  name: string;
  sort: number;
  color?: string;
  request_id?: string;
};

export type ResponseAddStatuses = Total & {
  _embedded: {
    statuses: (Links & PipelineStatus)[];
  };
};

export type RequestUpdateStatus = {
  name?: string;
  sort?: number;
  color?: string;
};

export type ResponseUpdateStatus = Links & PipelineStatus;
