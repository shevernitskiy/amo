import type { ChatTemplate } from "@typings/entities.ts";
import type { DeepPartial, Links, Page, RequestId, Total } from "@typings/utility.ts";

export type ResponseGetChatTemplates = Page & Links & {
  _embedded: {
    chat_templates: ResponseGetChatTemplateById[];
  };
};

export type ResponseGetChatTemplateById = Links & ChatTemplate;
export type RequestAddChatTemplate =
  & DeepPartial<Pick<ChatTemplate, "name" | "content" | "is_editable" | "buttons" | "attachment" | "external_id">>
  & RequestId;

export type ResponseAddChatTemplates = Total & {
  _embedded: {
    chat_templates: (Links & ChatTemplate & RequestId)[];
  };
};

export type RequestUpdateChatTemplate = DeepPartial<ChatTemplate> & RequestId;
export type ResponseUpdateChatTemplates = ResponseAddChatTemplates;
export type ResponseUpdateChatTemplate = Links & ChatTemplate & RequestId;
export type RequestDeleteChatTemplate = Pick<ChatTemplate, "id">;
