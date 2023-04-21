import type { JSONValue, Order } from "@typings/utility.ts";
import type {
  ReponseGetUnsorted,
  ReponseGetUnsortedByUid,
  ReponseGetUnsortedSummary,
  RequestAddUnsortedForm,
  RequestAddUnsortedSip,
  ResponseAcceptUnsorted,
  ResponseAddUnsorted,
  ResponseDeclineUnsorted,
  ResponseLinkUnsorted,
} from "./types.ts";
import { RestClient } from "@core/rest-client.ts";
import { order } from "@helpers/order.ts";

export class UnsortedApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить список неразобранного в аккаунте. */
  getUnsorted(params?: {
    page?: number;
    limit?: number;
    // filter?: Filter[];
    order?: Order<["created_at", "updated_at", "id"]>;
  }): Promise<ReponseGetUnsorted> {
    return this.rest.get<ReponseGetUnsorted>({
      url: "/api/v4/leads/unsorted",
      query: params === undefined ? undefined : {
        ...params,
        order: params.order === undefined ? undefined : order(params.order),
      },
    });
  }

  /** Метод позволяет получить данные конкретного неразобранного по UID. */
  getUnsortedByUid(uid: string): Promise<ReponseGetUnsortedByUid> {
    return this.rest.get<ReponseGetUnsortedByUid>({
      url: `/api/v4/leads/unsorted/${uid}`,
    });
  }

  /** Метод позволяет добавлять неразобранное в аккаунт пакетно. */
  addUnsortedSip(unsorted: RequestAddUnsortedSip[]): Promise<ResponseAddUnsorted> {
    return this.rest.post<ResponseAddUnsorted>({
      url: "/api/v4/unsorted/sip",
      payload: unsorted as JSONValue,
    });
  }

  /** Метод позволяет добавлять неразобранное в аккаунт пакетно. */
  addUnsortedForm(unsorted: RequestAddUnsortedForm[]): Promise<ResponseAddUnsorted> {
    return this.rest.post<ResponseAddUnsorted>({
      url: "/api/v4/unsorted/forms",
      payload: unsorted as JSONValue,
    });
  }

  /** Метод позволяет принимать неразобранное. */
  acceptUnsortedByUid(uid: string, params?: {
    user_id?: number;
    status_id?: number;
  }): Promise<ResponseAcceptUnsorted> {
    return this.rest.post<ResponseAcceptUnsorted>({
      url: `/api/v4/unsorted/${uid}/accept`,
      payload: params,
    });
  }

  /** Метод позволяет отклонить неразобранное. */
  declineUnsortedByUid(uid: string, params?: {
    user_id?: number;
  }): Promise<ResponseDeclineUnsorted> {
    return this.rest.delete<ResponseDeclineUnsorted>({
      url: `/api/v4/unsorted/${uid}/decline`,
      payload: params,
    });
  }

  /** Метод позволяет принимать неразобранное. */
  linkUnsortedByUid(uid: string, params?: {
    user_id?: number;
    link: {
      entity_id: number;
      entity_type: string;
      metadata?: {
        contact_id: number;
      };
    };
  }): Promise<ResponseLinkUnsorted> {
    return this.rest.post<ResponseLinkUnsorted>({
      url: `/api/v4/unsorted/${uid}/link`,
      payload: params,
    });
  }

  /** Метод позволяет получить сводную информацию о неразобранном в аккаунте. */
  getUnsortedSummary(params?: {
    // filter?: Filter[];
  }): Promise<ReponseGetUnsortedSummary> {
    return this.rest.get<ReponseGetUnsortedSummary>({
      url: "/api/v4/leads/unsorted/summary",
      query: params,
    });
  }
}
