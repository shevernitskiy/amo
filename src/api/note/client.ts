import type { JSONValue, Order } from "@typings/utility.ts";
import type { NoteEntityType } from "@typings/entities.ts";
import type {
  ReponseGetNotesByEntityId,
  ReponseGetNotesByEntityType,
  ReponseGetNotesById,
  RequestAddNote,
  RequestUpdateNote,
  RequestUpdateNoteById,
  ResponseAddNotes,
  ResponseUpdateNoteById,
  ResponseUpdateNotes,
} from "./types.ts";
import { RestClient } from "@core/rest-client.ts";
import { FilterLike, filterLikeToString } from "@helpers/filter.ts";
import { order } from "@helpers/order.ts";

export class NoteApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить примечания по типу сущности. */
  getNotesByEntityType(entity_type: NoteEntityType, params?: {
    page?: number;
    limit?: number;
    filter?: FilterLike<
      ["id", "entity_id", "note_type", "updated_at"],
      ["id", "entity_id", "note_type"],
      ["updated_at"],
      never,
      never
    >;
    order?: Order<["updated_at", "id"]>;
  }): Promise<ReponseGetNotesByEntityType> {
    return this.rest.get<ReponseGetNotesByEntityType>({
      url: `/api/v4/${entity_type}/notes`,
      query: params === undefined ? undefined : {
        ...params,
        order: params.order === undefined ? undefined : order(params.order),
        filter: params.filter === undefined ? undefined : filterLikeToString(params.filter),
      },
    });
  }

  /** Метод позволяет получить примечания по ID родительской сущности. */
  getNotesByEntityId(entity_id: number, entity_type: NoteEntityType, params?: {
    page?: number;
    limit?: number;
    filter?: FilterLike<["id", "note_type", "updated_at"], ["id", "note_type"], ["updated_at"], never, never>;
    order?: Order<["updated_at", "id"]>;
  }): Promise<ReponseGetNotesByEntityId> {
    return this.rest.get<ReponseGetNotesByEntityId>({
      url: `/api/v4/${entity_type}/${entity_id}/notes`,
      query: params === undefined ? undefined : {
        ...params,
        order: params.order === undefined ? undefined : order(params.order),
        filter: params.filter === undefined ? undefined : filterLikeToString(params.filter),
      },
    });
  }

  /** Метод позволяет получить данные конкретного примечания по ID. */
  getNotesById(
    note_id: number,
    entity_type: NoteEntityType,
  ): Promise<ReponseGetNotesById> {
    return this.rest.get<ReponseGetNotesById>({
      url: `/api/v4/${entity_type}/notes/${note_id}`,
    });
  }

  /** Метод позволяет добавлять примечания в аккаунт пакетно. */
  addNotes(
    entity_type: NoteEntityType,
    notes: RequestAddNote[],
  ): Promise<ResponseAddNotes> {
    return this.rest.post<ResponseAddNotes>({
      url: `/api/v4/${entity_type}/notes`,
      payload: notes as JSONValue,
    });
  }

  /** Метод позволяет редактировать примечания пакетно. */
  updateNotes(
    entity_type: NoteEntityType,
    notes: RequestUpdateNote[],
  ): Promise<ResponseUpdateNotes> {
    return this.rest.patch<ResponseUpdateNotes>({
      url: `/api/v4/${entity_type}/notes`,
      payload: notes as JSONValue,
    });
  }

  /** Метод позволяет редактировать примечания по ID. */
  updateNoteById(
    note_id: number,
    entity_type: NoteEntityType,
    note: RequestUpdateNoteById,
  ): Promise<ResponseUpdateNoteById> {
    return this.rest.patch<ResponseUpdateNoteById>({
      url: `/api/v4/${entity_type}/${note.entity_id}/notes/${note_id}`,
      payload: note as JSONValue,
    });
  }
}
