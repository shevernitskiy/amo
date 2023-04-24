import type { Company } from "@typings/entities.ts";
import type { Embedded, Links, Page, RequestId } from "@typings/utility.ts";

export type ResponseGetCompanies = Links & Page & {
  _embedded: {
    companies: (Company & Links & {
      _embedded: Pick<Embedded, "tags" | "contacts" | "customers" | "leads" | "catalog_elements">;
    })[];
  };
};

export type ResponseGetCompanyById = Links & Company & {
  _embedded: Pick<Embedded, "tags" | "contacts" | "customers" | "leads" | "catalog_elements">;
};

export type RequestAddCompany =
  & RequestId
  & Partial<
    Pick<Company, "name" | "responsible_user_id" | "created_by" | "updated_by" | "custom_fields_values"> & {
      _embedded?: {
        tags?: {
          id?: number;
          name?: string;
        }[];
      };
    }
  >;

export type ResponseAddCompanies = Links & {
  _embedded: {
    companies: (Links & RequestId & { id: number })[];
  };
};

export type RequestUpdateCompany = Partial<
  Pick<Company, "id" | "name" | "responsible_user_id" | "created_by" | "updated_by" | "custom_fields_values"> & {
    _embedded?: {
      tags?: {
        id?: number;
        name?: string;
      }[];
    };
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
