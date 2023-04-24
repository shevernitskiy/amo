import type { JSONValue, With } from "@typings/utility.ts";
import type {
  RequestAddRole,
  RequestAddUser,
  RequestUpdateRole,
  ResponseAddRoles,
  ResponseAddUsers,
  ResponseGetRoleById,
  ResponseGetRoles,
  ResponseGetUserById,
  ResponseGetUsers,
  ResponseUpdateRole,
} from "./types.ts";
import { RestClient } from "@core/rest-client.ts";
import { query } from "@helpers/query.ts";

export class UserApi {
  constructor(private rest: RestClient) {}

  /** Метод позволяет получить список состоящих в аккаунте пользователей. */
  getUsers(params?: {
    with?: With<["role", "group", "uuid", "amojo_id"]>;
    page?: number;
    limit?: number;
  }): Promise<ResponseGetUsers> {
    return this.rest.get<ResponseGetUsers>({
      url: "/api/v4/users",
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретного пользователя, состоящего в аккаунте, по ID. */
  getUserById(id: number, params?: {
    with?: With<["role", "group", "uuid", "amojo_id"]>;
  }): Promise<ResponseGetUserById> {
    return this.rest.get<ResponseGetUserById>({
      url: `/api/v4/users/${id}`,
      query: query(params),
    });
  }

  /** Метод позволяет добавлять пользователей в аккаунт пакетно. */
  addUsers(users: RequestAddUser[]): Promise<ResponseAddUsers> {
    return this.rest.post<ResponseAddUsers>({
      url: "/api/v4/users",
      payload: users as JSONValue,
    });
  }

  /** Метод позволяет получить список ролей пользователей в аккаунте. */
  getRoles(params?: {
    with?: With<["users"]>;
    page?: number;
    limit?: number;
  }): Promise<ResponseGetRoles> {
    return this.rest.get<ResponseGetRoles>({
      url: "/api/v4/roles",
      query: query(params),
    });
  }

  /** Метод позволяет получить данные конкретной роли аккаунта по ID. */
  getRoleById(id: number, params?: {
    with?: With<["users"]>;
  }): Promise<ResponseGetRoleById> {
    return this.rest.get<ResponseGetRoleById>({
      url: `/api/v4/roles/${id}`,
      query: query(params),
    });
  }

  /** Метод позволяет добавлять роли в аккаунт пакетно. */
  addRoles(roles: RequestAddRole[]): Promise<ResponseAddRoles> {
    return this.rest.post<ResponseAddRoles>({
      url: "/api/v4/roles",
      payload: roles as JSONValue,
    });
  }

  /** Метод позволяет редактировать роль в аккаунте. */
  updateRoleById(id: number, role: RequestUpdateRole): Promise<ResponseUpdateRole> {
    return this.rest.patch<ResponseUpdateRole>({
      url: `/api/v4/roles/${id}`,
      payload: role as JSONValue,
    });
  }

  /** Метод позволяет удалить роль в аккаунте. */
  deleteRoleById(id: number): Promise<void> {
    return this.rest.delete<void>({
      url: `/api/v4/roles/${id}`,
    });
  }
}
