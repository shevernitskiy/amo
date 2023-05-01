import type { Company, Contact, Lead, UnsrotedMetadataForm, UnsrotedMetadataSip } from "../../typings/entities.ts";
import type { Embedded, Links, Page, PageCount, Total } from "../../typings/utility.ts";

export type ResponseGetLeads = Links & Page & {
  _embedded: {
    leads: (Lead & Links & {
      _embedded: Pick<Embedded, "loss_reason" | "tags" | "contacts" | "companies" | "catalog_elements">;
    })[];
  };
};

export type ResponseGetLeadById = Links & Lead & {
  _embedded: Pick<Embedded, "loss_reason" | "tags" | "contacts" | "companies" | "catalog_elements">;
};

export type RequestAddLead =
  & Partial<
    Pick<
      Lead,
      | "name"
      | "price"
      | "status_id"
      | "pipeline_id"
      | "created_by"
      | "updated_by"
      | "closed_at"
      | "created_at"
      | "updated_at"
      | "loss_reason_id"
      | "responsible_user_id"
      | "custom_fields_values"
    >
  >
  & {
    _embedded?: {
      tags?: {
        id?: number;
        name?: string;
      }[];
    };
  };

export type ResponseAddLeads = Links & {
  _embedded: Pick<Embedded, "leads">;
};

export type RequestUpdateLead =
  & Partial<
    Pick<
      Lead,
      | "id"
      | "name"
      | "price"
      | "status_id"
      | "pipeline_id"
      | "created_by"
      | "updated_by"
      | "closed_at"
      | "created_at"
      | "updated_at"
      | "loss_reason_id"
      | "responsible_user_id"
      | "custom_fields_values"
    >
  >
  & {
    _embedded?: {
      tags?: {
        id?: number;
        name?: string;
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
    Pick<
      Lead,
      | "name"
      | "price"
      | "status_id"
      | "pipeline_id"
      | "created_by"
      | "updated_by"
      | "closed_at"
      | "created_at"
      | "updated_at"
      | "loss_reason_id"
      | "responsible_user_id"
      | "custom_fields_values"
    >
  >
  & {
    _embedded?: {
      tags?: {
        id?: number;
        name?: string;
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

export type ResponseLeadSubscriptionById = Total & Page & PageCount & Links & {
  _embedded: {
    subscriptions: {
      subscriber_id: number;
      type: "user" | "group";
    }[];
  };
};
