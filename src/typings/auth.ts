export type OAuth = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  expires_at: number;
};

export type OAuthRefresh = {
  client_id: string;
  client_secret: string;
  grant_type: "refresh_token";
  refresh_token: string;
  redirect_uri: string;
};

export type OAuthCode = {
  client_id: string;
  client_secret: string;
  grant_type: "authorization_code";
  code: string;
  redirect_uri: string;
};
