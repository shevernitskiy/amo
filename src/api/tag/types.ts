import type { Tag } from "../../typings/entities.ts";
import type { Links, Page, RequestId, Total } from "../../typings/utility.ts";

export type ResponseGetTags = Page & Links & {
  _embedded: {
    tags: Tag[];
  };
};

export type RequestAddTag = Pick<Tag, "name" | "color"> & RequestId;
export type ResponseAddTags = Total & {
  _embedded: {
    tags: (Tag & RequestId)[];
  };
};

export type RequestAddTagToEntity = { id: number } & {
  _embedded: {
    tags: Partial<Tag>;
  };
};

export type ResponseAddTagsToEntities<T extends string> = Links & {
  _embedded: Record<T, (Links & {
    id: number;
    updated_at: number;
  })[]>;
};

export type RequesDeleteTagToEntity = { id: number } & {
  _embedded: {
    tags: null;
  };
};

export type ResponseDeleteTagsToEntities<T extends string> = ResponseAddTagsToEntities<T>;
