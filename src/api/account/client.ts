import type { With } from "../../typings/utility.ts";
import type { ResponseGetAccountInfo } from "./types.ts";
import { Endpoint } from "../../core/endpoint.ts";
import { query } from "../../helpers/query.ts";

export class AccountApi extends Endpoint {
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
      query: query(params),
    });
  }
}
