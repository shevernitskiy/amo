export function isJsonObject(jsonValue: any): boolean {
  return typeof jsonValue === "object" && jsonValue !== null;
}
