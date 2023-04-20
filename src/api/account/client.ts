import type { With } from "@typings/utility.ts";
import type { ResponseGetAccountInfo } from "./types.ts";
import { RestClient } from "@core/rest-client.ts";

export class AccountApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить необходимую информацию по аккаунту, например: ID, название, справочник типов задач, группы пользователей и другие параметры. */
  getAccount(params?: {
    with: With<[
      "amojo_id",
      "amojo_rights",
      "users_groups",
      "task_types",
      "version",
      "entity_names",
      "datetime_settings",
      "drive_url",
      "is_api_filter_enabled",
    ]>;
  }): Promise<ResponseGetAccountInfo> {
    return this.rest.get<ResponseGetAccountInfo>({
      url: "/api/v4/account",
      query: params?.with === undefined ? undefined : { with: params.with.join(",") },
    });
  }
}
