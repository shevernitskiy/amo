// deno-lint-ignore-file no-explicit-any
export type AccountInfo = {
  /** ID аккаунта */
  id: number;
  /** Название аккаунта */
  name: string;
  /** Субдомен аккаунта */
  subdomain: string;
  /** ID текущего пользователя */
  current_user_id: number;
  /** Страна, указанная в настройках аккаунта */
  country: string;
  /** Режим покупателей. Возможные варианты: unavailable (функционал недоступен), disabled (функцонал отключен), segments (сегментация), dynamic (deprecated), periodicity (периодические покупки) */
  customers_mode: string;
  /** Включен ли функционал “Неразобранного” в аккаунте */
  is_unsorted_on: boolean;
  /** Включен ли функционал причин отказа */
  is_loss_reason_enabled: boolean;
  /** Включен ли функционал Типовых вопросов (доступен только на профессиональном тарифе) */
  is_helpbot_enabled: boolean;
  /** Является ли данный аккаунт техническим */
  is_technical_account: boolean;
  /** Порядок отображения имен контактов (1 – Имя, Фамилия; 2 – Фамилия, Имя) */
  contact_name_display_order: 1 | 2;
  /** Требуется GET параметр with. Уникальный идентификатор аккаунта для работы с сервисом чатов amoJo */
  amojo_id: string;
  /** Требуется GET параметр with. Текущая версия amoCRM */
  version: number;
  /** Требуется GET параметр with. Адрес сервиса файлов для конкретного аккаунта */
  drive_url: string;
  /** Требуется GET параметр with. Включена ли API фильтрация для аккаунта */
  is_api_filter_enabled: boolean;
  created_at: number;
  created_by: number;
  updated_at: number;
  updated_by: number;
  currency: string;
  currency_symbol: string;
  mobile_feature_version: number;
};

export type Lead = {
  /** ID сделки */
  id: number;
  /** Название сделки */
  name: string | null;
  /** Бюджет сделки */
  price: number | null;
  /** ID пользователя, ответственного за сделку */
  responsible_user_id: number | null;
  /** ID группы, в которой состоит ответственны пользователь за сделку */
  group_id: number | null;
  /** ID статуса, в который добавляется сделка, по-умолчанию – первый этап главной воронки */
  status_id: number | null;
  /** ID воронки, в которую добавляется сделка */
  pipeline_id: number | null;
  /** ID причины отказа */
  loss_reason_id: number | null;
  /** Требуется GET параметр with. ID источника сделки */
  source_id?: number | null;
  /** ID пользователя, создающий сделку */
  created_by: number | null;
  /** ID пользователя, изменяющий сделку */
  updated_by: number;
  /** Дата закрытия сделки, передается в Unix Timestamp */
  closed_at: number | null;
  /** Дата создания сделки, передается в Unix Timestamp */
  created_at: number | null;
  /** Дата изменения сделки, передается в Unix Timestamp */
  updated_at: number;
  /** Дата ближайшей задачи к выполнению, передается в Unix Timestamp */
  closest_task_at: number | null;
  /** Удалена ли сделка */
  is_deleted: boolean;
  /** Массив, содержащий информацию по значениям дополнительных полей, заданных для данной сделки */
  custom_fields_values: CustomFieldsValue[] | null;
  /** Скоринг сделки */
  score: number | null;
  /** ID аккаунта, в котором находится сделка */
  account_id: number;
  /** Тип поля "стоимость труда"  показывает сколько времени было затрачено на работу со сделкой. Время исчисления в секундах */
  labor_cost: number | null;
  /** Требуется GET параметр with. Изменен ли в последний раз бюджет сделки роботом */
  is_price_modified_by_robot?: boolean;
};

export type Unsorted = {
  /** UID неразобранного */
  uid: string;
  /** UID источника заявки, генерируется на стороне интеграции */
  source_uid: string;
  /** Название источника заявки */
  source_name: string;
  /** Категория неразобранного. Один из вариантов: sip, mail, chats, forms */
  category: string;
  /** ID воронки, в которой находится неразобранное */
  pipeline_id: number;
  /** Дата создания неразобранного в Unix Timestamp */
  created_at: number;
  /** Метаданные заявки, каждый тип заявки имеет свой набор данных. Подробней тут */
  metadata: UnsrotedMetadataChat | UnsrotedMetadataSip | UnsrotedMetadataMail | UnsrotedMetadataForm;
  /** ID аккаунта, в котором находится неразобранное */
  account_id: number;
};

export type UnsrotedMetadataChat = {
  /** Имя пользователя, который написал в чат */
  from: string;
  /** Идентификатор страницы, на которую написано сообщение */
  to: string;
  /** Когда получено сообщение от клиента. Данные в формате Unix Timestamp. */
  received_at: number;
  /** Название сервиса, из которого получено сообщение */
  service: string;
  /** Данные об авторе сообщения */
  client: {
    /** Имя отправителя сообщения */
    name: string;
    /** Ссылка на аватар отправителя сообщения */
    avatar: string | null;
  };
  /** Данные об источнике сообщения */
  origin: {
    /** ID чата в сервисе чатов */
    chat_id: string;
    /** Дополнительные данные из сервиса чатов */
    ref: string | null;
    /** UID пользователя, который написал сообщение */
    visitor_uid: string | null;
  };
  /** Последнее сообщение от пользователя */
  last_message_text: string | null;
  /** Название источника, из которого получено сообщение */
  source_name: string;
};

export type UnsrotedMetadataSip = {
  /** От кого сделан звонок */
  phone: string;
  /** Кому сделан звонок. Можно передавать ID пользователя amoCRM, номер телефона или имя. */
  call_responsible: string | number | null;
  /** Когда сделан звонок в формате Unix Timestamp. */
  called_at: number;
  /** Сколько длился звонок */
  duration: number;
  /** Ссылка на запись звонка */
  link: string;
  /** Код сервиса, через который сделан звонок */
  service_code: string;
  /** Данный флаг не возвращается в API, но может быть передан. В случае передачи значения true, в карточку будет добавлено событие о входящем звонке. */
  is_call_event_needed: boolean;
  from: string; // why is it only in exmaple not table?!
  uniq: string; // why is it only in exmaple not table?!
};

export type UnsrotedMetadataForm = {
  /** Идентификатор формы на стороне интеграции. */
  form_id: string;
  /** Название формы */
  form_name: string;
  /** Страница, на которой установлена форма */
  form_page: string;
  /** IP адрес, с которого поступила заявка */
  ip: string;
  /**	Временная метка отправки данных через форму. Данные в формате Unix Timestamp */
  form_sent_at: number;
  /**	Информация, откуда был переход на страницу, где расположена форма. */
  referer: string;
};

export type UnsrotedMetadataMail = {
  /** Информация об авторе письма */
  from: {
    /** E-mail автора письма */
    email: string;
    /** Имя автора письма */
    name: string;
  };
  /** Когда получено письмо. Данные в формате Unix Timestamp. */
  received_at: number;
  /** Тема письма */
  subject: string;
  /** ID цепочки писем в сервисе почты */
  thread_id: number;
  /** ID письма в сервисе почты */
  message_id: number;
  /** Выдержка из контента письма */
  content_summary: string;
};

export type Pipeline = {
  /** ID воронки */
  id: number;
  /** Название воронки */
  name: string;
  /** Сортировка воронки */
  sort: number;
  /** Является ли воронка главной */
  is_main: boolean;
  /** Включено ли неразобранное в воронке */
  is_unsorted_on: boolean;
  /** Является ли воронка архивной */
  is_archive: boolean;
  /** ID аккаунта, в котором находится воронка */
  account_id: number;
};

export type PipelineStatus = {
  /** ID статуса */
  id: number;
  /** Название статуса */
  name: string;
  /** Сортировка статуса */
  sort: number;
  /** Доступен ли статус для редактирования */
  is_editable: boolean;
  /** ID воронки, в которой находится статус */
  pipeline_id: number;
  /** Цвет статуса. Доступные цвета */
  color: string;
  /** Тип статуса (1 – неразобранное, 0 – обычный статус) */
  type: 0 | 1;
  /** ID аккаунта, в котором находится воронка */
  account_id: number;
};

export type Contact = {
  /** ID контакта */
  id: number;
  /** Название контакта */
  name: string;
  /** Имя контакта */
  first_name: string;
  /** Фамилия контакта */
  last_name: string;
  /** ID пользователя, ответственного за контакт */
  responsible_user_id: number;
  /** ID группы, в которой состоит ответственны пользователь за контакт */
  group_id: number;
  /** ID пользователя, создавший контакт */
  created_by: number;
  /** ID пользователя, изменивший контакт */
  updated_by: number;
  /** Дата создания контакта, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения контакта, передается в Unix Timestamp */
  updated_at: number;
  /** Удален ли элемент */
  is_deleted: boolean;
  /** Дата ближайшей задачи к выполнению, передается в Unix Timestamp */
  closest_task_at: number;
  /** Массив, содержащий информацию по значениям дополнительных полей, заданных для данного контакта */
  custom_fields_values: CustomFieldsValue[] | null;
  /** ID аккаунта, в котором находится контакт */
  account_id: number;
};

export type Company = {
  /** ID компании */
  id: number;
  /** Название компании */
  name: string;
  /** ID пользователя, ответственного за компанию */
  responsible_user_id: number;
  /** ID группы, в которой состоит ответственны пользователь за компанию */
  group_id: number;
  /** ID пользователя, создавший компанию */
  created_by: number;
  /** ID пользователя, изменивший компанию */
  updated_by: number;
  /** Дата создания компании, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения компании, передается в Unix Timestamp */
  updated_at: number;
  /** Дата ближайшей задачи к выполнению, передается в Unix Timestamp */
  closest_task_at: number;
  /** Массив, содержащий информацию по значениям дополнительных полей, заданных для данной компании */
  custom_fields_values: CustomFieldsValue[] | null;
  /** Удален ли элемент */
  is_deleted: boolean;
  /** ID аккаунта, в котором находится компания */
  account_id: number;
};

export type Catalog = {
  /** ID списка */
  id: number;
  /** Название списка */
  name: string;
  /** ID пользователя, создавший список */
  created_by: number;
  /** ID пользователя, изменивший список последним */
  updated_by: number;
  /** Дата создания списка, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения списка, передается в Unix Timestamp */
  updated_at: number;
  /** Сортировка списка */
  sort: number;
  /** Тип списка */
  type: string;
  /** Можно ли добавлять элементы списка из интерфейса (Применяется только для списка счетов) */
  can_add_elements: boolean;
  /** Должна ли добавляться вкладка со списком в карточку сделки/покупателя (Применяется только для списка счетов) */
  can_show_in_cards: boolean;
  /** Если ли возможность привязывать один элемент данного списка к нескольким сделкам/покупателям */
  can_link_multiple: boolean;
  /** Может ли список быть удален через интерфейс */
  can_be_deleted: boolean;
  /** Код виджета, который управляет списком и может отобразить своё собственное окно редактирования элемента (Применяется только для списка счетов) */
  sdk_widget_code: number;
  /** ID аккаунта, в котором находится список */
  account_id: number;
};

export type CatalogElement = {
  /** ID элемента списка */
  id: number;
  /** ID списка */
  catalog_id: number;
  /** Название элемента */
  name: string;
  /** ID пользователя, создавший элемент */
  created_by: number;
  /** ID пользователя, изменивший элемент последним */
  updated_by: number;
  /** Дата создания элемента, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения элемента, передается в Unix Timestamp */
  updated_at: number;
  /** Удален ли элемент */
  is_deleted: boolean;
  /** Массив, содержащий информацию по значениям дополнительных полей, заданных для данного элемента */
  custom_fields_values: CustomFieldsValue[] | null;
  /** ID аккаунта, в котором находится элемент списка */
  account_id: number;
};

export type Task = {
  /** ID задачи */
  id: number;
  /** ID пользователя, создавшего задачу */
  created_by: number;
  /** ID пользователя, изменившего задачу */
  updated_by: number;
  /** Дата создания задачи, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения задачи, передается в Unix Timestamp */
  updated_at: number;
  /** ID пользователя, ответственного за задачу */
  responsible_user_id: number;
  /** ID группы, в которой состоит ответственны пользователь за задачу */
  group_id: number;
  /** ID сущности, к которой привязана задача */
  entity_id: number;
  /** Тип сущности, к которой привязана задача */
  entity_type: string;
  /** Выполнена ли задача */
  is_completed: boolean;
  /** Тип задачи */
  task_type_id: number;
  /** Описание задачи */
  text: string;
  /** Длительность задачи в секундах */
  duration: number;
  /** Дата, когда задача должна быть завершена, передается в Unix Timestamp */
  complete_till: number;
  /** Результат выполнения задачи */
  result: {
    /** Текст результата выполнения задачи */
    text: string;
  };
  /** ID аккаунта, в котором находится задача */
  account_id: number;
};

export type CustomFieldsValue = Partial<{
  /** ID поля */
  id: number;
  /** Название поля */
  name: string;
  /** Код поля, по-которому можно обновлять значение в сущности, без передачи ID поля */
  code: string | null;
  /** Тип поля. Список доступных полей */
  type: CustomFieldsValueTypes;
  /** Доступные значения для поля. Значение данного поля доступно только для полей с поддержкой enum */
  enums: Partial<{
    /** ID значения */
    enum_id: number;
    /** Значение */
    value: string;
    /** Сортировка значения */
    sort: number;
    /** Символьный код значения */
    enum_code: string | null;
  }>[] | null;
  /** ID поля */
  field_id: number;
  /** Название поля */
  field_name: string;
  /** Код поля, по-которому можно обновлять значение в сущности, без передачи ID поля */
  field_code: string | null;
  /** Сортировка поля */
  sort: number;
  /** Тип поля. Список доступных полей */
  field_type: CustomFieldsValueTypes;
  /** Тип сущности (leads, contacts, companies, segments, customers, catalogs) */
  entity_type: "leads" | "contacts" | "companies" | "segments" | "customers" | "catalogs";
  /** Параметр отвечает за определение типа поля как "вычисляемое" (computed) поле. Данный ключ возвращается только при получении списка полей сделки */
  is_computed: boolean;
  /** Является ли поле предустановленным. Данный ключ возвращается только при получении списка полей контактов и компаний */
  is_predefined: boolean;
  /** Доступно ли поле для удаления. Данный ключ возвращается только при получении списка полей контактов и компаний */
  is_deletable: boolean;
  /** Отображается ли поле в интерфейсе списка. Данный ключ возвращается только при получении списка полей списков (каталогов) */
  is_visible: boolean;
  /** Обязательно ли поле для заполнения при создании элемента списка. Данный ключ возвращается только при получении списка полей списков (каталогов) */
  is_required: boolean;
  /** Настройки поля. Данный ключ возвращается только при получении списка полей списков (каталогов) */
  settings: any[] | null;
  /** Когда напоминать о дне рождения (never – никогда, day – за день, week – за неделю, month – за месяц). Значение данного поля доступно только для поля типа birthday. Данный ключ возвращается только при получении списка полей контактов, сделок и компаний */
  remind: "never" | "day" | "week" | "month" | null;
  /** Код валюты поля. Применимо только для типа поля – monetary. Для других типов полей – null. */
  currency: string | null;
  /** Доступные значения для поля. Значение данного поля доступно только для полей с поддержкой enum */
  values: Partial<{
    /** ID значения */
    enum_id: number;
    /** Значение */
    value: string;
    /** Сортировка значения */
    sort: number;
    /** Символьный код значения */
    enum_code: string | null;
  }>[] | null;
  /** Вложенные значения. Данные ключ возвращается только при получении списка полей каталогов и значение доступно только для поля category */
  nested: {
    /** ID вложенного значения. Данные ключ возвращается только при получении списка полей каталогов и значение доступно только для поля category */
    id: number;
    /** ID родительского вложенного значения. Данные ключ возвращается только при получении списка полей каталогов и значение доступно только для поля category */
    parent_id: number;
    /** Значение вложенного значения. Данные ключ возвращается только при получении списка полей каталогов и значение доступно только для поля category */
    value: string;
    /** Сортировка вложенного значения. Данные ключ возвращается только при получении списка полей каталогов и значение доступно только для поля category */
    sort: number;
  }[] | null;
  /** Доступно ли поле для редактирования только через API. Данный ключ возвращается только при получении списка полей контактов, сделок и компаний */
  is_api_only: boolean;
  /** ID группы полей, в которой состоит данное поле. Данный ключ возвращается только при получении списка полей контактов, сделок, покупателей и компаний */
  group_id: string | null;
  /** Обязательные поля для смены этапов. Данный ключ возвращается только при получении списка полей контактов, сделок и компаний */
  required_statuses: {
    /** ID статуса, для перехода в который данное поле обязательно к заполнению. Данный ключ возвращается только при получении списка полей контактов, сделок и компаний */
    status_id: number;
    /** ID воронки, для перехода в который данное поле обязательно к заполнению. Данный ключ возвращается только при получении списка полей контактов, сделок и компаний */
    pipeline_id: number;
  }[] | null;
  /** Настройка скрытия полей. Поля скрываются в интерфейсе в зависимости от статуса. Данный ключ возвращается только при получении списка полей сделок. */
  hidden_statuses: {
    /** ID статуса, в котором поле скрыто */
    status_id: number;
    /** ID воронки, в котором поле скрыто */
    pipeline_id: number;
  }[];
  /** Настройка поля типа chained_list. Данный ключ возвращается только при получении списка полей сделок и покупателей. */
  chained_lists: {
    /** Модель настройки связанного списка. */
    /** Название связанного списка, которое отображается в карточке */
    title: string | null;
    /** ID каталога */
    catalog_id: number;
    /** ID родительского каталога */
    parent_catalog_id: number;
  }[] | null;
  /** Сallback js-функция, которая будет выполнена на странице с CRM Plugin и формой amoCRM при отправке данных. Данное значение возвращается для полей типа tracking_data */
  tracking_callback: string;
  /** ID списка или символьный код (contacts, companies, contacts_and_companies) для поля типа Связь с другим элементов (linked_entity). */
  search_in: string | null;
}>;

export type CustomFieldsValueTypes =
  /** Текст */
  | "text"
  /** Число */
  | "numeric"
  /** Флаг */
  | "checkbox"
  /** Список */
  | "select"
  /** Мультисписок */
  | "multiselect"
  /** Дата */
  | "date"
  /** Ссылка */
  | "url"
  /** Текстовая область */
  | "textarea"
  /** Переключатель */
  | "radiobutton"
  /** Короткий адрес */
  | "streetaddress"
  /** Адрес */
  | "smart_address"
  /** День рождения */
  | "birthday"
  /** Юр. лицо */
  | "legal_entity"
  /** Дата и время */
  | "date_time"
  /** Цена */
  | "price"
  /** Категория */
  | "category"
  /** Предметы */
  | "items"
  /** Отслеживаемые данные */
  | "tracking_data"
  /** Связь с другим элементом */
  | "linked_entity"
  /** Каталоги и списки (платная опция Супер-поля) */
  | "chained_list"
  /** Денежное (платная опция Супер-поля) */
  | "monetary"
  /** Файл */
  | "file"
  /** Мультитекст для контактов (поля с телефоном и email) */
  | "multitext";

export type CustomFieldsValueGroup = {
  /** ID группы полей */
  id: string;
  /** Название группы полей */
  name: string;
  /** Сортировка группы полей в карточке сущности */
  sort: number;
  /** Тип сущности (leads, contacts, companies, customers, catalogs) */
  entity_type: "leads" | "contacts" | "companies" | "customers" | "catalogs";
  /** Является ли группа предустановленной. Такие группы нельзя удалить */
  is_predefined: boolean;
  /** Тип группы (linked_group – группы товаров, custom_field_group – группы полей). Для списков – только custom_field_group */
  type: "linked_group" | "custom_field_group";
};

export type Tag = {
  /** ID тега */
  id: number;
  /** Название тега */
  name: string;
  /** Цвет тега */
  color: Color | null;
};

export const enum Color {
  BRIGHT_GRAY = "EBEBEB",
  AMERICAN_SILVER = "D0D0D0",
  PINK_LACE = "F2DDF7",
  TROPICAL_VIOLET = "D1A4DC",
  TULIP = "FF8F92",
  LIGHT_RED = "FFC8C8",
  MEDIUM_SPRING_BUD = "C7DB8C",
  PALE_SPRING_BUD = "DDEBB5",
  VISTA_BLUE = "8699DA",
  BABY_BLUE_EYES = "AABDFF",
  MUSTARD = "FFCE5A",
  FLAVESCENT = "FFE193",
  ETON_BLUE = "90CDB0",
  AERO_BLUE = "C6F4DE",
  BLUE_BELL = "A9A5D7",
  PALE_LAVENDER = "D8D5FF",
  JORDY_BLUE = "86C0FC",
  DARK_RASPBERRY = "832161",
  PANSY_PURPLE = "6A0F49",
  DEEP_GREEN_CYAN_TURQUOISE = "0C7C59",
  YALE_BLUE = "10599D",
  JAPANESE_CARMINE = "9D2B32",
  LAPIS_LAZULI = "247BA0",
}

export type EventTypes =
  /** Новая сделка */
  | "lead_added"
  /** Сделка удалена */
  | "lead_deleted"
  /** Сделка восстановлена */
  | "lead_restored"
  /** Изменение этапа продажи */
  | "lead_status_changed"
  /** Прикрепление сделки */
  | "lead_linked"
  /** Открепление сделки */
  | "lead_unlinked"
  /** Новый контакт */
  | "contact_added"
  /** Контакт удален */
  | "contact_deleted"
  /** Контакт восстановлен */
  | "contact_restored"
  /** Прикрепление контакта */
  | "contact_linked"
  /** Открепление контакта */
  | "contact_unlinked"
  /** Новая компания */
  | "company_added"
  /** Компания удалена */
  | "company_deleted"
  /** Компания восстановлена */
  | "company_restored"
  /** Прикрепление компании */
  | "company_linked"
  /** Открепление компании */
  | "company_unlinked"
  /** Новый покупатель */
  | "customer_added"
  /** Покупатель удален */
  | "customer_deleted"
  /** Изменение этапа покупателя */
  | "customer_status_changed"
  /** Прикрепление покупателя */
  | "customer_linked"
  /** Открепление покупателя */
  | "customer_unlinked"
  /** Новая задача */
  | "task_added"
  /** Задача удалена */
  | "task_deleted"
  /** Завершение задачи */
  | "task_completed"
  /** Изменение типа задачи */
  | "task_type_changed"
  /** Изменение текста задачи */
  | "task_text_changed"
  /** Изменение даты исполнения задачи */
  | "task_deadline_changed"
  /** Результат по задаче */
  | "task_result_added"
  /** Входящий звонок */
  | "incoming_call"
  /** Исходящий звонок */
  | "outgoing_call"
  /** Входящее сообщение */
  | "incoming_chat_message"
  /** Исходящее сообщение */
  | "outgoing_chat_message"
  /** Входящее SMS */
  | "incoming_sms"
  /** Исходящее SMS */
  | "outgoing_sms"
  /** Теги добавлены */
  | "entity_tag_added"
  /** Теги убраны */
  | "entity_tag_deleted"
  /** Прикрепление */
  | "entity_linked"
  /** Открепление */
  | "entity_unlinked"
  /** Изменение поля “Бюджет” */
  | "sale_field_changed"
  /** Изменение поля “Название” */
  | "name_field_changed"
  /** Сумма покупок */
  | "ltv_field_changed"
  /** Изменение поля */
  | "custom_field_value_changed"
  /** Ответственный изменен */
  | "entity_responsible_changed"
  /** Ответ робота */
  | "robot_replied"
  /** Тема вопроса определена */
  | "intent_identified"
  /** Новая оценка NPS */
  | "nps_rate_added"
  /** Переход по ссылке */
  | "link_followed"
  /** Добавлена покупка */
  | "transaction_added"
  /** Новое примечание */
  | "common_note_added"
  /** Примечание удалено */
  | "common_note_deleted"
  /** Добавлен новый файл */
  | "attachment_note_added"
  /** Добавление в ретаргетинг */
  | "targeting_in_note_added"
  /** Удаление из ретаргетинга */
  | "targeting_out_note_added"
  /** Новое примечание с гео-меткой */
  | "geo_note_added"
  /** Новое системное примечание */
  | "service_note_added"
  /** Заход на сайт */
  | "site_visit_note_added"
  /** LifePay: Сообщение кассиру */
  | "message_to_cashier_note_added"
  /** Ключевое действие */
  | "key_action_completed"
  /** Выполнено объединение */
  | "entity_merged"
  /** Изменение поля c переданным ID. Если вы передаете данный тип, то другие типы не могут быть переданы. */
  | string;

export type Event = {
  /** ID события */
  id: string;
  /** Тип события */
  type: EventTypes;
  /** ID сущности события */
  entity_id: number;
  /** Сущность события */
  entity_type: string;
  /** ID пользователя, создавший событие */
  created_by: number;
  /** Дата создания события, передается в Unix Timestamp */
  created_at: number;
  /** Массив с изменениями по событию. Подробней о свойствах изменения читайте тут */
  value_after: any[]; // TODO: eto pzdc, kto takoe pridumal voobshe?
  /** Массив с изменениями по событию. Подробней о свойствах изменения читайте тут */
  value_before: any[]; // TODO: eto pzdc, kto takoe pridumal voobshe?
  /** ID аккаунта, в котором находится событие */
  account_id: number;
};

export type NoteParams = {
  /** Текстовое примечание */
  common: {
    text: string;
  };
  /** Входящий звонок */
  call_in: {
    uniq: string;
    duration: number;
    source: string;
    link: string;
    phone: string;
    call_responsible: string;
  };
  /** Исходящий звонок */
  call_out: {
    uniq: string;
    duration: number;
    source: string;
    link: string;
    phone: string;
    call_responsible: string;
  };
  /** Системное сообщение (добавляется интеграциями) */
  service_message: {
    service: string;
    text: string;
  };
  /** Расширенное системное сообщение (поддерживает больше текста и сворачивается в интерфейсе) */
  extended_service_message: {
    service: string;
    text: string;
  };
  /** Сообщение кассиру */
  message_cashier: {
    status: "created" | "shown" | "canceled";
    text: string;
  };
  /** Текстовое примечание с гео-координатами (добавляются мобильным приложением) */
  geolocation: {
    text: string;
    address: string;
    longitude: string;
    latitude: string;
  };
  /** Входящее SMS */
  sms_in: {
    text: string;
    phone: string;
  };
  /** Исходящее SMS */
  sms_out: {
    text: string;
    phone: string;
  };
  /** Примечание с файлом */
  attachment: {
    version_uuid: string;
    file_uuid: string;
    file_name: string;
  };
};

export type Note = {
  /** ID примечания */
  id: number;
  /** ID родительской сущности примечания */
  entity_id: number;
  /** ID пользователя, создавший примечание */
  created_by: number;
  /** ID пользователя, изменивший примечание последним */
  updated_by: number;
  /** Дата создания примечания, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения примечания, передается в Unix Timestamp */
  updated_at: number;
  /** ID пользователя, ответственного за примечание */
  responsible_user_id: number;
  /** ID группы, в которой состоит ответственны пользователь за примечание */
  group_id: number;
  /** Тип примечания */
  note_type: keyof NoteParams;
  /** Свойства примечания, зависят от типа примечания. Подробней о свойствах читайте тут */
  params: NoteParams[keyof NoteParams];
  /** ID аккаунта, в котором находится примечание */
  account_id: number;
};

export type NoteEntityType = "leads" | "contacts" | "companies" | "customers";

export type EntityLink = {
  /** ID главной сущности */
  entity_id: number;
  /** Тип главной сущности (leads, contacts, companies, customers) */
  entity_type: "leads" | "contacts" | "companies" | "customers" | "catalog_elements";
  /** ID связанной сущности */
  to_entity_id: number;
  /** Тип связанной сущности (leads, contacts, companies, customers, catalog_elements) */
  to_entity_type: "leads" | "contacts" | "companies" | "customers" | "catalog_elements";
  /** Метаданные связанной сущности */
  metadata:
    | Partial<{
      /** Является ли привязанный контакт главным */
      main_contact: boolean;
      /** Является ли контакт главным */
      is_main: boolean;
      /** Количество прикрепленных элементов каталогов */
      quantity: number;
      /** ID каталога */
      catalog_id: number;
      /** ID пользователя, от имени которого осуществляется прикрепление */
      updated_by: number;
      /** ID поля типа Цена, которое установлено для привязанного элемента в контексте сущности */
      price_id: number | null;
    }>
    | null;
};

export type Customer = {
  /** ID покупателя */
  id: number;
  /** Название покупателя */
  name: string;
  /** Ожидаемая сумма покупки */
  next_price: number;
  /** Ожидаемая дата следующей покупки. Данные в Unix Timestamp */
  next_date: number;
  /** ID пользователя, ответственного за покупателя */
  responsible_user_id: number;
  /** ID статуса покупателя в аккаунте подробнее здесь */
  status_id: number;
  /** Периодичность (данные необходимы для покупателей, при включенном функционале периодичности) */
  periodicity: number;
  /** ID пользователя, создавший покупателя */
  created_by: number;
  /** ID пользователя, изменивший покупателя */
  updated_by: number;
  /** Дата создания покупателя, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения покупателя, передается в Unix Timestamp */
  updated_at: number;
  /** Дата ближайшей задачи к выполнению, передается в Unix Timestamp */
  closest_task_at: number | null;
  /** Удален ли покупатель */
  is_deleted: boolean;
  /** Массив, содержащий информацию по значениям дополнительных полей, заданных для данного покупателя */
  custom_fields_values: CustomFieldsValue[] | null;
  /** Сумма покупок */
  ltv: number;
  /** Количество */
  purchases_count: number;
  /** Средний размер покупки */
  average_check: number;
  /** ID аккаунта, в котором находится покупатель */
  account_id: number;
};

export type Transaction = {
  /** ID транзакции */
  id: number;
  /** Комментарий к покупке */
  comment: string;
  /** Сумма покупки */
  price: number;
  /** Когда транзакция была проведена. Данные в Unix Timestamp */
  completed_at: number;
  /** ID покупателя, в котором находится транзакция */
  customer_id: number;
  /** ID пользователя, создавший транзакцию */
  created_by: number;
  /** ID пользователя, изменивший транзакцию */
  updated_by: number;
  /** Дата создания транзакции, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения транзакции, передается в Unix Timestamp */
  updated_at: number;
  /** Удалена ли транзакция */
  is_deleted: boolean;
  /** ID аккаунта, в котором находится транзакция */
  account_id: number;
};

// TODO: what is Condition?
export type Status = {
  /** ID статуса */
  id: number;
  /** Название статуса */
  name: string;
  /** Сортировка статуса */
  sort: number;
  /** Является ли статус стандартным */
  is_default: boolean;
  /** Цвет статуса. Доступные цвета */
  color: StatusColor;
  /** Тип статуса (0 – обычный статус, 1 – ожидается покупка, 2 – не купили, 3 – закрытый, 4 – купили недавно) */
  type: 0 | 1 | 2 | 3 | 4;
  /** Условия перехода в статус */
  conditions: any[];
  /** ID аккаунта, в котором находится статус */
  account_id: number;
};

export type StatusColor =
  | "#fffeb2"
  | "#fffd7f"
  | "#fff000"
  | "#ffeab2"
  | "#ffdc7f"
  | "#ffce5a"
  | "#ffdbdb"
  | "#ffc8c8"
  | "#ff8f92"
  | "#d6eaff"
  | "#c1e0ff"
  | "#98cbff"
  | "#ebffb1"
  | "#deff81"
  | "#87f2c0"
  | "#f9deff"
  | "#f3beff"
  | "#ccc8f9"
  | "#eb93ff"
  | "#f2f3f4"
  | "#e6e8ea";

export type Segment = {
  /** ID статуса */
  id: number;
  /** Дата создания сегмента, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения сегмента, передается в Unix Timestamp */
  updated_at: number;
  /** Название сегмента */
  name: string;
  /** Количество покупателей в сегменте */
  customers_count: number;
  /** Цвет статуса. Доступные цвета */
  color: SegmentColor;
  /** Массив, содержащий информацию по значениям дополнительных полей, заданных для данного сегмента */
  custom_fields_values: CustomFieldsValue[] | null;
  /** Массив, содержащий ID дополнительных полей каталогов типа Цена, доступных для данного сегмента */
  available_products_price_types: number[] | null;
  /** ID аккаунта, в котором находится сегмент */
  account_id: number;
};

export type SegmentColor =
  | "10599d"
  | "2176ff"
  | "006acc"
  | "07a0c3"
  | "247ba0"
  | "177e89"
  | "046e8f"
  | "598381"
  | "0c7c59"
  | "495f41"
  | "00a44b"
  | "08605f"
  | "bf2600"
  | "06d6a0"
  | "e14945"
  | "79b473"
  | "ae003f"
  | "a2ad59"
  | "cd0f53"
  | "8e936d"
  | "832161"
  | "2e5339"
  | "bf126f"
  | "6f7c12"
  | "ff5376"
  | "dd1c1a"
  | "bb304e"
  | "631d76"
  | "9d2b32"
  | "4a001f"
  | "b118c8"
  | "6a0f49"
  | "6610f2"
  | "b38a58"
  | "8963ba"
  | "4b3666"
  | "932f6d"
  | "6b2d5c"
  | "6461a0"
  | "4f517d";

export type User = {
  /** ID пользователя */
  id: number;
  /** Полное имя пользователя */
  name: string;
  /** E-mail пользователя */
  email: string;
  /** Язык пользователя. Один из вариантов: ru, en, es */
  lang: "ru" | "en" | "es";
  /** Права пользователя */
  rights: {
    /** Объект прав доступа к сделкам */
    leads: RightsType;
    /** Объект прав доступа к контактам */
    contacts: RightsType;
    /** Объект прав доступа к компаниям */
    companies: RightsType;
    /** Объект прав доступа к задачам */
    tasks: RightsType;
    /** Доступ к функционалу почты */
    mail_access: boolean;
    /** Доступ к функционалу списков */
    catalog_access: boolean;
    /** Является ли пользователь администратором */
    is_admin: boolean;
    /** Является ли пользователь бесплатным */
    is_free: boolean;
    /** Является ли пользователь активным */
    is_active: boolean;
    /** ID группы, к которой относится пользователь */
    group_id: number | null;
    /** ID роли, которая установлена у пользователя */
    role_id: number | null;
    /** Массив из объектов, которые описывают права на статусы */
    status_rights: {
      /** Тип сущности. В данный момент поддерживаются только сделки */
      entity_type: string;
      /** ID воронки, в которой находится статус */
      pipeline_id: number;
      /** ID статуса */
      status_id: number;
      /** Объект прав */
      rights: RightsType;
    }[];
  };
};

export type RightsValue = "A" | "G" | "M" | "D";
export type RightsType = {
  add: RightsValue;
  edit: RightsValue;
  view: RightsValue;
  delete: RightsValue;
  export: RightsValue;
};

export type Role = {
  /** ID роли */
  id: number;
  /** Название роли */
  name: string;
  /** Права пользователя */
  rights: {
    /** Объект прав доступа к сделкам */
    leads: RightsValue;
    /** Объект прав доступа к контактам */
    contacts: RightsValue;
    /** Объект прав доступа к компаниям */
    companies: RightsValue;
    /** Объект прав доступа к задачам */
    tasks: RightsValue;
    /** Доступ к функционалу почты */
    mail_access: boolean;
    /** Доступ к функционалу списков */
    catalog_access: boolean;
    /** Является ли пользователь администратором */
    is_admin: boolean;
    /** Является ли пользователь бесплатным */
    is_free: boolean;
    /** Является ли пользователь активным */
    is_active: boolean;
    /** ID группы, к которой относится пользователь */
    group_id: number | null;
    /** ID роли, которая установлена у пользователя */
    role_id: number | null;
    /** Массив из объектов, которые описывают права на статусы */
    status_rights: {
      /** Тип сущности. В данный момент поддерживаются только сделки */
      entity_type: string;
      /** ID воронки, в которой находится статус */
      pipeline_id: number;
      /** ID статуса */
      status_id: number;
      /** Объект прав */
      rights: RightsValue;
    }[];
  };
};

export type Webhook = {
  /** ID вебхука */
  id: number;
  /** ID пользователя, создавшего вебхук */
  created_by: number;
  /** Дата создания вебхука, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения вебхука, передается в Unix Timestamp */
  updated_at: number;
  /** Сортировка вебхука */
  sort: number;
  /** Отключен ли вебхук */
  disabled: boolean;
  /** Валидный URL на который необходимо присылать уведомления */
  destination: string;
  /** Действия, на которые подписан вебхук. Список доступных действий смотрите тут */
  settings: WebhookType[];
};

export type WebhookType =
  /** У сделки сменился ответственный */
  | "responsible_lead"
  /** У контакта сменился ответственный */
  | "responsible_contact"
  /** У компании сменился ответственный */
  | "responsible_company"
  /** У покупателя сменился ответственный */
  | "responsible_customer"
  /** У задачи сменился ответственный */
  | "responsible_task"
  /** Сделка восстановлена из удаленных */
  | "restore_lead"
  /** Контакт восстановлен из удаленных */
  | "restore_contact"
  /** Компания восстановлена из удаленных */
  | "restore_company"
  /** Добавлена сделка */
  | "add_lead"
  /** Добавлен контакт */
  | "add_contact"
  /** Добавлена компания */
  | "add_company"
  /** Добавлен покупатель */
  | "add_customer"
  /** Добавлена беседа */
  | "add_talk"
  /** Добавлена задача */
  | "add_task"
  /** Сделка изменена */
  | "update_lead"
  /** Контакт изменён */
  | "update_contact"
  /** Компания изменена */
  | "update_company"
  /** Покупатель изменен */
  | "update_customer"
  /** Беседа изменена */
  | "update_talk"
  /** Задача изменена */
  | "update_task"
  /** Удалена сделка */
  | "delete_lead"
  /** Удалён контакт */
  | "delete_contact"
  /** Удалена компания */
  | "delete_company"
  /** Удален покупатель */
  | "delete_customer"
  /** Удалена задача */
  | "delete_task"
  /** У сделки сменился статус */
  | "status_lead"
  /** У сделки сменился ответсвенный */
  | "responsible_lead"
  /** Примечание добавлено в сделку */
  | "note_lead"
  /** Примечание добавлено в контакт */
  | "note_contact"
  /** Примечание добавлено в компанию */
  | "note_company"
  /** Примечание добавлено в покупателя */
  | "note_customer";

export type Widget = {
  /** ID виджета */
  id: number;
  /** Код виджета */
  code: string;
  /** Версия виджета */
  version: string;
  /** Рейтинг виджета */
  rating: string | number;
  /** Поля доступные для настройки */
  settings_template: {
    /** Ключ значения поля в настройках виджета */
    key: string;
    /** Название поля в настройках виджета */
    name: string;
    /** Тип данных в настройках виджета (text, pass, custom, users или users_lp) */
    type: string;
    /** Является ли настройка обязательной */
    is_required: boolean;
  }[];
  /** Доступен ли виджет в качестве источника сделок */
  is_lead_source: boolean;
  /** Доступен ли виджет в Digital Pipeline */
  is_work_with_dp: boolean;
  /** Является ли виджет отраслевым решением */
  is_crm_template: boolean;
  /** UUID связанной с виджетом oAuth интеграции */
  client_uuid: string | null;
  /** Установлен ли виджет в аккаунте */
  is_active_in_account: boolean;
  /** ID воронки, в котором виджет установлен, как источник сделок */
  pipeline_id: number | null;
};

export type Call = {
  /** Направление звонка. inbound – входящий, outbound – исходящий. Обязательный параметр */
  direction: "inbound" | "outbound";
  /** Уникальный идентификатор звонка. Необязательный параметр */
  uniq: string;
  /** Длительность звонка в секундах. Обязательный параметр */
  duration: number;
  /** Источник звонка. Обязательный параметр */
  source: string;
  /** Ссылка на запись звонка. Необязательный параметр */
  link: string;
  /** Номер телефона, по которому будет произведен поиск. Обязательный параметр */
  phone: string;
  /** Для водящего – Кому сделан звонок. Для исходящего – кто сделал звонок. Можно передавать ID пользователя amoCRM, номер телефона или имя. */
  call_responsible: string | number | null;
  /** Результат звонка. Необязательный параметр */
  call_result: string;
  /** Статус звонка. Доступные варианты: 1 – оставил сообщение, 2 – перезвонить позже, 3 – нет на месте, 4 – разговор состоялся, 5 – неверный номер, 6 – Не дозвонился, 7 – номер занят. Необязательный параметр */
  call_status?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** ID пользователя, ответственного за звонок */
  responsible_user_id: number;
  /** ID пользователя, создавший звонок, используется если не передан call_responsible */
  created_by: number;
  /** ID пользователя, изменивший звонок */
  updated_by: number;
  /** Дата создания звонка, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения звонка, передается в Unix Timestamp */
  updated_at: number;
};

export type Talk = {
  /** ID беседы */
  talk_id: number;
  /** Дата создания беседы, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения беседы, передается в Unix Timestamp */
  updated_at: number;
  /** Оценка беседы клиентом, выставляется в результате работы NPS-бота */
  rate: number;
  /** ID контакта, к которому принадлежит беседа */
  contact_id: number;
  /** ID чата, к которому принадлежит беседа */
  chat_id: string;
  /** ID сущности, по которой ведется беседа */
  entity_id: number | null;
  /** Тип сущности, по которой ведется беседа (lead, customer) */
  entity_type: "lead" | "customer" | null;
  /** В работе ли беседа (не закрыта) */
  is_in_work: boolean;
  /** Прочитана ли беседа */
  is_read: boolean;
  /** Тип источника, по которому была создана беседа (telegram, viber, и т.д.) */
  origin: string;
  /** Дата когда беседа была пропущена (не отвечена за время, установленное в настройках аккаунта), передается в Unix Timestamp */
  missed_at: number | null;
  /** ID аккаунта */
  account_id: number;
};

export type Source = {
  /** ID источника */
  id: number;
  /** Название источника */
  name: string;
  /** ID воронки, воронка может быть архивной */
  pipeline_id: number;
  /** Внешний идентификатор источника на стороне интеграции */
  external_id: string;
  /** Является ли данный источник источником по-умолчанию. Поле не является обязательным */
  default: boolean;
  /** Код основного канала источника. Данный канал чата будет использоваться при инициализации общения. Поле не является обязательным. */
  origin_code: string | null;
  /** Массив сервисов которые связаны с источником. На данный момент поддерживается только whatsapp. Данные из этого массива используются для отображения в CRM Plugin (кнопки на сайт). Поле не является обязательным. */
  services: {
    /** тип сервиса, на данный момент поддерживается только один тип: "whatsapp" */
    type: string;
    /** Для whatsapp сервиса содержит список элементов, которые можно выбрать при настройке CRM Plugin (кнопки на сайт) */
    pages: {
      /** Отображаемое пользователю название пункта в выпадающем списке при настройке кнопки на сайте */
      name: string;
      /** Идентификатор пункта в выпадающем списке (не отображается клиенту и пользователю) */
      id: string;
      /** Номер телефона, который будет указан в кнопке whatsapp и которому будет писать клиент на странице сайта. В CRM Plugin ссылка будет сформирована следующим образов: https://wa.me/{Указанный номер телефона} */
      link: string;
    }[];
  }[];
};

export type ShortLink = {
  /** Адрес страницы. Обязательный параметр */
  url: string;
  /** Метаданные для генерации короткой ссылки. Обязательный параметр */
  metadata: {
    /** Тип сущности, на данный момент значение может быть только contacts. Обязательный параметр */
    entity_type: "contacts";
    /** ID сущности. Обязательный параметр */
    entity_id: number;
  };
};

export type ChatTemplate = {
  /** ID шаблона */
  id: number;
  /** ID аккаунта, которому принадлежит шаблон */
  account_id: number;
  /** Название шаблона */
  name: string;
  /** Тело шаблона, сообщение, которое отправляется пользователю */
  content: string;
  /** Может ли пользователь редактировать шаблон в интерфейсе amoCRM */
  is_editable: boolean;
  /** Массив объектов кнопок */
  buttons: {
    /** Тип кнопки, доступные варианты: inline (обычная текстовая кнопка), url (кнопка ссылка) */
    type: "inline" | "url";
    /** Текст, отображаемый в кнопке */
    text: string;
    /** Ссылка кнопки, доступно только для кнопки типа url */
    url: string;
  }[];
  /** Объект добавленного файла в шаблон */
  attachment: {
    /** UUID файла, прикрепленного к шаблону */
    id: string;
    /** Название файла, прикрепленного к шаблону, которое будет передано в мессенджер */
    name: string;
    /** Тип прикрепленного файла. Возможные типы – picture, file, document, video */
    type: "picture" | "file" | "document" | "document";
    /** Показатель, что файл из сервиса файлов. Для всех шаблонов добавляемых с весны 2022 – true */
    is_external: boolean;
  } | null;
  /** Timestamp создания шаблона */
  created_at: number;
  /** Timestamp последнего изменения шаблона */
  updated_at: number;
  /** Внешний идентификатор шаблона. ID шаблона в вашей системе */
  external_id: string;
};

export type SalesBotTask = {
  /** Id бота, которого нужно запустить */
  bot_id: number;
  /** Id сущности к которой привязан контакт с чатом или самого контакта с чатом. */
  entity_id: number;
  /** Тип сущности, id которой передали. 1 - контакт, 2 - сделка */
  entity_type: number;
};

export type File = {
  /** UUID файла */
  uuid: string;
  /** Тип файла. Возможные параметры – image, video, audio, document, file */
  type: string;
  /** Удален ли файл */
  is_trashed: boolean;
  /** Имя файла */
  name: string;
  /** Имя файла в ASCII кодировке */
  sanitized_name: string;
  /** Размер файла в байтах */
  size: number;
  /** Идентификатор источника из которого пришел файл */
  source_id: number | null;
  /** Идентификатор версии файла */
  version_uuid: string;
  /** Имеет ли файл множество версий */
  has_multiple_versions: boolean;
  /** Время создания файла Unix Timestamp */
  created_at: number;
  /** Пользователь создавший файл */
  created_by: {
    /** ID пользователя создавшего файла */
    id: number;
    /** Тип пользователя создавшего файла */
    type: string;
  };
  /** Время последнего обновления файла Unix Timestamp */
  updated_at: number;
  /** Пользователь обновивший файл */
  updated_by: {
    /** ID пользователя создавшего файла */
    id: number;
    /** Тип пользователя создавшего файла */
    type: string;
  };
  /** Время удаления файла Unix Timestamp */
  deleted_at: number | null;
  /** Пользователь удаливший файл */
  deleted_by: null;
  /** Метаданные файла */
  metadata: {
    /** Расширение файла */
    extension: string;
    /** MIME-тип файла */
    mime_type: string;
  } | null;
  /** Массив превью для файла */
  previews: {
    /** Превью файла */
    /** URL для загрузки превью */
    download_link: string;
    /** Ширина превью */
    width: number;
    /** Высота превью */
    height: number;
  }[] | null;
};

export type Message = {
  id: string;
  chat_id: string;
  talk_id: number;
  contact_id: number;
  text: string;
  created_at: number;
  element_type: number;
  entity_type: string;
  element_id: number;
  entity_id: number;
  type: string;
  author: {
    id: string;
    type: string;
    name: string;
    avatar_url: string;
  };
  avito: string;
};
