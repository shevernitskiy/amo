import type { Widget } from "../../typings/entities.ts";
import type { JSONValue, Links, Page } from "../../typings/utility.ts";

export type ResponseGetWidgets = Page & Links & {
  _embedded: {
    widgets: ResponseGetWidgetByCode[];
  };
};

export type ResponseGetWidgetByCode = Links & Widget;
export type RequestAddWidget = JSONValue;
export type ResponseAddWidget = Links & Widget & { settings: JSONValue };
