import type { ChatsRestClient } from "./chats-rest-client.ts";

export class ChatsEndpoint {
  constructor(protected rest: ChatsRestClient) {}
}
