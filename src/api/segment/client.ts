import type {
  RequestAddSegment,
  RequestUpdateSegment,
  ResponseAddSegment,
  ResponseGetSegmentById,
  ResponseGetSegments,
  ResponseUpdateSegment,
} from "./types.ts";
import { RestClient } from "@core/rest-client.ts";

export class SegmentApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить список сегментов покупателей в аккаунте. */
  getSegments(): Promise<ResponseGetSegments> {
    return this.rest.get<ResponseGetSegments>({
      url: "/api/v4/customers/segments",
    });
  }

  /** Метод позволяет получить модель сегмента покупателя в аккаунте по ID. */
  getSegmenteById(id: number): Promise<ResponseGetSegmentById> {
    return this.rest.get<ResponseGetSegmentById>({
      url: `/api/v4/customers/segments/${id}`,
    });
  }

  /** Метод позволяет добавлять сегмент покупателей в аккаунте. */
  addSegment(segment: RequestAddSegment): Promise<ResponseAddSegment> {
    return this.rest.post<ResponseAddSegment>({
      url: "/api/v4/customers/segments",
      payload: segment,
    });
  }

  /** Метод позволяет редактировать сегмент покупателей в аккаунте. */
  updateSegmentById(id: number, segment: RequestUpdateSegment): Promise<ResponseUpdateSegment> {
    return this.rest.patch<ResponseUpdateSegment>({
      url: `/api/v4/customers/segments/${id}`,
      payload: segment,
    });
  }

  /** Метод позволяет удалить сегмент покупателей в аккаунте. */
  deleteSegmentById(id: number): Promise<void> {
    return this.rest.delete<void>({
      url: `/api/v4/customers/segments/${id}`,
    });
  }
}
