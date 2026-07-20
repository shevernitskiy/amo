import type { JSONValue, Order, With } from "../../typings/utility.ts";
import type { NoteEntityType } from "../../typings/entities.ts";
import type {
  RequestAddNote,
  RequestUpdateNote,
  RequestUpdateNoteById,
  ResponseAddNotes,
  ResponseGetNotesByEntityId,
  ResponseGetNotesByEntityType,
  ResponseGetNotesById,
  ResponseUpdateNoteById,
  ResponseUpdateNotes,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import type { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

export class NoteApi extends Endpoint {
  /** Метод позволяет получить примечания по типу сущности. */
  getNotesByEntityType(entity_type: NoteEntityType, params?: {
    with?: With<["is_pinned"]>;
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
  }): Promise<ResponseGetNotesByEntityType> {
    return this.rest.get<ResponseGetNotesByEntityType>({
      url: `/api/v4/${entity_type}/notes`,
      query: query(params),
    });
  }

  /** Метод позволяет получить примечания по ID родительской сущности. */
  getNotesByEntityId(entity_id: number, entity_type: NoteEntityType, params?: {
    with?: With<["is_pinned"]>;
    page?: number;
    limit?: number;
    filter?: FilterLike<["id", "note_type", "updated_at"], ["id", "note_type"], ["updated_at"], never, never>;
    order?: Order<["updated_at", "id"]>;
  }): Promise<ResponseGetNotesByEntityId> {
    return this.rest.get<ResponseGetNotesByEntityId>({
      url: `/api/v4/${entity_type}/${entity_id}/notes`,
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретного примечания по ID. */
  getNotesById(
    note_id: number,
    entity_type: NoteEntityType,
    params?: {
      with?: With<["is_pinned"]>;
    },
  ): Promise<ResponseGetNotesById> {
    return this.rest.get<ResponseGetNotesById>({
      url: `/api/v4/${entity_type}/notes/${note_id}`,
      query: query(params),
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
      url: `/api/v4/${entity_type}/notes/${note_id}`,
      payload: note as JSONValue,
    });
  }

  /** Метод позволяет закрепить примечание по ID. */
  pinNote(note_id: number, entity_type: NoteEntityType): Promise<void> {
    return this.rest.post<void>({
      url: `/api/v4/${entity_type}/notes/${note_id}/pin`,
    });
  }

  /** Метод позволяет открепить примечание по ID. */
  unpinNote(note_id: number, entity_type: NoteEntityType): Promise<void> {
    return this.rest.post<void>({
      url: `/api/v4/${entity_type}/notes/${note_id}/unpin`,
    });
  }
}
