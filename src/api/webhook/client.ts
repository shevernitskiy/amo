import type { RequestAddWebhook, RequestDeleteWebhook, ResponseAddWebhook, ResponseGetWebhooks } from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

export class WebhookApi extends Endpoint {
  /** Метод позволяет получить список установленных вебхуков в аккаунте. */
  getWebhooks(params?: {
    filter?: FilterLike<["destination"], never, never, never, never>;
  }): Promise<ResponseGetWebhooks> {
    return this.rest.get<ResponseGetWebhooks>({
      url: "/api/v4/webhooks",
      query: query(params),
    });
  }

  /** Метод позволяет подписываться на события, информация о которым придет на указанный адрес. */
  addWebhook(webhook: RequestAddWebhook): Promise<ResponseAddWebhook> {
    return this.rest.post<ResponseAddWebhook>({
      url: "/api/v4/webhooks",
      payload: webhook,
    });
  }

  /** Метод позволяет отписать вебхук от получения любых событий. */
  deleteWebhook(webhook: RequestDeleteWebhook): Promise<void> {
    return this.rest.delete<void>({
      url: "/api/v4/webhooks",
      payload: webhook,
    });
  }
}
