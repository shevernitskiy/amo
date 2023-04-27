import { JSONValue } from "../typings/utility.ts";

export class ApiError extends Error {
  constructor(public response: JSONValue, message?: string) {
    super(message);
  }
}
