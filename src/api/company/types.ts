import type { Company, Tag } from "@typings/entities.ts";
import type { Links, Page } from "@typings/utility.ts";

export type ReponseGetCompanies = Links & Page & {
  _embedded: {
    companies: (Company & Links & {
      _embedded: {
        tags: Tag[];
        contacts: (Links & { id: number })[];
        customers: (Links & { id: number })[];
        leads: (Links & { id: number })[];
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

export type ReponseGetCompanyById = Links & Company & {
  _embedded: {
    tags: Tag[];
    contacts: (Links & { id: number })[];
    customers: (Links & { id: number })[];
    leads: (Links & { id: number })[];
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
