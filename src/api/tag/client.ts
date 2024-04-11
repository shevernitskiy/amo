import type { JSONValue } from "../../typings/utility.ts";
import type {
  RequesDeleteTagToEntity,
  RequestAddTag,
  RequestAddTagToEntity,
  ResponseAddTags,
  ResponseAddTagsToEntities,
  ResponseDeleteTagsToEntities,
  ResponseGetTags,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import type { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

type Entities = "leads" | "contacts" | "companies" | "customers";

export class TagApi extends Endpoint {
  /** Метод позволяет получить список тегов для сущности в аккаунте. */
  getTags(entity_type: Entities, params?: {
    page?: number;
    limit?: number;
    query?: string;
    filter?: FilterLike<["id", "name"], ["id"], never, never, never>;
  }): Promise<ResponseGetTags> {
    return this.rest.get<ResponseGetTags>({
      url: `/api/v4/${entity_type}/tags`,
      query: query(params),
    });
  }

  /** Метод позволяет добавлять теги для указанной в URL сущности пакетно. */
  addTags(
    entity_type: Entities,
    tags: RequestAddTag[],
  ): Promise<ResponseAddTags> {
    return this.rest.post<ResponseAddTags>({
      url: `/api/v4/${entity_type}/tags`,
      payload: tags as JSONValue,
    });
  }

  /** Метод позволяет добавлять теги к сущностям пакетно. */
  addTagsToEntities<T extends Entities>(
    entity_type: T,
    tags: RequestAddTagToEntity[],
  ): Promise<ResponseAddTagsToEntities<T>> {
    return this.rest.patch<ResponseAddTagsToEntities<T>>({
      url: `/api/v4/${entity_type}`,
      payload: tags as JSONValue,
    });
  }

  /** Метод позволяет добавлять теги к сущностям по ID */
  addTagsToEntitiesById<T extends Entities>(
    id: number,
    entity_type: T,
    tag: RequestAddTagToEntity,
  ): Promise<ResponseAddTagsToEntities<T>> {
    return this.rest.patch<ResponseAddTagsToEntities<T>>({
      url: `/api/v4/${entity_type}/${id}`,
      payload: tag as JSONValue,
    });
  }

  /** Метод позволяет удалить теги у сущностей  пакетно. */
  deleteTagsFromEntities<T extends Entities>(
    entity_type: T,
    tags: RequesDeleteTagToEntity[],
  ): Promise<ResponseDeleteTagsToEntities<T>> {
    return this.rest.patch<ResponseDeleteTagsToEntities<T>>({
      url: `/api/v4/${entity_type}`,
      payload: tags as JSONValue,
    });
  }

  /** Метод позволяет удалить теги к сущности по ID */
  deleteTagsToEntitiesById<T extends Entities>(
    id: number,
    entity_type: T,
    tag: RequesDeleteTagToEntity,
  ): Promise<ResponseDeleteTagsToEntities<T>> {
    return this.rest.patch<ResponseDeleteTagsToEntities<T>>({
      url: `/api/v4/${entity_type}/${id}`,
      payload: tag as JSONValue,
    });
  }
}
