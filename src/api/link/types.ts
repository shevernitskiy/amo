import type { DeepPartial, Links, Total } from "@typings/utility.ts";
import type { EntityLink } from "@typings/entities.ts";

export type ReponseGetLinksByEntityType = ResponseAddLinksByEntityId;
export type ReponseGetLinksByEntityId = Total & Links & {
  _embedded: {
    links: Pick<EntityLink, "to_entity_id" | "to_entity_type" | "metadata">[];
  };
};

export type RequestAddLinkByEntityId = DeepPartial<Pick<EntityLink, "to_entity_id" | "to_entity_type" | "metadata">>;
export type ResponseAddLinksByEntityId = Total & Links & {
  _embedded: {
    links: EntityLink[];
  };
};

export type RequestDeleteLinkByEntityId = DeepPartial<Pick<EntityLink, "to_entity_id" | "to_entity_type" | "metadata">>;
export type RequestAddLinkByEntityType = DeepPartial<EntityLink>;
export type ResponseAddLinksByEntityType = ResponseAddLinksByEntityId;
export type RequestDeleteLinkByEntityType = DeepPartial<
  Pick<EntityLink, "entity_id" | "to_entity_id" | "to_entity_type" | "metadata">
>;
