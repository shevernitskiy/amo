import type { Company, Contact, Customer, Lead, Segment, Tag } from "./entities.ts";

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
  }
  : T;

export type Order<T extends string[]> = {
  param: T[keyof T];
  type: "asc" | "desc";
};

export type With<T extends string[]> = (T[keyof T])[];

export type Links = {
  _links: {
    self: { href: string };
    next?: { href: string };
    prev?: { href: string };
    last?: { href: string };
  };
};

export type Total = {
  _total_items: number;
};

export type Page = {
  _page: number;
};

export type PageCount = {
  _page_count: number;
};

export type Count = {
  _count: number;
};

export type RequestId = {
  request_id?: string;
};

export type Embedded = {
  tags?: Partial<Tag>[];
  catalog_elements?: {
    id: number;
    metedata: {
      quantity: number;
      catalog_id: number;
      price_id: number;
    };
  }[];
  loss_reason?: (Links & {
    id: number;
    name: string;
    created_at: number;
    updated_at: number;
  })[];
  leads?: (Pick<Lead, "id"> & Links & RequestId)[];
  customers?: (Pick<Customer, "id"> & Links & RequestId)[];
  companies?: (Pick<Company, "id"> & Links & RequestId)[];
  contacts?: (Pick<Contact, "id"> & { is_main?: boolean } & Links & RequestId)[];
  segments?: (Pick<Segment, "id"> & Links & RequestId)[];
};
