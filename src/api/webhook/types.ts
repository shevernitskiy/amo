import type { Webhook } from "@typings/entities.ts";
import type { Total } from "@typings/utility.ts";

export type ResponseGetWebhooks = Total & {
  _embedded: {
    webhooks: Webhook[];
  };
};

export type RequestAddWebhook = Pick<Webhook, "destination" | "settings" | "sort">;
export type ResponseAddWebhook = Webhook;
export type RequestDeleteWebhook = Pick<Webhook, "destination">;
