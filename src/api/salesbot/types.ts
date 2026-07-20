import type { SalesBotTask } from "../../typings/entities.ts";
import type { JSONValue, Links, Page, PageCount, Total } from "../../typings/utility.ts";

/** Тип сущности для запуска/остановки Salesbot (методы API v4) */
export type SalesBotEntityType = "leads" | "contacts" | "customers";

/** Salesbot в аккаунте (модель бота) */
export type SalesBot = Links & {
  /** ID бота */
  id: number;
  /** Название бота */
  name: string;
  /** Тип функциональности */
  type_functionality: "regular" | "greeting" | "marketing" | "nps";
  /** Используется ли визуальный редактор (true) или текстовый режим (false) */
  is_visual_editor: boolean;
  /** Настройки Salesbot */
  settings: SalesBotSettings;
  /**
   * Добавлен ли Salesbot в избранное текущим пользователем
   * @remarks Требуется GET-параметр with=favorite
   */
  is_favorite?: boolean;
};

/** Настройки Salesbot */
export type SalesBotSettings = {
  /** Активен ли Salesbot */
  active?: boolean;
  [key: string]: JSONValue | undefined;
};

// API v2 (устаревший) -----------------------------------------------------

export type RequestRunSalesBotTask = SalesBotTask;
export type ResponseRunSalesBotTasks = Links & { success: boolean };

// API v4 ------------------------------------------------------------------

export type ResponseGetSalesBots = Total & Page & PageCount & Links & {
  _embedded: {
    items: SalesBot[];
  };
};

export type ResponseGetSalesBotById = SalesBot;

/** Тело запроса запуска одного Salesbot по ID */
export type RequestRunSalesBot = {
  /** ID сущности, к которой привязан контакт с чатом, или ID самого контакта */
  entity_id: number;
  /** Тип сущности */
  entity_type: SalesBotEntityType;
};

/** Тело запроса остановки Salesbot по ID */
export type RequestStopSalesBot = {
  /** ID сущности */
  entity_id: number;
  /** Тип сущности. Для остановки доступен только leads */
  entity_type: "leads";
};

/** Элемент тела запроса пакетного запуска Salesbot (API v4) */
export type RequestRunSalesBot4Task = {
  /** ID бота для запуска */
  bot_id: number;
  /** ID сущности, к которой привязан контакт с чатом, или ID самого контакта */
  entity_id: number;
  /** Тип сущности */
  entity_type: SalesBotEntityType;
};
