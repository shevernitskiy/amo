import type { Catalog, Company, Contact, Customer, Lead, Talk, Task, Unsorted } from "@typings/entities.ts";

const ENTITIES = [
  "leads",
  "contacts",
  "companies",
  "customer",
  "task",
  "catalog",
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
  "note",
] as const;

type Message = string; // remove

export type WebhookEventMap =
  & Extender<"leads", WebhookEvent, Lead>
  & Extender<"contacts", WebhookEvent, Contact>
  & Extender<"companies", WebhookEvent, Company>
  & Extender<"customer", WebhookEvent, Customer>
  & Extender<"task", WebhookEvent, Task>
  & Extender<"catalog", WebhookEvent, Catalog>
  & Extender<"talk", WebhookEvent, Talk>
  & Extender<"unsorted", WebhookEvent, Unsorted>
  & Extender<"message", WebhookEvent, Message>;

export type WebhookEntity = typeof ENTITIES[number];
export type WebhookEvent = typeof EVENTS[number];

export function isWebhookEntity(value: unknown): value is WebhookEntity {
  return typeof value === "string" && ENTITIES.includes(value as WebhookEntity);
}
export function isWebhookEvent(value: unknown): value is WebhookEvent {
  return typeof value === "string" && EVENTS.includes(value as WebhookEvent);
}

type Mixer<T extends string, V extends string> = `${T}:${V}`;
type Extender<T extends string, V extends string, E> = Record<T, E> & Record<`${T}:${V}`, E>;
