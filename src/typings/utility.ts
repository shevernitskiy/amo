export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export type Links = {
  _links: {
    self: { href: string };
    next?: { href: string };
    prev?: { href: string };
  };
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
