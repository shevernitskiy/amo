import type { Source } from "../../typings/entities.ts";
import type { DeepPartial, Links, Total } from "../../typings/utility.ts";

export type ResponseGetSources = Total & Links & {
  _embedded: {
    sources: ResponseGetSourceById[];
  };
};

export type ResponseGetSourceById = Links & Source;
export type RequestAddSource = DeepPartial<
  Pick<Source, "name" | "external_id" | "pipeline_id" | "default" | "origin_code" | "services">
>;

export type ResponseAddSources = ResponseGetSources;
export type RequestUpdateSource = DeepPartial<
  Pick<Source, "id" | "name" | "pipeline_id" | "default" | "origin_code" | "services">
>;

export type ResponseUpdateSources = ResponseGetSources;
export type RequestUpdateSourceById = DeepPartial<
  Pick<Source, "name" | "pipeline_id" | "default" | "origin_code" | "services">
>;

export type ResponseUpdateSourceById = ResponseGetSourceById;
export type RequestDeleteSource = Pick<Source, "id">[];
