import type { DeepPartial, Links, PageCount, RequestId, Total } from "@typings/utility.ts";
import type { CustomFieldsValue, CustomFieldsValueGroup } from "@typings/entities.ts";

export type ResponseGetCustomFields = Total & PageCount & Links & {
  _embedded: {
    custom_fields: ResponseGetCustomFieldById[];
  };
};

export type ResponseGetCustomFieldById = Links & CustomFieldsValue;
export type RequestAddCustomField = DeepPartial<CustomFieldsValue>;
export type ResponseAddCustomFields = Total & {
  _embedded: {
    custom_fields: ResponseGetCustomFieldById[];
  };
};

export type RequestUpdateCustomField = RequestAddCustomField;
export type ResponseUpdateCustomFields = ResponseAddCustomFields;
export type RequestUpdateCustomFieldById = RequestAddCustomField;
export type ResponseUpdateCustomFieldById = ResponseGetCustomFieldById;
export type ResponseGetCustomFieldsGroups = Total & {
  _embedded: {
    custom_field_groups: ResponseGetCustomFieldsGroupById[];
  };
};

export type ResponseGetCustomFieldsGroupById = Links & CustomFieldsValueGroup;
export type RequestAddCustomFieldsGroup = Pick<CustomFieldsValueGroup, "name" | "sort"> & RequestId;
export type ResponseAddCustomFieldGroups = ResponseGetCustomFieldsGroups;
export type RequestUpdateCustomFieldsGroupById = Pick<CustomFieldsValueGroup, "name" | "sort"> & { fields: number[] };
export type ResponseUpdateCustomFieldsGroupById = Links & CustomFieldsValue & { fields: number[] };
