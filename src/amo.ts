import type { Options } from "@typings/lib.ts";
import type { OAuth, OAuthCode, OAuthRefresh } from "@typings/auth.ts";
import { RestClient } from "@core/rest-client.ts";
import { LeadApi } from "@api/lead/client.ts";
import { ContactApi } from "@api/contact/client.ts";
import { AccountApi } from "@api/account/client.ts";
import { CompanyApi } from "@api/company/client.ts";
import { UnsortedApi } from "@api/unsorted/client.ts";
import { PipelineApi } from "@api/pipeline/client.ts";
import { CatalogApi } from "@api/catalog/client.ts";
import { LinkApi } from "@api/link/client.ts";
import { TaskApi } from "@api/task/client.ts";
import { CustomFieldsApi } from "@api/custom-fields/client.ts";
import { TagApi } from "@api/tag/client.ts";
import { EventApi } from "@api/event/client.ts";
import { NoteApi } from "@api/note/client.ts";

export class Amo {
  private rest: RestClient;

  private _account: AccountApi;
  private _lead: LeadApi;
  private _unsorted: UnsortedApi;
  private _pipeline: PipelineApi;
  private _contact: ContactApi;
  private _company: CompanyApi;
  private _catalog: CatalogApi;
  private _link: LinkApi;
  private _task: TaskApi;
  private _custom_fields: CustomFieldsApi;
  private _tag: TagApi;
  private _event: EventApi;
  private _note: NoteApi;

  constructor(
    subdomain: string,
    auth: OAuthCode | OAuth & Pick<OAuthRefresh, "client_id" | "client_secret" | "redirect_uri">,
    options?: Options,
  ) {
    this.rest = new RestClient(subdomain, auth, options);

    this._account = new AccountApi(this.rest);
    this._lead = new LeadApi(this.rest);
    this._unsorted = new UnsortedApi(this.rest);
    this._pipeline = new PipelineApi(this.rest);
    this._contact = new ContactApi(this.rest);
    this._company = new CompanyApi(this.rest);
    this._catalog = new CatalogApi(this.rest);
    this._link = new LinkApi(this.rest);
    this._task = new TaskApi(this.rest);
    this._custom_fields = new CustomFieldsApi(this.rest);
    this._tag = new TagApi(this.rest);
    this._event = new EventApi(this.rest);
    this._note = new NoteApi(this.rest);
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
}
