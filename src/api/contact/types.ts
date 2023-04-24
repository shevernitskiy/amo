import { Contact } from "@typings/entities.ts";
import { Embedded, Links, Page, RequestId, Total } from "@typings/utility.ts";

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

export type RequestAddContact =
  & RequestId
  & Partial<
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
    }
  >;

export type ResponseAddContacts = Links & {
  _embedded: {
    contacts: (Links & RequestId & { id: number })[];
  };
};

export type RequestUpdateContact =
  & RequestId
  & Partial<
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

export type RequestLinkContactToChat = RequestId & {
  char_id: string;
  contact_id: number;
};

export type ResponseLinkContactToChat = Total & {
  _embedded: {
    chats: (RequestId & {
      chat_id: string;
      contact_id: number;
      id: number;
    })[];
  };
};

export type ResponseGetContactToChat = Total & {
  _embedded: {
    chats: {
      chat_id: string;
      contact_id: number;
      id: number;
    }[];
  };
};
