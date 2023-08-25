import { Endpoint } from "../../core/endpoint.ts";
import type { HttpMethod, RequestInit } from "../../typings/lib.ts";

export class CustomRequestApi extends Endpoint {
  /** Кастомный Request */
  req<T>(method: HttpMethod, init: RequestInit): Promise<T> {
    return this.rest.request(method, init);
  }
  /** Метод позволяет сделать кастомный GET запрос*/
  get<T>(init: RequestInit): Promise<T> {
    return this.rest.get(init);
  }

  /** Метод позволяет сделать кастомный POST запрос*/
  post<T>(init: RequestInit): Promise<T> {
    return this.rest.post(init);
  }

  /** Метод позволяет сделать кастомный PATCH запрос*/
  patch<T>(init: RequestInit): Promise<T> {
    return this.rest.patch(init);
  }

  /** Метод позволяет сделать кастомный PUT запрос*/
  put<T>(init: RequestInit): Promise<T> {
    return this.rest.put(init);
  }

  /** Метод позволяет сделать кастомный DELETE запрос*/
  delete<T>(init: RequestInit): Promise<T> {
    return this.rest.delete(init);
  }
}
