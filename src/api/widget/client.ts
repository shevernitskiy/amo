import type { RequestAddWidget, ResponseAddWidget, ResponseGetWidgetByCode, ResponseGetWidgets } from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import { query } from "../../helpers/query.ts";

export class WidgetApi extends Endpoint {
  /** Метод возвращает агрегированный список публичных виджетов, виджетов установленных в аккаунте, а также загруженным текущим пользователем. */
  getWidgets(params?: {
    page?: number;
    limit?: number;
  }): Promise<ResponseGetWidgets> {
    return this.rest.get<ResponseGetWidgets>({
      url: "/api/v4/widgets",
      query: query(params),
    });
  }

  /** Метод позволяет получить информацию о публичном или загруженном текущим пользователем виджете. */
  getWidgetByCode(code: string): Promise<ResponseGetWidgetByCode> {
    return this.rest.get<ResponseGetWidgetByCode>({
      url: `/api/v4/widgets/${code}`,
    });
  }

  /** Метод позволяет устанавливать виджет в аккаунт. */
  addWidgetByCode(code: string, widget: RequestAddWidget): Promise<ResponseAddWidget> {
    return this.rest.post<ResponseAddWidget>({
      url: `/api/v4/widgets/${code}`,
      payload: widget,
    });
  }

  /** Метод позволяет устанавливать виджет в аккаунт. */
  deleteWidgetByCode(code: string): Promise<void> {
    return this.rest.delete<void>({
      url: `/api/v4/widgets/${code}`,
    });
  }

  // TODO: SalesBot check method
}
