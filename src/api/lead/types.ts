import type {
  Company,
  Contact,
  Lead,
  Tag,
  UnsrotedMetadataChat,
  UnsrotedMetadataMail,
  UnsrotedMetadataSip,
} from "@typings/entities.ts";
import type { Links, Page } from "@typings/utility.ts";

export type ReponseGetLeads = Links & Page & {
  _embedded: {
    leads: (Lead & Links & {
      _embedded: {
        loss_reason: Links & {
          id: number;
          name: string;
          created_at: number;
          updated_at: number;
        }[];
        tags: Tag[];
        contacts: Links & {
          id: number;
          is_main: boolean;
        }[];
        companies: Links & {
          id: number;
        }[];
        catalog_elements: {
          id: number;
          metedata: {
            quantity: number;
            catalog_id: number;
          };
          price_id: number;
        }[];
      };
    })[];
  };
};

export type ReponseGetLeadById = Links & Lead & {
  _embedded: {
    loss_reason: Links & {
      id: number;
      name: string;
      created_at: number;
      updated_at: number;
    }[];
    tags: Tag[];
    contacts: Links & {
      id: number;
      is_main: boolean;
    }[];
    companies: Links & {
      id: number;
    }[];
    catalog_elements: {
      id: number;
      metedata: {
        quantity: number;
        catalog_id: number;
      };
      price_id: number;
    }[];
  };
};

export type RequestAddLead = Partial<
  Omit<
    Lead,
    | "id"
    | "group_id"
    | "source_id"
    | "is_deleted"
    | "score"
    | "account_id"
    | "labor_cost"
    | "is_price_modified_by_robot"
  > & {
    _embedded?: {
      tags?: {
        id: number;
      }[];
    };
  }
>;

export type ResponseAddLeads = Links & {
  _embedded: {
    leads: (Links & {
      id: number;
      request_id: string;
    })[];
  };
};

export type RequestUpdateLead =
  & Partial<
    Omit<
      Lead,
      | "group_id"
      | "source_id"
      | "is_deleted"
      | "score"
      | "account_id"
      | "labor_cost"
      | "is_price_modified_by_robot"
    >
  >
  & {
    _embedded?: {
      tags?: {
        id: number;
      }[];
    };
  };

export type ResponseUpdateLead = Links & {
  id: number;
  updated_at: number;
};

export type ResponseUpdateLeads = Links & {
  _embedded: {
    leads: ResponseUpdateLead[];
  };
};

export type RequestAddComplex = Partial<
  Omit<
    Lead,
    | "id"
    | "group_id"
    | "source_id"
    | "is_deleted"
    | "score"
    | "account_id"
    | "labor_cost"
    | "is_price_modified_by_robot"
  > & {
    _embedded?: {
      tags?: {
        id: number;
      }[];
      contacts?: Partial<Contact>[];
      companies?: Partial<Company>[];
      metadata?: Partial<UnsrotedMetadataChat> | Partial<UnsrotedMetadataSip> | Partial<UnsrotedMetadataMail>;
      source?: {
        external_id?: number;
        type: string;
      };
    };
  }
>;

export type ResponseAddComplex = {
  id: number;
  contact_id: number | null;
  company_id: number | null;
  request_id: string[];
  merged: boolean;
};
