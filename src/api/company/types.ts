import type { Company } from "@typings/entities.ts";
import type { Embedded, Links, Page } from "@typings/utility.ts";

export type ReponseGetCompanies = Links & Page & {
  _embedded: {
    companies: (Company & Links & {
      _embedded: Pick<Embedded, "tags" | "contacts" | "customers" | "leads" | "catalog_elements">;
    })[];
  };
};

export type ReponseGetCompanyById = Links & Company & {
  _embedded: Pick<Embedded, "tags" | "contacts" | "customers" | "leads" | "catalog_elements">;
};

export type RequestAddCompany = Partial<
  Omit<Company, "id" | "group_id" | "closest_task_at" | "is_deleted" | "account_id"> & {
    _embedded?: {
      tags?: {
        id?: number;
        name?: string;
      }[];
    };
    request_id?: string;
  }
>;

export type ResponseAddCompanies = Links & {
  _embedded: {
    companies: (Links & {
      id: number;
      request_id: string;
    })[];
  };
};

export type RequestUpdateCompany = Partial<
  Omit<Company, "group_id" | "closest_task_at" | "is_deleted" | "account_id"> & {
    _embedded?: {
      tags?: {
        id?: number;
        name?: string;
      }[];
    };
    request_id?: string;
  }
>;

export type ResponseUpdateCompany = Links & {
  id: number;
  name: string;
  updated_at: number;
};

export type ResponseUpdateCompanies = Links & {
  _embedded: {
    companies: ResponseUpdateCompany[];
  };
};
