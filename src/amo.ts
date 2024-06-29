import type { ChatOptions, Options } from "./typings/lib.ts";
import type { OAuth, OAuthCode, OAuthRefresh } from "./typings/auth.ts";
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
} from "./typings/entities.ts";
import { EventEmitter } from "./core/event-emitter.ts";
import { parseIncomingWebhook, type WebhookEventMap } from "./helpers/webhook.ts";
import { WebhookError } from "./errors/webhook.ts";
import { RestClient } from "./core/rest-client.ts";
import { LeadApi } from "./api/lead/client.ts";
import { ContactApi } from "./api/contact/client.ts";
import { AccountApi } from "./api/account/client.ts";
import { CompanyApi } from "./api/company/client.ts";
import { UnsortedApi } from "./api/unsorted/client.ts";
import { PipelineApi } from "./api/pipeline/client.ts";
import { CatalogApi } from "./api/catalog/client.ts";
import { ProductApi } from "./api/product/client.ts";
import { LinkApi } from "./api/link/client.ts";
import { TaskApi } from "./api/task/client.ts";
import { CustomFieldsApi } from "./api/custom-fields/client.ts";
import { TagApi } from "./api/tag/client.ts";
import { EventApi } from "./api/event/client.ts";
import { NoteApi } from "./api/note/client.ts";
import { CustomerApi } from "./api/customer/client.ts";
import { StatusApi } from "./api/status/client.ts";
import { SegmentApi } from "./api/segment/client.ts";
import { UserApi } from "./api/user/client.ts";
import { WebhookApi } from "./api/webhook/client.ts";
import { WidgetApi } from "./api/widget/client.ts";
import { CallApi } from "./api/call/client.ts";
import { TalkApi } from "./api/talk/client.ts";
import { SourceApi } from "./api/source/client.ts";
import { ShortLinkApi } from "./api/short-link/client.ts";
import { ChatTemplateApi } from "./api/chat-template/client.ts";
import { SalesBotApi } from "./api/salesbot/client.ts";
import { FileApi } from "./api/file/client.ts";
import { ChatApi } from "./api/chat/client.ts";
import { ChatsRestClient } from "./core/chats/chats-rest-client.ts";

export class Amo extends EventEmitter<WebhookEventMap> {
  private rest: RestClient;
  private chat_rest?: ChatsRestClient;

  /** Свойства акканта */
  readonly account: AccountApi;
  /** API сделок (получение, создание, редактирование) */
  readonly lead: LeadApi;
  /** API неразобранного (получение, создание, принятие, отклонение, привязка) */
  readonly unsorted: UnsortedApi;
  /** API воронок (получение, создание, изменение, удаление). API этапов воронок (получение, создание, изменение, удаление). */
  readonly pipeline: PipelineApi;
  /** API контактов (получение, создание, редактирование) */
  readonly contact: ContactApi;
  /** API компаний (получение, создание, редактирование) */
  readonly company: CompanyApi;
  /** API списков (получение, создание, редактирование). API элементов списков (получение, создание, редактирование). */
  readonly catalog: CatalogApi;
  /** API списков в контексте списка товаров */
  readonly product: ProductApi;
  /** API связей (получение, привязка, отвязка). Метод работает со связями контактов, компаний, сделок и покупателей. */
  readonly link: LinkApi;
  /** API задач (получение, создание, редактирование, выполнение) */
  readonly task: TaskApi;
  /** API полей (получение, создание, редактирование, удаление). API групп полей (получение, создание, редактирование, удаление). Доступные типы полей. */
  readonly custom_fields: CustomFieldsApi;
  /** API тегов (получение, создание). */
  readonly tag: TagApi;
  /** API событий (получение). */
  readonly event: EventApi;
  /** API примечаний (создание, редактирование) */
  readonly note: NoteApi;
  /** API покупателей (получение, создание, редактирование). API транзакций (получение, добавление, удаление). */
  readonly customer: CustomerApi;
  /** API статусов покупателей (получение, создание, редактирование, удаление). */
  readonly status: StatusApi;
  /** API сегментов покупателей (получение, создание, редактирование, удаление) */
  readonly segment: SegmentApi;
  /** API пользователей (получение, добавление в аккаунт). API ролей (получение, создание, редактирование, удаление). */
  readonly user: UserApi;
  /** API вебхуков (список, подпись, отписка) */
  readonly webhook: WebhookApi;
  /** API виджетов (список, установка, отключение) */
  readonly widget: WidgetApi;
  /** API добавления звонков */
  readonly call: CallApi;
  /** API бесед (получение, закрытие) */
  readonly talk: TalkApi;
  /** API источников (получение, создание, редактирование, удаление) */
  readonly source: SourceApi;
  /** API коротких ссылок (создание) */
  readonly short_link: ShortLinkApi;
  /** API шаблонов чатов (получение, создание, редактирование, удаление) */
  readonly chat_template: ChatTemplateApi;
  /** Salesbot Api */
  readonly salesbot: SalesBotApi;
  private _file?: FileApi;
  private _chat?: ChatApi;

  constructor(
    base_url: string,
    auth: OAuthCode | (OAuth & Pick<OAuthRefresh, "client_id" | "client_secret" | "redirect_uri">),
    options?: Options,
    private chat_options?: ChatOptions,
  ) {
    super();
    this.rest = new RestClient(base_url, auth, options);

    if(chat_options) {
      this.chat_rest = new ChatsRestClient(chat_options?.amojo_base_url, chat_options?.amojo_secret, options);
    }
  
    this.account = new AccountApi(this.rest);
    this.lead = new LeadApi(this.rest);
    this.unsorted = new UnsortedApi(this.rest);
    this.pipeline = new PipelineApi(this.rest);
    this.contact = new ContactApi(this.rest);
    this.company = new CompanyApi(this.rest);
    this.catalog = new CatalogApi(this.rest);
    this.product = new ProductApi(this.rest);
    this.link = new LinkApi(this.rest);
    this.task = new TaskApi(this.rest);
    this.custom_fields = new CustomFieldsApi(this.rest);
    this.tag = new TagApi(this.rest);
    this.event = new EventApi(this.rest);
    this.note = new NoteApi(this.rest);
    this.customer = new CustomerApi(this.rest);
    this.status = new StatusApi(this.rest);
    this.segment = new SegmentApi(this.rest);
    this.user = new UserApi(this.rest);
    this.webhook = new WebhookApi(this.rest);
    this.widget = new WidgetApi(this.rest);
    this.call = new CallApi(this.rest);
    this.talk = new TalkApi(this.rest);
    this.source = new SourceApi(this.rest);
    this.short_link = new ShortLinkApi(this.rest);
    this.chat_template = new ChatTemplateApi(this.rest);
    this.salesbot = new SalesBotApi(this.rest);
  }

  /** Текущий токен приложения */
  get token(): OAuth | undefined {
    return this.rest.token;
  }

  /** Кастомные запорсы к апи */
  get raw(): RestClient {
    return this.rest;
  }

  /** Через методы API файлов интеграция может загружать файлы, удалять их, создавать версии файлов, связывать файлы с сущностями. */
  file(drive_url: string): FileApi {
    if (this._file === undefined) {
      this._file = new FileApi(this.rest, drive_url);
    }
    return this._file;
  }

  chat(): ChatApi {
    if(this.chat_options === undefined || this.chat_rest === undefined) {
      throw new Error("API чатов не инициализировано используя chat_options");
    }

    if (this._chat === undefined) {
      this._chat = new ChatApi(this.chat_rest!, this.chat_options!.amojo_account_id, this.chat_options!.amojo_id, this.chat_options!.amojo_bot_id, this.chat_options!.amojo_channel_title);
    }
    return this._chat;
  }

  webhookHandler(): (request: Request) => Promise<Response> {
    return async (request: Request) => {
      try {
        const data = await request.json();
        const [entity, event, payload] = parseIncomingWebhook(data);

        if (event === "note") {
          this.emit(`${event}:${entity}`, payload as Note);
          return new Response("OK", { status: 200 });
        }

        switch (entity) {
          case "catalogs":
            this.emit(`${entity}:${event}`, payload as Catalog);
            break;
          case "contacts":
            this.emit(`${entity}:${event}`, payload as Contact);
            break;
          case "companies":
            this.emit(`${entity}:${event}`, payload as Company);
            break;
          case "customers":
            this.emit(`${entity}:${event}`, payload as Customer);
            break;
          case "leads":
            this.emit(`${entity}:${event}`, payload as Lead);
            break;
          case "message":
            this.emit(`${entity}:${event}`, payload as Message);
            break;
          case "talk":
            this.emit(`${entity}:${event}`, payload as Talk);
            break;
          case "task":
            this.emit(`${entity}:${event}`, payload as Task);
            break;
          // TODO: Unsorted has different type then Enity type itself
          case "unsorted":
            this.emit(`${entity}:${event}`, payload as Unsorted);
            break;
        }

        return new Response("OK", { status: 200 });
      } catch (err) {
        throw new WebhookError(err);
      }
    };
  }
}
