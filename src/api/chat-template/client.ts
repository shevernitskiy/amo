import type {
  RequestAddChatTemplate,
  RequestDeleteChatTemplate,
  RequestUpdateChatTemplate,
  RequestUpdateStatusWhatsAppTemplate,
  ResponseAddChatTemplates,
  ResponseGetChatTemplateById,
  ResponseGetChatTemplates,
  ResponseModerationWhatsAppTemplate,
  ResponseUpdateChatTemplate,
  ResponseUpdateChatTemplates,
  ResponseUpdateStatusWhatsAppTemplate,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

import type { JSONValue } from "../../typings/utility.ts";

export class ChatTemplateApi extends Endpoint {
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

  /** Метод позволяет отправлять шаблон WhatsApp на модерацию. */
  sendWhatsAppTemplateToModeration(id: number): Promise<ResponseModerationWhatsAppTemplate> {
    return this.rest.post<ResponseModerationWhatsAppTemplate>({
      url: `/api/v4/chats/templates/${id}/review`,
    });
  }

  /** Метод позволяет редактировать шаблоны по ID. */
  updateWhatsAppTemplateById(
    id: number,
    review_id: number,
    review: RequestUpdateStatusWhatsAppTemplate,
  ): Promise<ResponseUpdateStatusWhatsAppTemplate> {
    return this.rest.patch<ResponseUpdateStatusWhatsAppTemplate>({
      url: `/api/v4/chats/templates/${id}/review/${review_id}`,
      payload: review as JSONValue,
    });
  }
}
