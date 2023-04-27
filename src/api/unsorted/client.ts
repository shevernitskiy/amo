import type { JSONValue, Order } from "../../typings/utility.ts";
import type {
  RequestAddUnsortedForm,
  RequestAddUnsortedSip,
  ResponseAcceptUnsorted,
  ResponseAddUnsorted,
  ResponseDeclineUnsorted,
  ResponseGetUnsorted,
  ResponseGetUnsortedByUid,
  ResponseGetUnsortedSummary,
  ResponseLinkUnsorted,
} from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";

export class UnsortedApi extends Endpoint {
  /** Метод позволяет получить список неразобранного в аккаунте. */
  getUnsorted(params?: {
    page?: number;
    limit?: number;
    filter?: FilterLike<["uid", "pipeline_id"], ["uid", "category"], never, never, never>;
    order?: Order<["created_at", "updated_at", "id"]>;
  }): Promise<ResponseGetUnsorted> {
    return this.rest.get<ResponseGetUnsorted>({
      url: "/api/v4/leads/unsorted",
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретного неразобранного по UID. */
  getUnsortedByUid(uid: string): Promise<ResponseGetUnsortedByUid> {
    return this.rest.get<ResponseGetUnsortedByUid>({
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
    filter?: FilterLike<["uid", "pipeline_id, created_at"], ["uid"], ["created_at"], never, never>;
  }): Promise<ResponseGetUnsortedSummary> {
    return this.rest.get<ResponseGetUnsortedSummary>({
      url: "/api/v4/leads/unsorted/summary",
      query: query(params),
    });
  }
}
