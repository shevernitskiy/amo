import type { Company, Contact, Lead, UnsrotedMetadataForm, UnsrotedMetadataSip } from "@typings/entities.ts";
import type { Embedded, Links, Page } from "@typings/utility.ts";

export type ReponseGetLeads = Links & Page & {
  _embedded: {
    leads: (Lead & Links & {
      _embedded: Pick<Embedded, "loss_reason" | "tags" | "contacts" | "companies" | "catalog_elements">;
    })[];
  };
};

export type ReponseGetLeadById = Links & Lead & {
  _embedded: Pick<Embedded, "loss_reason" | "tags" | "contacts" | "companies" | "catalog_elements">;
};

export type RequestAddLead =
  & Partial<
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
    >
  >
  & {
    _embedded?: {
      tags?: {
        id: number;
      }[];
    };
  };

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

export type RequestAddComplex =
  & Partial<
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
    >
  >
  & {
    _embedded?: {
      tags?: {
        id: number;
      }[];
      contacts?: Partial<Contact>[];
      companies?: Partial<Company>[];
      metadata?: Partial<UnsrotedMetadataForm> | Partial<UnsrotedMetadataSip>;
      source?: {
        external_id?: number;
        type?: string;
      };
    };
  };

export type ResponseAddComplex = {
  id: number;
  contact_id: number | null;
  company_id: number | null;
  request_id: string[];
  merged: boolean;
};
