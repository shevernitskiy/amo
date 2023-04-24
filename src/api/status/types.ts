import type { Status } from "@typings/entities.ts";
import type { Links, RequestId, Total } from "@typings/utility.ts";

export type ResponseGetStatuses = Total & Links & {
  _embedded: {
    statuses: ResponseGetStatusById[];
  };
};

export type ResponseGetStatusById = Links & Status;
export type RequestAddStatus = Pick<Status, "name" | "sort" | "color"> & RequestId;
export type ResponseAddStatuses = Total & Links & {
  _embedded: {
    statuses: Links & Pick<Status, "id"> & RequestId;
  };
};

export type RequestUpdateStatus = Partial<RequestAddStatus>;
export type ResponseUpdateStatus = ResponseGetStatusById;
