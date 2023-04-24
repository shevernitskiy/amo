import type { Segment } from "@typings/entities.ts";
import type { Links, Page, PageCount, RequestId, Total } from "@typings/utility.ts";

export type ResponseGetSegments = Total & Links & Page & PageCount & {
  _embedded: {
    segments: ResponseGetSegmentById[];
  };
};

export type ResponseGetSegmentById = Links & Segment;
export type RequestAddSegment = Pick<
  Segment,
  "name" | "available_products_price_types" | "color" | "custom_fields_values"
>;
export type ResponseAddSegment = ResponseGetSegmentById;

export type RequestUpdateSegment = Partial<RequestAddSegment> & RequestId;
export type ResponseUpdateSegment = ResponseGetSegmentById;
