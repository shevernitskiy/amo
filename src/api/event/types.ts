import type { Links, Page, Total } from "@typings/utility.ts";
import type { Event, EventTypes } from "@typings/entities.ts";

export type ReponseGetEvents = Page & Links & {
  _embedded: {
    events: ReponseGetEventById[];
  };
};

export type ReponseGetEventById = Event & Links & {
  _embedded: {
    entity: Links & { id: number };
  };
};

export type ReponseGetEventsTypes = Total & Links & {
  _embedded: {
    events_types: {
      key: EventTypes;
      type: number;
      lang: string;
    }[];
  };
};
