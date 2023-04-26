import type { JSONValue } from "@typings/utility.ts";
import type {
  RequestAddChatTemplate,
  RequestDeleteChatTemplate,
  RequestUpdateChatTemplate,
  ResponseAddChatTemplates,
  ResponseGetChatTemplateById,
  ResponseGetChatTemplates,
  ResponseUpdateChatTemplate,
  ResponseUpdateChatTemplates,
} from "./types.ts";
import { RestClient } from "@core/rest-client.ts";
import { FilterLike } from "@helpers/filter.ts";
import { query } from "@helpers/query.ts";

export class ChatTemplateApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить список шаблонов в аккаунте. */
  getChatTemplates(params?: {
    page?: number;
    limit?: number;
    filter?: FilterLike<["external_id"], ["external_id"], never, never, never>;
  }): Promise<ResponseGetChatTemplates> {
    return this.rest.get<ResponseGetChatTemplates>({
      url: "/api/v4/chats/templates",
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретного шаблона по ID. */
  getChatTemplateById(id: number): Promise<ResponseGetChatTemplateById> {
    return this.rest.get<ResponseGetChatTemplateById>({
      url: `/api/v4/chats/templates/${id}`,
    });
  }

  /** Метод позволяет добавлять шаблоны в аккаунт пакетно. */
  addChatTemplates(chat_templates: RequestAddChatTemplate[]): Promise<ResponseAddChatTemplates> {
    return this.rest.post<ResponseAddChatTemplates>({
      url: "/api/v4/chats/templates",
      payload: chat_templates as JSONValue,
    });
  }

  /** Метод позволяет редактировать шаблоны пакетно. */
  updateChatTemplates(chat_templates: RequestUpdateChatTemplate[]): Promise<ResponseUpdateChatTemplates> {
    return this.rest.patch<ResponseUpdateChatTemplates>({
      url: "/api/v4/chats/templates",
      payload: chat_templates as JSONValue,
    });
  }

  /** Метод позволяет редактировать шаблоны по ID. */
  updateChatTemplateById(id: number, chat_template: RequestUpdateChatTemplate): Promise<ResponseUpdateChatTemplate> {
    return this.rest.patch<ResponseUpdateChatTemplate>({
      url: `/api/v4/chats/templates/${id}`,
      payload: chat_template as JSONValue,
    });
  }

  /** Метод позволяет удалить шаблоны пакетно. */
  deleteChatTemplates(chat_templates: RequestDeleteChatTemplate[]): Promise<void> {
    return this.rest.delete<void>({
      url: "/api/v4/chats/templates",
      payload: chat_templates,
    });
  }

  /** Метод позволяет удалить шаблоны по ID. */
  deleteChatTemplateById(id: number): Promise<void> {
    return this.rest.delete<void>({
      url: `/api/v4/chats/templates/${id}`,
    });
  }
}
