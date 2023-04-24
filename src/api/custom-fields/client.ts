import type { JSONValue } from "@typings/utility.ts";
import type {
  RequestAddCustomField,
  RequestAddCustomFieldsGroup,
  RequestUpdateCustomField,
  RequestUpdateCustomFieldById,
  RequestUpdateCustomFieldsGroupById,
  ResponseAddCustomFieldGroups,
  ResponseAddCustomFields,
  ResponseGetCustomFieldById,
  ResponseGetCustomFields,
  ResponseGetCustomFieldsGroupById,
  ResponseGetCustomFieldsGroups,
  ResponseUpdateCustomFieldById,
  ResponseUpdateCustomFields,
  ResponseUpdateCustomFieldsGroupById,
} from "./types.ts";
import { RestClient } from "@core/rest-client.ts";

export class CustomFieldsApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить список полей сущности в аккаунте. */
  getCustomFields(entity_type: "catalogs", catalog_id: number): Promise<ResponseGetCustomFields>;
  getCustomFields(
    entity_type: "leads" | "contacts" | "companies" | "customers" | "customers/segments",
  ): Promise<ResponseGetCustomFields>;
  getCustomFields(
    entity_type: string,
    catalog_id?: number,
  ): Promise<ResponseGetCustomFields> {
    let url = `/api/v4/${entity_type}/custom_fields`;
    if (entity_type === "catalogs" && catalog_id !== undefined) {
      url = `/api/v4/${entity_type}/${catalog_id}/custom_fields`;
    }
    return this.rest.get<ResponseGetCustomFields>({ url: url });
  }

  /** Метод позволяет получить поля сущности в аккаунте по ID. */
  getCustomFieldById(id: number, entity_type: "catalogs", catalog_id: number): Promise<ResponseGetCustomFieldById>;
  getCustomFieldById(
    id: number,
    entity_type: "leads" | "contacts" | "companies" | "customers" | "customers/segments",
  ): Promise<ResponseGetCustomFieldById>;
  getCustomFieldById(
    id: number,
    entity_type: string,
    catalog_id?: number,
  ): Promise<ResponseGetCustomFieldById> {
    let url = `/api/v4/${entity_type}/custom_fields/${id}`;
    if (entity_type === "catalogs" && catalog_id !== undefined) {
      url = `/api/v4/${entity_type}/${catalog_id}/custom_fields/${id}`;
    }
    return this.rest.get<ResponseGetCustomFieldById>({ url: url });
  }

  /** Метод позволяет создавать поля сущности пакетно. */
  addCustomFields(
    entity_type: "catalogs",
    custom_fields: RequestAddCustomField[],
    catalog_id: number,
  ): Promise<ResponseAddCustomFields>;
  addCustomFields(
    entity_type: "leads" | "contacts" | "companies" | "customers" | "customers/segments",
    custom_fields: RequestAddCustomField[],
  ): Promise<ResponseAddCustomFields>;
  addCustomFields(
    entity_type: string,
    custom_fields: RequestAddCustomField[],
    catalog_id?: number,
  ): Promise<ResponseAddCustomFields> {
    let url = `/api/v4/${entity_type}/custom_fields`;
    if (entity_type === "catalogs" && catalog_id !== undefined) {
      url = `/api/v4/${entity_type}/${catalog_id}/custom_fields`;
    }
    return this.rest.post<ResponseAddCustomFields>({
      url: url,
      payload: custom_fields as JSONValue,
    });
  }

  /** Метод позволяет редактировать дополнительные поля сущности пакетно. */
  updateCustomFields(
    entity_type: "catalogs",
    custom_fields: RequestUpdateCustomField[],
    catalog_id: number,
  ): Promise<ResponseUpdateCustomFields>;
  updateCustomFields(
    entity_type: "leads" | "contacts" | "companies" | "customers" | "customers/segments",
    custom_fields: RequestUpdateCustomField[],
  ): Promise<ResponseUpdateCustomFields>;
  updateCustomFields(
    entity_type: string,
    custom_fields: RequestUpdateCustomField[],
    catalog_id?: number,
  ): Promise<ResponseUpdateCustomFields> {
    let url = `/api/v4/${entity_type}/custom_fields`;
    if (entity_type === "catalogs" && catalog_id !== undefined) {
      url = `/api/v4/${entity_type}/${catalog_id}/custom_fields`;
    }
    return this.rest.patch<ResponseUpdateCustomFields>({
      url: url,
      payload: custom_fields as JSONValue,
    });
  }

  /** Метод позволяет редактировать дополнительное поле сущности по ID. */
  updateCustomFieldById(
    id: number,
    entity_type: "catalogs",
    custom_field: RequestUpdateCustomFieldById,
    catalog_id: number,
  ): Promise<ResponseUpdateCustomFieldById>;
  updateCustomFieldById(
    id: number,
    entity_type: "leads" | "contacts" | "companies" | "customers" | "customers/segments",
    custom_field: RequestUpdateCustomFieldById,
  ): Promise<ResponseUpdateCustomFieldById>;
  updateCustomFieldById(
    id: number,
    entity_type: string,
    custom_field: RequestUpdateCustomFieldById,
    catalog_id?: number,
  ): Promise<ResponseUpdateCustomFieldById> {
    let url = `/api/v4/${entity_type}/custom_fields/${id}`;
    if (entity_type === "catalogs" && catalog_id !== undefined) {
      url = `/api/v4/${entity_type}/${catalog_id}/custom_fields/${id}`;
    }
    return this.rest.patch<ResponseUpdateCustomFieldById>({
      url: url,
      payload: custom_field as JSONValue,
    });
  }

  /** Метод позволяет удалить дополнительное поле у сущности в аккаунте по ID. */
  deleteCustomFieldById(id: number, entity_type: "catalogs", catalog_id: number): Promise<void>;
  deleteCustomFieldById(
    id: number,
    entity_type: "leads" | "contacts" | "companies" | "customers" | "customers/segments",
  ): Promise<void>;
  deleteCustomFieldById(id: number, entity_type: string, catalog_id?: number): Promise<void> {
    let url = `/api/v4/${entity_type}/custom_fields/${id}`;
    if (entity_type === "catalogs" && catalog_id !== undefined) {
      url = `/api/v4/${entity_type}/${catalog_id}/custom_fields/${id}`;
    }
    return this.rest.delete<void>({ url: url });
  }

  /** Метод позволяет получить список групп полей сущности в аккаунте. */
  getCustomFieldsGroups(entity_type: "catalogs", catalog_id: number): Promise<ResponseGetCustomFieldsGroups>;
  getCustomFieldsGroups(
    entity_type: "leads" | "contacts" | "companies" | "customers" | "customers/segments",
  ): Promise<ResponseGetCustomFieldsGroups>;
  getCustomFieldsGroups(entity_type: string, catalog_id?: number): Promise<ResponseGetCustomFieldsGroups> {
    let url = `/api/v4/${entity_type}/custom_fields/groups`;
    if (entity_type === "catalogs" && catalog_id !== undefined) {
      url = `/api/v4/${entity_type}/${catalog_id}/custom_fields/groups`;
    }
    return this.rest.get<ResponseGetCustomFieldsGroups>({ url: url });
  }

  /** Метод позволяет получить группу полей сущности в аккаунте по ID. */
  getCustomFieldsByGroupId(
    id: number,
    entity_type: "catalogs",
    catalog_id: number,
  ): Promise<ResponseGetCustomFieldsGroupById>;
  getCustomFieldsByGroupId(
    id: number,
    entity_type: "leads" | "contacts" | "companies" | "customers" | "customers/segments",
  ): Promise<ResponseGetCustomFieldsGroupById>;
  getCustomFieldsByGroupId(
    id: number,
    entity_type: string,
    catalog_id?: number,
  ): Promise<ResponseGetCustomFieldsGroupById> {
    let url = `/api/v4/${entity_type}/custom_fields/groups/${id}`;
    if (entity_type === "catalogs" && catalog_id !== undefined) {
      url = `/api/v4/${entity_type}/${catalog_id}/custom_fields/groups/${id}`;
    }
    return this.rest.get<ResponseGetCustomFieldsGroupById>({ url: url });
  }

  /** Метод позволяет добавлять группы полей сущности в аккаунт пакетно. */
  addCustomFieldsGroups(
    entity_type: "catalogs",
    custom_fields_groups: RequestAddCustomFieldsGroup[],
    catalog_id: number,
  ): Promise<ResponseAddCustomFieldGroups>;
  addCustomFieldsGroups(
    entity_type: "leads" | "contacts" | "companies" | "customers" | "customers/segments",
    custom_fields: RequestAddCustomFieldsGroup[],
  ): Promise<ResponseAddCustomFieldGroups>;
  addCustomFieldsGroups(
    entity_type: string,
    custom_fields_groups: RequestAddCustomFieldsGroup[],
    catalog_id?: number,
  ): Promise<ResponseAddCustomFieldGroups> {
    let url = `/api/v4/${entity_type}/custom_fields`;
    if (entity_type === "catalogs" && catalog_id !== undefined) {
      url = `/api/v4/${entity_type}/${catalog_id}/custom_fields`;
    }
    return this.rest.post<ResponseAddCustomFieldGroups>({
      url: url,
      payload: custom_fields_groups as JSONValue,
    });
  }

  /** Метод позволяет изменять группу полей в аккаунте по ID группы. */
  updateCustomFieldsGroupById(
    id: number,
    entity_type: "catalogs",
    custom_fields_group: RequestUpdateCustomFieldsGroupById,
    catalog_id: number,
  ): Promise<ResponseUpdateCustomFieldsGroupById>;
  updateCustomFieldsGroupById(
    id: number,
    entity_type: "leads" | "contacts" | "companies" | "customers" | "customers/segments",
    custom_fields_group: RequestUpdateCustomFieldsGroupById,
  ): Promise<ResponseUpdateCustomFieldsGroupById>;
  updateCustomFieldsGroupById(
    id: number,
    entity_type: string,
    custom_fields_group: RequestUpdateCustomFieldsGroupById,
    catalog_id?: number,
  ): Promise<ResponseUpdateCustomFieldsGroupById> {
    let url = `/api/v4/${entity_type}/custom_fields/groups/${id}`;
    if (entity_type === "catalogs" && catalog_id !== undefined) {
      url = `/api/v4/${entity_type}/${catalog_id}/custom_fields/groups/${id}`;
    }
    return this.rest.patch<ResponseUpdateCustomFieldsGroupById>({
      url: url,
      payload: custom_fields_group as JSONValue,
    });
  }

  /** Метод позволяет удалить группу полей у сущности в аккаунте. */
  deleteCustomFieldsGroupById(id: number, entity_type: "catalogs", catalog_id: number): Promise<void>;
  deleteCustomFieldsGroupById(
    id: number,
    entity_type: "leads" | "contacts" | "companies" | "customers" | "customers/segments",
  ): Promise<void>;
  deleteCustomFieldsGroupById(id: number, entity_type: string, catalog_id?: number): Promise<void> {
    let url = `/api/v4/${entity_type}/custom_fields/groups/${id}`;
    if (entity_type === "catalogs" && catalog_id !== undefined) {
      url = `/api/v4/${entity_type}/${catalog_id}/custom_fields/groups/${id}`;
    }
    return this.rest.delete<void>({ url: url });
  }
}
