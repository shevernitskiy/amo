import type { Links, Page, RequestId } from "../../typings/utility.ts";
import type { Catalog, CatalogElement } from "../../typings/entities.ts";

export type ResponseGetCatalogs = Page & Links & {
  _embedded: {
    catalogs: ResponseGetCatalog[];
  };
};

export type ResponseGetCatalog = Links & Catalog;

export type RequestAddCatalog =
  & Partial<Pick<Catalog, "name" | "type" | "sort" | "can_add_elements" | "can_link_multiple">>
  & RequestId;

export type ResponseAddCatalogs = Links & {
  _embedded: {
    catalogs: (Links & Catalog & RequestId)[];
  };
};

export type RequestUpdateCatalog =
  & Partial<Pick<Catalog, "name" | "can_add_elements" | "can_link_multiple">>
  & RequestId;

export type ResponseUpdateCatalogs = Links & {
  _embedded: {
    catalogs: ResponseUpdateCatalog[];
  };
};

export type ResponseUpdateCatalog = Links & Catalog & RequestId;

export type ResponseGetCatalogElements = Page & Links & {
  _embedded: {
    elements: ResponseGetCatalogElement[];
  };
};

export type ResponseGetCatalogElement = Links & CatalogElement;

export type RequestAddCatalogElement = Partial<Pick<CatalogElement, "name" | "custom_fields_values">> & RequestId;

export type ResponseAddCatalogElements = Links & {
  _embedded: {
    elements: ResponseAddCatalogElement[];
  };
};

export type ResponseAddCatalogElement = ResponseGetCatalogElement;

export type RequestUpdateCatalogElement = RequestAddCatalogElement;

export type ResponseUpdateCatalogElements = ResponseAddCatalogElements;

export type ResponseUpdateCatalogElement = ResponseAddCatalogElement;
