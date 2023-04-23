import type { JSONValue, Order, With } from "@typings/utility.ts";
import type {
  RequestAddContact,
  RequestLinkContactToChat,
  RequestUpdateContact,
  ResponseAddContacts,
  ResponseGetContactById,
  ResponseGetContacts,
  ResponseGetContactToChat,
  ResponseLinkContactToChat,
  ResponseUpdateContact,
  ResponseUpdateContacts,
} from "./types.ts";
import { RestClient } from "@core/rest-client.ts";
import { FilterLike } from "@helpers/filter.ts";
import { query } from "@helpers/query.ts";

export class ContactApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить список контактов в аккаунте. */
  getContacts(params?: {
    with?: With<["catalog_elements", "leads", "customers"]>;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: FilterLike<
      ["id", "name", "created_by", "updated_by", "responsible_user_id"],
      ["id", "name", "created_by", "updated_by", "responsible_user_id"],
      ["created_at", "updated_at", "closest_task_at"],
      number,
      never
    >;
    order?: Order<["updated_at", "id"]>;
  }): Promise<ResponseGetContacts> {
    return this.rest.get<ResponseGetContacts>({
      url: "/api/v4/contacts",
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретного контакта по ID. */
  getContactById(id: number, params?: {
    with?: With<["catalog_elements", "leads", "customers"]>;
  }): Promise<ResponseGetContactById> {
    return this.rest.get<ResponseGetContactById>({
      url: `/api/v4/contacts/${id}`,
      query: query(params),
    });
  }

  /** Метод позволяет добавлять контакты в аккаунт пакетно. */
  addContacts(contacts: RequestAddContact[]): Promise<ResponseAddContacts> {
    return this.rest.post<ResponseAddContacts>({
      url: "/api/v4/contacts",
      payload: contacts as JSONValue,
    });
  }

  /** Метод позволяет редактировать контакты пакетно. */
  updateContacts(contacts: RequestUpdateContact[]): Promise<ResponseUpdateContacts> {
    return this.rest.patch<ResponseUpdateContacts>({
      url: "/api/v4/contacts",
      payload: contacts as JSONValue,
    });
  }

  /** Метод позволяет редактировать данные конкретного контакта по ID. */
  updateContactById(id: number, contact: RequestUpdateContact): Promise<ResponseUpdateContact> {
    return this.rest.patch<ResponseUpdateContact>({
      url: `/api/v4/contacts/${id}`,
      payload: contact as JSONValue,
    });
  }

  /** Метод позволяет привязать чат к контакту. Чат может быть привязан только к 1 контакту, в тоже время контакт может быть привязан к нескольким чатам. */
  linkContactToChat(links: RequestLinkContactToChat[]): Promise<ResponseLinkContactToChat> {
    return this.rest.post<ResponseLinkContactToChat>({
      url: "/api/v4/contacts/chats",
      payload: links as JSONValue,
    });
  }

  /** Метод позволяет получить список чатов, которые относятся к контактам. Или список контактов к которым привязан чат. Если чат относится к неразобранному, метод вернет id контакта в этом неразобранном. */
  getContactToChat(params: {
    chat_id?: string[];
    contact_id?: number[];
  }): Promise<ResponseGetContactToChat> {
    return this.rest.get<ResponseGetContactToChat>({
      url: "/api/v4/contacts/chats",
      query: {
        chat_id: params.chat_id === undefined ? undefined : params.chat_id.join(","),
        contact_id: params.contact_id === undefined ? undefined : params.contact_id.join(","),
      },
    });
  }
}
