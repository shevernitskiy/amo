import { Contact } from "@typings/entities.ts";
import { Embedded, Links, Page } from "@typings/utility.ts";

export type ResponseGetContacts = Page & Links & {
  _embedded: {
    contacts: (Contact & Links & {
      _embedded: Pick<Embedded, "tags" | "companies" | "customers" | "leads" | "catalog_elements">;
    })[];
  };
};

export type ResponseGetContactById = Contact & Links & {
  _embedded: Pick<Embedded, "tags" | "companies" | "customers" | "leads" | "catalog_elements">;
};

export type RequestAddContact = Partial<
  Pick<
    Contact,
    | "name"
    | "first_name"
    | "last_name"
    | "responsible_user_id"
    | "created_by"
    | "updated_by"
    | "created_at"
    | "updated_at"
    | "custom_fields_values"
  > & {
    _embedded?: {
      tags?: {
        id?: number;
        name?: string;
      }[];
    };
    request_id?: string;
  }
>;

export type ResponseAddContacts = Links & {
  _embedded: {
    contacts: (Links & {
      id: number;
      request_id: string;
    })[];
  };
};

export type RequestUpdateContact = Partial<
  Pick<
    Contact,
    | "id"
    | "name"
    | "first_name"
    | "last_name"
    | "responsible_user_id"
    | "created_by"
    | "updated_by"
    | "created_at"
    | "updated_at"
    | "custom_fields_values"
  > & {
    _embedded?: {
      tags?: {
        id?: number;
        name?: string;
      }[];
    };
    request_id?: string;
  }
>;

export type ResponseUpdateContact = Links & {
  id: number;
  name: string;
  updated_at: number;
};

export type ResponseUpdateContacts = Links & {
  _embedded: {
    contacts: ResponseUpdateContact[];
  };
};

export type RequestLinkContactToChat = {
  char_id: string;
  contact_id: number;
  request_id?: string;
};

export type ResponseLinkContactToChat = {
  _total_items: number;
  _embedded: {
    chats: {
      chat_id: string;
      contact_id: number;
      id: number;
      request_id: string;
    }[];
  };
};

export type ResponseGetContactToChat = {
  _total_items: number;
  _embedded: {
    chats: {
      chat_id: string;
      contact_id: number;
      id: number;
    }[];
  };
};
