import type { Role, User } from "@typings/entities.ts";
import type { DeepPartial, Links, Page, PageCount, RequestId, Total } from "@typings/utility.ts";

export type ResponseGetUsers = Total & Page & PageCount & Links & {
  _embedded: {
    users: Links & User & {
      _embedded: {
        roles: (Links & Pick<Role, "id" | "name">)[];
        groups: {
          id: number;
          name: string;
        }[];
      };
    };
  };
};

export type ResponseGetUserById = Links & User;
export type RequestAddUser = DeepPartial<User> & RequestId;
export type ResponseAddUsers = Total & {
  _embedded: {
    users: (Links & RequestId & User)[];
  };
};

export type ResponseGetRoles = Total & Page & PageCount & Links & {
  _embedded: {
    roles: Links & Role & {
      _embedded: {
        users: Pick<User, "id">[];
      };
    };
  };
};

export type ResponseGetRoleById = Links & Role;
export type RequestAddRole = DeepPartial<Role> & RequestId;
export type ResponseAddRoles = Total & {
  _embedded: {
    roles: ResponseGetRoleById[];
  };
};

export type RequestUpdateRole = RequestAddRole;
export type ResponseUpdateRole = Links & Role;
