import type { Links, Page, Total } from "../../typings/utility.ts";
import type { Event, EventTypes } from "../../typings/entities.ts";

export type ResponseGetEvents = Page & Links & {
  _embedded: {
    events: ResponseGetEventById[];
  };
};

export type ResponseGetEventById = Event & Links & {
  _embedded: {
    entity: Links & { id: number };
  };
};

export type ResponseGetEventsTypes = Total & Links & {
  _embedded: {
    events_types: {
      key: EventTypes;
      type: number;
      lang: string;
    }[];
  };
};
