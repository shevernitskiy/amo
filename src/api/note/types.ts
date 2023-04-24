import type { Note } from "@typings/entities.ts";
import type { DeepPartial, Links, Page, RequestId } from "@typings/utility.ts";

export type ResponseGetNotesByEntityType = Page & Links & {
  _embedded: {
    notes: ResponseGetNotesById[];
  };
};

export type ResponseGetNotesByEntityId = ResponseGetNotesByEntityType;
export type ResponseGetNotesById = Links & Note;
export type RequestAddNote =
  & DeepPartial<Pick<Note, "entity_id" | "created_by" | "note_type" | "params">>
  & RequestId
  & {
    is_need_to_trigger_digital_pipeline?: boolean;
  };

export type ResponseAddNotes = Links & {
  _ebmedded: {
    notes: (Links & Pick<Note, "id" | "entity_id"> & RequestId)[];
  };
};

export type RequestUpdateNote = Pick<Note, "entity_id" | "note_type" | "params">;
export type ResponseUpdateNotes = Links & {
  _ebmedded: {
    notes: RequestUpdateNoteById[];
  };
};

export type RequestUpdateNoteById = Links & Pick<Note, "id" | "entity_id" | "updated_at">;
export type ResponseUpdateNoteById = ResponseUpdateNotes;
