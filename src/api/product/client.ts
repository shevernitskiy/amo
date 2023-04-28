import type { ResponseEnableProducts, ResponseGetStatusProducts } from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";

export class ProductApi extends Endpoint {
  enableProducts(enable: boolean): Promise<ResponseEnableProducts> {
    return this.rest.post<ResponseEnableProducts>({
      url: "/api/v2/products_settings",
      payload: { enable: enable },
    });
  }

  getStatusProducts(): Promise<ResponseGetStatusProducts> {
    return this.rest.get<ResponseGetStatusProducts>({
      url: "/api/v2/products_settings",
    });
  }
}
