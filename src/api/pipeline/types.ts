import type { Links, RequestId, Total } from "@typings/utility.ts";
import type { Pipeline, PipelineStatus } from "@typings/entities.ts";

export type ResponseGetPipelines = Links & Total & {
  _embedded: {
    pipelines: ResponseGetPipeline[];
  };
};

export type ResponseGetPipeline = Links & Pipeline & {
  _embedded: {
    statuses: (Links & PipelineStatus)[];
  };
};

export type RequestAddPipeline =
  & Partial<Pick<Pipeline, "name" | "sort" | "is_main" | "is_unsorted_on">>
  & RequestId
  & {
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

export type ResponseUpdatePipeline = ResponseGetPipeline;

export type ResponseGetStatusesPipeline = ResponseGetPipelines;

export type ResponseGetStatus = Links & PipelineStatus;

export type RequestAddStatus = RequestId & {
  name: string;
  sort: number;
  color?: string;
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
