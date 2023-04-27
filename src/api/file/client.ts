import type {
  RequestCreateSession,
  RequestDeleteFile,
  RequestLinkEntityFile,
  RequestRestoreFile,
  RequestUnlinkEntityFile,
  RequestUpdateFile,
  ResponseCreateSession,
  ResponseGetEntityFiles,
  ResponseGetFileByUUID,
  ResponseGetFileEntities,
  ResponseGetFiles,
  ResponseGetFileVersionByUUID,
  ResponseRestoreFiles,
  ResponseUpdateFile,
  ResponseUploadFileChunk,
  ResponseUploadFileLastChunk,
} from "./types.ts";
import type { FilterLike } from "../../helpers/filter.ts";
import { query } from "../../helpers/query.ts";
import { RestClient } from "../../core/rest-client.ts";

export class FileApi {
  constructor(private rest: RestClient, private drive_url: string) {}

  /** Метод позволяет создать сессию для загрузки файла или версии файла. Если метод используется для загрузки новой версии файла, то загруженная версия автоматически станет активной версией файла. Запрос должен отправляться на хост сервиса файлов. */
  createSession(params: RequestCreateSession): Promise<ResponseCreateSession> {
    return this.rest.post<ResponseCreateSession>({
      url: "/v1.0/sessions",
      url_base: this.drive_url,
      payload: params,
    });
  }

  /** Метод позволяет загрузить часть файла. Запрос должен отправляться на хост сервиса файлов. Полная ссылка с указанием session_token возвращается при открытии сессии. */
  uploadFileChunk(session_token: string): Promise<ResponseUploadFileChunk | ResponseUploadFileLastChunk> {
    return this.rest.get<ResponseUploadFileChunk | ResponseUploadFileLastChunk>({
      url: `/v1.0/upload/${session_token}`,
      url_base: this.drive_url,
    });
  }

  /** Метод позволяет получить файлы аккаунта удовлетворяющие указанному фильтру. Запрос должен отправляться на хост сервиса файлов. */
  getFiles(params?: {
    filter?: FilterLike<
      ["uuid", "name", "extensions", "term", "source_id", "deleted", ""],
      ["extensions", "created_by", "updated_by"],
      ["size", "date", "updated_at"],
      never,
      never
    >;
  }): Promise<ResponseGetFiles> {
    return this.rest.get<ResponseGetFiles>({
      url: "/v1.0/files",
      url_base: this.drive_url,
      query: query(params),
    });
  }

  /** Метод позволяющий получать файл аккаунта. Запрос должен отправляться на хост сервиса файлов. */
  getFileByUUID(uuid: string): Promise<ResponseGetFileByUUID> {
    return this.rest.get<ResponseGetFileByUUID>({
      url: `/v1.0/files/${uuid}`,
      url_base: this.drive_url,
    });
  }

  /** Метод позволяет редактировать файл. При редактировании файла можно изменить его имя или активную версию. Запрос должен отправляться на хост сервиса файлов. */
  updateFileByUUID(uuid: string, file: RequestUpdateFile): Promise<ResponseUpdateFile> {
    return this.rest.patch<ResponseUpdateFile>({
      url: `/v1.0/files/${uuid}`,
      url_base: this.drive_url,
      payload: file,
    });
  }

  /** Метод позволяет удалить файлы аккаунта. Запрос должен отправляться на хост сервиса файлов. */
  deleteFiles(files: RequestDeleteFile[]): Promise<void> {
    return this.rest.delete<void>({
      url: "/v1.0/files",
      url_base: this.drive_url,
      payload: files,
    });
  }

  /** Метод позволяет восстановить файлы аккаунта. Запрос должен отправляться на хост сервиса файлов. */
  restoreFiles(files: RequestRestoreFile[]): Promise<ResponseRestoreFiles> {
    return this.rest.post<ResponseRestoreFiles>({
      url: "/v1.0/files/restore",
      url_base: this.drive_url,
      payload: files,
    });
  }

  /** Метод позволяющий получать файл аккаунта. Запрос должен отправляться на хост сервиса файлов. */
  getFileVersionByUUID(file_uuid: string): Promise<ResponseGetFileVersionByUUID> {
    return this.rest.get<ResponseGetFileVersionByUUID>({
      url: `/v1.0/files/${file_uuid}/versions`,
      url_base: this.drive_url,
    });
  }

  /** Метод позволяет получить файлы связанные с сущностью. */
  getEntityFiles(
    entity_id: number,
    entity_type: "leads" | "constact" | "companies" | "customers",
    params?: {
      limit?: number;
      before_id?: number;
    },
  ): Promise<ResponseGetEntityFiles> {
    return this.rest.get<ResponseGetEntityFiles>({
      url: `/api/v4/${entity_type}/${entity_id}/files`,
      query: query(params),
    });
  }

  /** Метод позволяет привязывать файл к сущности. */
  linkEntityFiles(
    entity_id: number,
    entity_type: "leads" | "constact" | "companies" | "customers",
    files: RequestLinkEntityFile[],
  ): Promise<void> {
    return this.rest.put<void>({
      url: `/api/v4/${entity_type}/${entity_id}/files`,
      payload: files,
    });
  }

  /** Метод позволяет отвязать файл от сущности. */
  unlinkEntityFiles(
    entity_id: number,
    entity_type: "leads" | "constact" | "companies" | "customers",
    files: RequestUnlinkEntityFile[],
  ): Promise<void> {
    return this.rest.delete<void>({
      url: `/api/v4/${entity_type}/${entity_id}/files`,
      payload: files,
    });
  }

  /** Метод позволяет получить файлы связанные с сущностью. */
  getFileEntities(file_uuid: number): Promise<ResponseGetFileEntities> {
    return this.rest.get<ResponseGetFileEntities>({
      url: `/api/v4/files/${file_uuid}/links`,
    });
  }
}
