import type { DeepPartial, Links, PageCount, RequestId, Total } from "@typings/utility.ts";
import type { CustomFieldsValue, CustomFieldsValueGroup } from "@typings/entities.ts";

export type ReponseGetCustomFields = Total & PageCount & Links & {
  _embedded: {
    custom_fields: ReponseGetCustomFieldById[];
  };
};

export type ReponseGetCustomFieldById = Links & CustomFieldsValue;
export type RequestAddCustomField = DeepPartial<CustomFieldsValue>;
export type ReponseAddCustomFields = Total & {
  _embedded: {
    custom_fields: ReponseGetCustomFieldById[];
  };
};

export type RequestUpdateCustomField = RequestAddCustomField;
export type ResponseUpdateCustomFields = ReponseAddCustomFields;
export type RequestUpdateCustomFieldById = RequestAddCustomField;
export type ResponseUpdateCustomFieldById = ReponseGetCustomFieldById;
export type ReponseGetCustomFieldsGroups = Total & {
  _embedded: {
    custom_field_groups: ReponseGetCustomFieldsGroupById[];
  };
};

export type ReponseGetCustomFieldsGroupById = Links & CustomFieldsValueGroup;
export type RequestAddCustomFieldsGroup = Pick<CustomFieldsValueGroup, "name" | "sort"> & RequestId;
export type ReponseAddCustomFieldGroups = ReponseGetCustomFieldsGroups;
export type RequestUpdateCustomFieldsGroupById = Pick<CustomFieldsValueGroup, "name" | "sort"> & { fields: number[] };
export type ResponseUpdateCustomFieldsGroupById = Links & CustomFieldsValue & { fields: number[] };
