import type { Company, Contact, Customer, Lead, Tag } from "@typings/entities.ts";

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
  }
  : T;

export type Links = {
  _links: {
    self: { href: string };
    next?: { href: string };
    prev?: { href: string };
  };
};

export type Total = {
  _total_items: number;
};

export type Page = {
  _page: number;
};

// export type GenericGet = {
//   with: string;
//   page: number;
//   limit: number;
//   query: string | number;
// filter: Filter[];
// order: Order<K>;
// };

// TODO: make filter builder
export type Filter = string;

export type Order<T extends string[]> = {
  param: T[keyof T];
  type: "asc" | "desc";
};

export type With<T extends string[]> = (T[keyof T])[];

export type Embedded = {
  tags?: Tag[];
  catalog_elements?: {
    id: number;
    metedata: {
      quantity: number;
      catalog_id: number;
      price_id: number;
    };
  }[];
  loss_reason: Links & {
    id: number;
    name: string;
    created_at: number;
    updated_at: number;
  }[];
  leads?: (Pick<Lead, "id"> & Links)[];
  customers?: (Pick<Customer, "id"> & Links)[];
  companies?: (Pick<Company, "id"> & Links)[];
  contacts?: (Pick<Contact, "id"> & { is_main?: boolean } & Links)[];
};
