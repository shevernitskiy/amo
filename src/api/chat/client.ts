import type { ChatsRestClient } from "../../core/chats/chats-rest-client.ts";
import { ChatsEndpoint } from "../../core/chats/chats-endpoint.ts";
import type { JSONValue } from "../../typings/utility.ts";

export class ChatApi extends ChatsEndpoint {
  private scope_id: string;

  constructor(
    rest: ChatsRestClient,
    private amojo_account_id: string,
    private amojo_id: string,
    private amojo_bot_id: string,
    private amojo_channel_title: string,
  ) {
    super(rest);
    this.scope_id = `${amojo_id}_${amojo_account_id}`;
  }

  connectChannel() {
    return this.rest.post({
      url: `/v2/origin/custom/${this.amojo_id}/connect`,
      payload: {
        account_id: this.amojo_account_id,
        title: this.amojo_channel_title,
        hook_api_version: "v2",
      },
    });
  }

  createChat(body: JSONValue) {
    return this.rest.post({
      url: `/v2/origin/custom/${this.scope_id}/chats`,
      payload: body,
    });
  }
}
