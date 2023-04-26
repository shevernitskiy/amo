import type { SalesBotTask } from "@typings/entities.ts";
import type { Links } from "@typings/utility.ts";

export type RequestRunSalesBotTask = SalesBotTask;
export type ResponseRunSalesBotTasks = Links & { success: boolean };
