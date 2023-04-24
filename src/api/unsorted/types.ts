import type { Embedded, Links, Page, RequestId, Total } from "@typings/utility.ts";
import type { Company, Contact, Lead, Unsorted, UnsrotedMetadataForm, UnsrotedMetadataSip } from "@typings/entities.ts";

export type ReponseGetUnsorted = Links & Page & {
  _embedded: {
    unsorted: (Unsorted & Links & {
      _embedded: Pick<Embedded, "contacts" | "companies" | "leads">;
    })[];
  };
};

export type ReponseGetUnsortedByUid = Links & Unsorted & {
  _embedded: Pick<Embedded, "contacts" | "companies" | "leads">;
};

export type RequestAddUnsorted<T> =
  & Partial<Pick<Unsorted, "source_uid" | "source_name" | "pipeline_id" | "created_at">>
  & RequestId
  & {
    metadata?: T;
    _embedded?: {
      contacts?: Partial<Contact>[];
      companies?: Partial<Company>[];
      leads?: Partial<Lead>[];
    };
  };

export type RequestAddUnsortedSip = RequestAddUnsorted<UnsrotedMetadataSip>;
export type RequestAddUnsortedForm = RequestAddUnsorted<UnsrotedMetadataForm>;

export type ResponseAddUnsorted = Total & {
  _embedded: {
    unsorted: (Links & RequestId & {
      uid: string;
      account_id: number;
      _embedded: Pick<Embedded, "leads" | "contacts" | "companies">;
    })[];
  };
};

export type ResponseAcceptUnsorted = Pick<Unsorted, "uid" | "pipeline_id" | "category" | "created_at"> & {
  _embedded: Pick<Embedded, "contacts" | "companies" | "leads">;
};

export type ResponseDeclineUnsorted = Pick<Unsorted, "uid" | "pipeline_id" | "category" | "created_at"> & {
  _embedded: Pick<Embedded, "contacts" | "leads">;
};

export type ResponseLinkUnsorted = Pick<Unsorted, "uid"> & {
  _embedded: Pick<Embedded, "contacts" | "leads" | "companies" | "customers">;
};

export type ReponseGetUnsortedSummary = {
  total: number;
  accepted: number;
  declined: number;
  average_sort_time: number;
  categories: {
    sip: { total: number };
    mail: { total: number };
    forms: { total: number };
    chats: { total: number };
  };
};
