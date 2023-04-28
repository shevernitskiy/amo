import type { Options } from "./typings/lib.ts";
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
import { parseIncomingWebhook, WebhookEventMap } from "./helpers/webhook.ts";
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

export class Amo extends EventEmitter<WebhookEventMap> {
  private rest: RestClient;

  private _account: AccountApi;
  private _lead: LeadApi;
  private _unsorted: UnsortedApi;
  private _pipeline: PipelineApi;
  private _contact: ContactApi;
  private _company: CompanyApi;
  private _catalog: CatalogApi;
  private _product: ProductApi;
  private _link: LinkApi;
  private _task: TaskApi;
  private _custom_fields: CustomFieldsApi;
  private _tag: TagApi;
  private _event: EventApi;
  private _note: NoteApi;
  private _customer: CustomerApi;
  private _status: StatusApi;
  private _segment: SegmentApi;
  private _user: UserApi;
  private _webhook: WebhookApi;
  private _widget: WidgetApi;
  private _call: CallApi;
  private _talk: TalkApi;
  private _source: SourceApi;
  private _short_link: ShortLinkApi;
  private _chat_template: ChatTemplateApi;
  private _salesbot: SalesBotApi;
  private _file?: FileApi;

  constructor(
    subdomain: string,
    auth: OAuthCode | OAuth & Pick<OAuthRefresh, "client_id" | "client_secret" | "redirect_uri">,
    options?: Options,
  ) {
    super();
    this.rest = new RestClient(subdomain, auth, options);

    this._account = new AccountApi(this.rest);
    this._lead = new LeadApi(this.rest);
    this._unsorted = new UnsortedApi(this.rest);
    this._pipeline = new PipelineApi(this.rest);
    this._contact = new ContactApi(this.rest);
    this._company = new CompanyApi(this.rest);
    this._catalog = new CatalogApi(this.rest);
    this._product = new ProductApi(this.rest);
    this._link = new LinkApi(this.rest);
    this._task = new TaskApi(this.rest);
    this._custom_fields = new CustomFieldsApi(this.rest);
    this._tag = new TagApi(this.rest);
    this._event = new EventApi(this.rest);
    this._note = new NoteApi(this.rest);
    this._customer = new CustomerApi(this.rest);
    this._status = new StatusApi(this.rest);
    this._segment = new SegmentApi(this.rest);
    this._user = new UserApi(this.rest);
    this._webhook = new WebhookApi(this.rest);
    this._widget = new WidgetApi(this.rest);
    this._call = new CallApi(this.rest);
    this._talk = new TalkApi(this.rest);
    this._source = new SourceApi(this.rest);
    this._short_link = new ShortLinkApi(this.rest);
    this._chat_template = new ChatTemplateApi(this.rest);
    this._salesbot = new SalesBotApi(this.rest);
  }

  /** Token struct */
  get token(): OAuth | undefined {
    return this.rest.token;
  }

  /** Account Api */
  get account(): AccountApi {
    return this._account;
  }
  /** Lead Api */
  get lead(): LeadApi {
    return this._lead;
  }
  /** Unsorted Api */
  get unsorted(): UnsortedApi {
    return this._unsorted;
  }
  /** Pipelin Api */
  get pipeline(): PipelineApi {
    return this._pipeline;
  }
  /** Contact Api */
  get contact(): ContactApi {
    return this._contact;
  }
  /** Comapny Api */
  get company(): CompanyApi {
    return this._company;
  }
  /** Catalog Api */
  get catalog(): CatalogApi {
    return this._catalog;
  }
  /** Product Api */
  get product(): ProductApi {
    return this._product;
  }
  /** Link Api */
  get link(): LinkApi {
    return this._link;
  }
  /** Task Api */
  get task(): TaskApi {
    return this._task;
  }
  /** Custom Fields Api */
  get custom_fields(): CustomFieldsApi {
    return this._custom_fields;
  }
  /** Tag Api */
  get tag(): TagApi {
    return this._tag;
  }
  /** Event Api */
  get event(): EventApi {
    return this._event;
  }
  /** Note Api */
  get note(): NoteApi {
    return this._note;
  }
  /** Customer Api */
  get customer(): CustomerApi {
    return this._customer;
  }
  /** Status Api */
  get status(): StatusApi {
    return this._status;
  }
  /** Segment Api */
  get segment(): SegmentApi {
    return this._segment;
  }
  /** User Api */
  get user(): UserApi {
    return this._user;
  }
  /** Webhook Api */
  get webhook(): WebhookApi {
    return this._webhook;
  }
  /** Widget Api */
  get widget(): WidgetApi {
    return this._widget;
  }
  /** Call Api */
  get call(): CallApi {
    return this._call;
  }
  /** Talk Api */
  get talk(): TalkApi {
    return this._talk;
  }
  /** Source Api */
  get source(): SourceApi {
    return this._source;
  }
  /** Short links Api */
  get short_link(): ShortLinkApi {
    return this._short_link;
  }
  /** Chat template Api */
  get chat_template(): ChatTemplateApi {
    return this._chat_template;
  }
  /** Salesbot Api */
  get salesbot(): SalesBotApi {
    return this._salesbot;
  }
  /** File Api */
  file(drive_url: string): FileApi {
    if (this._file === undefined) {
      this._file = new FileApi(this.rest, drive_url);
    }
    return this._file;
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
