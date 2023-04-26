import type { Company, Contact, Customer, File, Lead } from "@typings/entities.ts";
import type { Count, Links } from "@typings/utility.ts";

export type RequestCreateSession = {
  file_name: string;
  file_size: number;
  file_uuid?: string;
  content_type: string;
  with_preview: boolean;
};

export type ResponseCreateSession = {
  session_id: number;
  upload_url: string;
  max_file_size: number;
  max_part_size: number;
};

export type ResponseUploadFileChunk = {
  session_id: number;
  next_url: string;
};

export type ResponseUploadFileLastChunk = File & {
  _links: {
    download: { href: string };
    download_version: { href: string };
    self: { href: string };
  };
};

export type ResponseGetFiles = Count & Links & {
  _embedded: {
    files: ResponseGetFileByUUID[];
  };
};

export type ResponseGetFileByUUID = ResponseUploadFileLastChunk;
export type RequestUpdateFile = Partial<Pick<File, "name" | "version_uuid">>;
export type ResponseUpdateFile = ResponseGetFileByUUID;
export type RequestDeleteFile = Pick<File, "uuid">;
export type RequestRestoreFile = RequestDeleteFile;
export type ResponseRestoreFiles = ResponseGetFiles;
export type ResponseGetFileVersionByUUID = Count & Links & {
  _embedded: {
    versions: (File & {
      file_uuid: string;
      _links: {
        download: { href: string };
        self: { href: string };
      };
    })[];
  };
};

export type ResponseGetEntityFiles = Links & {
  _embedded: {
    files: {
      file_uuid: string;
      id: number;
    };
  };
};

export type RequestLinkEntityFile = { file_uuid: string };
export type RequestUnlinkEntityFile = RequestLinkEntityFile;
export type ResponseGetFileEntities = {
  file_uuid: string;
  entities: (Lead | Customer | Contact | Company)[];
};
