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
};

export type Lead = {
  /** ID сделки */
  id: number;
  /** Название сделки */
  name: string;
  /** Бюджет сделки */
  price: number;
  /** ID пользователя, ответственного за сделку */
  responsible_user_id: number;
  /** ID группы, в которой состоит ответственны пользователь за сделку */
  group_id: number;
  /** ID статуса, в который добавляется сделка, по-умолчанию – первый этап главной воронки */
  status_id: number;
  /** ID воронки, в которую добавляется сделка */
  pipeline_id: number;
  /** ID причины отказа */
  loss_reason_id: number;
  /** Требуется GET параметр with. ID источника сделки */
  source_id: number;
  /** ID пользователя, создающий сделку */
  created_by: number;
  /** ID пользователя, изменяющий сделку */
  updated_by: number;
  /** Дата закрытия сделки, передается в Unix Timestamp */
  closed_at: number;
  /** Дата создания сделки, передается в Unix Timestamp */
  created_at: number;
  /** Дата изменения сделки, передается в Unix Timestamp */
  updated_at: number;
  /** Дата ближайшей задачи к выполнению, передается в Unix Timestamp */
  closest_task_at: number;
  /** Удалена ли сделка */
  is_deleted: boolean;
  /** Массив, содержащий информацию по значениям дополнительных полей, заданных для данной сделки */
  custom_fields_values: CustomFieldsValue[] | null;
  /** Скоринг сделки */
  score: number | null;
  /** ID аккаунта, в котором находится сделка */
  account_id: number;
  /** Тип поля "стоимость труда"  показывает сколько времени было затрачено на работу со сделкой. Время исчисления в секундах */
  labor_cost: number;
  /** Требуется GET параметр with. Изменен ли в последний раз бюджет сделки роботом */
  is_price_modified_by_robot: boolean;
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

type Task = {
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

type CustomFieldsValue = {
  /** ID поля */
  id: number;
  /** Название поля */
  name: string;
  /** Код поля, по-которому можно обновлять значение в сущности, без передачи ID поля */
  code: string;
  /** Сортировка поля */
  sort: number;
  /** Тип поля. Список доступных полей */
  type: string;
  /** Тип сущности (leads, contacts, companies, segments, customers, catalogs) */
  entity_type: string;
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
  remind: string | null;
  /** Код валюты поля. Применимо только для типа поля – monetary. Для других типов полей – null. */
  currency: string | null;
  /** Доступные значения для поля. Значение данного поля доступно только для полей с поддержкой enum */
  enums: {
    /** ID значения */
    id: number;
    /** Значение */
    value: string;
    /** Сортировка значения */
    sort: number;
    /** Символьный код значения */
    code: string | null;
  }[] | null;
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
};

type CustomFieldsValueTypes =
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
  | "file";

type CustomFieldsValueGroup = {
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

enum Color {
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

type EventTypes =
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

type Event = {
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
  value_after: any[];
  /** Массив с изменениями по событию. Подробней о свойствах изменения читайте тут */
  value_before: any[];
  /** ID аккаунта, в котором находится событие */
  account_id: number;
};

type NoteTypes =
  /** Текстовое примечание */
  | "common"
  /** Входящий звонок */
  | "call_in"
  /** Исходящий звонок */
  | "call_out"
  /** Системное сообщение (добавляется интеграциями) */
  | "service_message"
  /** Сообщение кассиру */
  | "message_cashier"
  /** Текстовое примечание с гео-координатами (добавляются мобильным приложением) */
  | "geolocation"
  /** Входящее SMS */
  | "sms_in"
  /** Исходящее SMS */
  | "sms_out"
  /** Расширенное системное сообщение (поддерживает больше текста и сворачивается в интерфейсе) */
  | "extended_service_message"
  /** Примечание с файлом */
  | "attachment";

type Transaction = {
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

type Note = {
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
  note_type: NoteTypes;
  /** Свойства примечания, зависят от типа примечания. Подробней о свойствах читайте тут */
  params: object;
  /** ID аккаунта, в котором находится примечание */
  account_id: number;
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
  closest_task_at: number;
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

export type EntityLink = {
  entity_id: number;
  entity_type: "leads" | "contacts" | "companies" | "customers" | "catalog_elements";
  to_entity_id: number;
  to_entity_type: "leads" | "contacts" | "companies" | "customers" | "catalog_elements";
  metadata:
    | Partial<{
      main_contact: boolean;
      is_main: boolean;
      quantity: number;
      catalog_id: number;
      updated_by: number;
      price_id: number | null;
    }>
    | null;
};

// TODO: what is Condition?
type Status = {
  id: number;
  name: string;
  sort: number;
  is_default: boolean;
  color: string;
  type: number;
  conditions: [];
  account_id: number;
};

type Segment = {
  id: number;
  created_at: number;
  updated_at: number;
  name: string;
  customers_count: number;
  color: string;
  custom_fields_values: CustomFieldsValue[] | null;
  available_products_price_types: number[] | null;
  account_id: number;
};

type User = {
  id: number;
  name: string;
  email: string;
  lang: string;
  rights: {
    leads: RightsType;
    contacts: RightsType;
    companies: RightsType;
    tasks: RightsType;
    mail_access: boolean;
    catalog_access: boolean;
    is_admin: boolean;
    is_free: boolean;
    is_active: boolean;
    group_id: number | null;
    role_id: number | null;
    status_rights: {
      entity_type: string;
      pipeline_id: number;
      status_id: number;
      rights: RightsType;
    }[];
  };
};

type RightsValue = "A" | "G" | "M" | "D";
type RightsType = {
  add: RightsValue;
  edit: RightsValue;
  view: RightsValue;
  delete: RightsValue;
  export: RightsValue;
};

type Role = {
  id: number;
  name: string;
  rights: {
    leads: RightsType;
    contacts: RightsType;
    companies: RightsType;
    tasks: RightsType;
    mail_access: boolean;
    catalog_access: boolean;
    is_admin: boolean;
    is_free: boolean;
    is_active: boolean;
    group_id: number | null;
    role_id: number | null;
    status_rights: {
      entity_type: string;
      pipeline_id: number;
      status_id: number;
      rights: RightsType;
    }[];
  };
};
