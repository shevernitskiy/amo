import type { Options } from "@typings/lib.ts";
import type { OAuth, OAuthCode, OAuthRefresh } from "@typings/auth.ts";
import { RestClient } from "@core/rest-client.ts";
import { LeadApi } from "@api/lead/client.ts";
import { ContactApi } from "@api/contact/client.ts";
import { AccountApi } from "@api/account/client.ts";
import { CompanyApi } from "@api/company/client.ts";
import { UnsortedApi } from "@api/unsorted/client.ts";
import { PipelineApi } from "@api/pipeline/client.ts";

export class Amo {
  private rest: RestClient;

  private _account: AccountApi;
  private _lead: LeadApi;
  private _unsorted: UnsortedApi;
  private _pipeline: PipelineApi;
  private _contact: ContactApi;
  private _company: CompanyApi;

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
}
