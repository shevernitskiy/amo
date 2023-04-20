import { JSONValue } from "@typings/utility.ts";

export class AuthError extends Error {
  constructor(private response: JSONValue) {
    super();
  }
}
