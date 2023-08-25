import { JSONValue } from '../typings/utility.ts';

export function isJsonObject(jsonValue: BodyInit | JSONValue | undefined): boolean {
  return typeof jsonValue === "object" && jsonValue !== null;
}
