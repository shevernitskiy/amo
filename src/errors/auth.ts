import { JSONValue } from "../typings/utility.ts";

export class AuthError extends Error {
  constructor(public response: JSONValue) {
    super();
  }
}
