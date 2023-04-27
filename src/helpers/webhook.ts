import type {
  Catalog,
  Company,
  Contact,
  Customer,
  Lead,
  Message,
  Note,
  Talk,
  Task,
  Unsorted,
} from "../typings/entities.ts";

const ENTITIES = [
  "leads",
  "contacts",
  "companies",
  "customers",
  "task",
  "catalogs",
  "talk",
  "unsorted",
  "message",
] as const;

const EVENTS = [
  "add",
  "update",
  "delete",
  "restore",
  "status",
  "responsible",
] as const; // and note

export type WebhookEventMap =
  & Extender<"leads", WebhookEvent, [Lead]>
  & Extender<"contacts", WebhookEvent, [Contact]>
  & Extender<"companies", WebhookEvent, [Company]>
  & Extender<"customers", WebhookEvent, [Customer]>
  & Extender<"task", WebhookEvent, [Task]>
  & Extender<"catalogs", WebhookEvent, [Catalog]>
  & Extender<"talk", WebhookEvent, [Talk]>
  & Extender<"unsorted", WebhookEvent, [Unsorted]>
  & Extender<"message", WebhookEvent, [Message]>
  & Extender<"note", WebhookEntity, [Note]>;

export type WebhookEntity = typeof ENTITIES[number];
export type WebhookEvent = typeof EVENTS[number];

export function isWebhookEntity(value: unknown): value is WebhookEntity {
  return typeof value === "string" && ENTITIES.includes(value as WebhookEntity);
}
export function isWebhookEvent(value: unknown): value is WebhookEvent {
  return typeof value === "string" && EVENTS.includes(value as WebhookEvent);
}

type Mixer<T extends string, V extends string> = `${T}:${V}`;
type Extender<T extends string, V extends string, E> = Record<`${T}:${V}`, E>;

export function parseIncomingWebhook(
  // deno-lint-ignore no-explicit-any
  value: any,
): [WebhookEntity, WebhookEvent | "note", unknown] {
  if (value.account !== undefined) delete value.account;
  const entity: string = Object.keys(value)[0];
  const event: string = Object.keys(value[entity])[0];
  const data = Object.values(value[entity][event])[0] ?? undefined;
  return [entity as WebhookEntity, event as WebhookEvent | "note", data];
}
