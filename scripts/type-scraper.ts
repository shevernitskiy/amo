import { DOMParser, Element } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";

type ParseOptions = {
  links?: boolean;
  pages?: boolean;
  embedded?: boolean;
  comment?: boolean;
};

async function parseTableFromUrl(
  type_name: string,
  url: string,
  element_number: number,
  options?: ParseOptions,
): Promise<string> {
  const res = await fetch(url);
  const html = await res.text();
  const dom = new DOMParser().parseFromString(html, "text/html");
  const table = dom?.querySelectorAll("table.term_table").item(element_number) as Element;
  const rows = table.querySelectorAll("tbody tr");

  let result = `type ${type_name} = {\n`;

  let nest = "";

  for (const row of rows) {
    const cells = (row as Element).querySelectorAll("td");
    let name = cells.item(0)?.textContent.trim();
    const type = typeReplacer(cells.item(1)?.textContent ?? "").trim();
    const comment = cells.item(2)?.textContent.trim();
    const nested = name.split("[");
    if (options?.embedded !== true && name.includes("_embedded")) continue;

    let line = "  ";
    if (nested.length === 1 && nest === "") {
      nest === "";
    }
    if (nested.length > 1 && nest === "") {
      nest = nested[0];
      line += "{\n  ";
    }
    if (nested.length === 1 && nest !== "") {
      line += "}\n  ";
      nest = "";
    }
    if (options?.comment === true) {
      line += "/** " + comment + " */\n  ";
    }
    if (nested.length > 1 && nest !== "") {
      line += "  ";
      name = name.replaceAll(nest, "");
    }
    line += name + ": " + type;

    result += line + "\n";
  }

  result += "}";
  result = result
    .replaceAll("| |", " |")
    .replaceAll("[", "")
    .replaceAll("]", "")
    .replaceAll("object", "")
    .replace("custom_fields_values: array", "custom_fields_values: CustomFieldsValue[]")
    .replaceAll("\n    0:", "")
    .replaceAll("\n    0", "\n    ");

  return result;
}

async function parseUnion(
  type_name: string,
  url: string,
  element_number: number,
  options?: ParseOptions,
): Promise<string> {
  const res = await fetch(url);
  const html = await res.text();
  const dom = new DOMParser().parseFromString(html, "text/html");
  const table = dom?.querySelectorAll("table.term_table").item(element_number) as Element;
  const rows = table.querySelectorAll("tbody tr");

  let result = `type ${type_name} = \n`;

  for (const row of rows) {
    const cells = (row as Element).querySelectorAll("td");
    const name = cells.item(0)?.textContent.trim();
    const comment = cells.item(1)?.textContent.trim();
    let line = `  | "${name}"\n`;
    if (options?.comment === true) {
      line = `  /** ${comment} */\n` + line;
    }
    result += line;
  }

  return result;
}

function typeReplacer(value: string): string {
  return value
    .replace("/", "")
    .replace("int", "number")
    .replace("bool", "boolean")
    .replace("null", " | null")
    .replace(/string\(.+\)/, "string");
}

function writeTypes(data: string): void {
  console.log("write", data.split("type ")[1].split(" = ")[0].trim());
  Deno.writeTextFileSync("./amo.types.ts", data + "\n\n", { create: true }); // append: true to dump all
}

// parseTableFromUrl("Lead", "https://www.amocrm.ru/developers/content/crm_platform/leads-api", 2, { comment: true })
//   .then(writeTypes);
// parseTableFromUrl("AccountInfo", "https://www.amocrm.ru/developers/content/crm_platform/account-info", 2, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Unsorted", "https://www.amocrm.ru/developers/content/crm_platform/unsorted-api#unsorted-list", 2, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl(
//   "UnsrotedMetadataSip",
//   "https://www.amocrm.ru/developers/content/crm_platform/unsorted-api#unsorted-list",
//   23,
//   { comment: true },
// ).then(writeTypes);
// parseTableFromUrl(
//   "UnsrotedMetadataChat",
//   "https://www.amocrm.ru/developers/content/crm_platform/unsorted-api#unsorted-list",
//   25,
//   { comment: true },
// ).then(writeTypes);
// parseTableFromUrl(
//   "UnsrotedMetadataMail",
//   "https://www.amocrm.ru/developers/content/crm_platform/unsorted-api#unsorted-list",
//   26,
//   { comment: true },
// ).then(writeTypes);
// parseTableFromUrl(
//   "Pipeline",
//   "https://www.amocrm.ru/developers/content/crm_platform/leads_pipelines#pipeline-detail",
//   1,
//   { comment: true },
// ).then(writeTypes);
// parseTableFromUrl(
//   "PipelineStatus",
//   "https://www.amocrm.ru/developers/content/crm_platform/leads_pipelines#pipeline-detail",
//   10,
//   { comment: true },
// ).then(writeTypes);
// parseTableFromUrl("Contact", "https://www.amocrm.ru/developers/content/crm_platform/contacts-api", 2, { comment: true })
//   .then(writeTypes);
// parseTableFromUrl("Company", "https://www.amocrm.ru/developers/content/crm_platform/companies-api", 2, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Catalog", "https://www.amocrm.ru/developers/content/crm_platform/catalogs-api", 2, { comment: true })
//   .then(writeTypes);
// parseTableFromUrl("CatalogElement", "https://www.amocrm.ru/developers/content/crm_platform/catalogs-api", 11, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Task", "https://www.amocrm.ru/developers/content/crm_platform/tasks-api", 2, { comment: true })
//   .then(writeTypes);
// parseTableFromUrl("CustomFieldsValue", "https://www.amocrm.ru/developers/content/crm_platform/custom-fields", 1, {
//   comment: true,
// }).then(writeTypes);
// parseUnion("CustomFieldsValueTypes", "https://www.amocrm.ru/developers/content/crm_platform/custom-fields", 18, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("CustomFieldsValueGroup", "https://www.amocrm.ru/developers/content/crm_platform/custom-fields", 10, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Tag", "https://www.amocrm.ru/developers/content/crm_platform/tags-api", 2, { comment: true })
//   .then(writeTypes);
// parseTableFromUrl("Events", "https://www.amocrm.ru/developers/content/crm_platform/events-and-notes", 2, {
//   comment: true,
// }).then(writeTypes);
// parseUnion("EventTypes", "https://www.amocrm.ru/developers/content/crm_platform/events-and-notes", 23, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Note", "https://www.amocrm.ru/developers/content/crm_platform/events-and-notes", 30, {
//   comment: true,
// }).then(writeTypes);
// parseUnion("NoteTypes", "https://www.amocrm.ru/developers/content/crm_platform/events-and-notes", 27, { comment: true })
//   .then(writeTypes);
// parseTableFromUrl("Customer", "https://www.amocrm.ru/developers/content/crm_platform/customers-api", 4, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Transaction", "https://www.amocrm.ru/developers/content/crm_platform/customers-api", 18, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Status", "https://www.amocrm.ru/developers/content/crm_platform/customers-statuses-api", 1, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Segment", "https://www.amocrm.ru/developers/content/crm_platform/customers-statuses-api", 11, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("User", "https://www.amocrm.ru/developers/content/crm_platform/users-api", 2, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Role", "https://www.amocrm.ru/developers/content/crm_platform/users-api", 16, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Webhook", "https://www.amocrm.ru/developers/content/crm_platform/webhooks-api", 2, {
//   comment: true,
// }).then(writeTypes);
// parseUnion("WebhookTypes", "https://www.amocrm.ru/developers/content/crm_platform/webhooks-api", 7, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Widget", "https://www.amocrm.ru/developers/content/crm_platform/widgets-api", 2, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Call", "https://www.amocrm.ru/developers/content/crm_platform/calls-api", 0, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Talk", "https://www.amocrm.ru/developers/content/crm_platform/talks-api", 1, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("Source", "https://www.amocrm.ru/developers/content/crm_platform/sources-api", 2, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("ChatTemplate", "https://www.amocrm.ru/developers/content/crm_platform/chat-templates-api", 2, {
//   comment: true,
// }).then(writeTypes);
// parseTableFromUrl("File", "https://www.amocrm.ru/developers/content/files/files-api", 5, {
//   comment: true,
// }).then(writeTypes);
