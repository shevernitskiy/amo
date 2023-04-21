import type { Links, Page } from "@typings/utility.ts";
import type { Catalog, CatalogElement } from "@typings/entities.ts";

export type ReponseGetCatalogs = Page & Links & {
  _embedded: {
    catalogs: ReponseGetCatalog[];
  };
};

export type ReponseGetCatalog = Links & Catalog;

export type RequestAddCatalog =
  & Partial<Pick<Catalog, "name" | "type" | "sort" | "can_add_elements" | "can_link_multiple">>
  & { request_id: string };

export type ResponseAddCatalogs = Links & {
  _embedded: {
    catalogs: (Links & Catalog & {
      request_id: string;
    })[];
  };
};

export type RequestUpdateCatalog =
  & Partial<Pick<Catalog, "name" | "can_add_elements" | "can_link_multiple">>
  & { request_id: string };

export type ResponseUpdateCatalogs = Links & {
  _embedded: {
    catalogs: ResponseUpdateCatalog[];
  };
};

export type ResponseUpdateCatalog = Links & Catalog & { request_id: string };

export type ReponseGetCatalogElements = Page & Links & {
  _embedded: {
    elements: ReponseGetCatalogElement[];
  };
};

export type ReponseGetCatalogElement = Links & CatalogElement;

export type RequestAddCatalogElement = Partial<Pick<CatalogElement, "name" | "custom_fields_values">> & {
  request_id: string;
};

export type ResponseAddCatalogElements = Links & {
  _embedded: {
    elements: ResponseAddCatalogElement[];
  };
};

export type ResponseAddCatalogElement = ReponseGetCatalogElement;

export type RequestUpdateCatalogElement = RequestAddCatalogElement;

export type ResponseUpdateCatalogElements = ResponseAddCatalogElements;

export type ResponseUpdateCatalogElement = ResponseAddCatalogElement;
