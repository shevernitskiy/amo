import * as mf from "https://deno.land/x/mock_fetch@0.3.0/mod.ts";
import { assertEquals, assertInstanceOf } from "https://deno.land/std@0.184.0/testing/asserts.ts";

import { Amo } from "../src/amo.ts";
import { ApiError, AuthError, HttpError, NoContentError, WebhookError } from "../mod.ts";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const auth = {
  client_id: "xxx",
  client_secret: "yyy",
  redirect_uri: "https://fakeurl.com/",
} as const;

const token = {
  token_type: "Bearer",
  expires_in: 86400,
  access_token: "token",
  refresh_token: "token",
  expires_at: 9992689469610,
} as const;

mf.install();

const amo = new Amo("mydomain.amocrm.ru", { ...auth, ...token }, {
  on_token: (new_token) => console.log("New token obtained", new_token),
});

Deno.test("should return HttpError", async () => {
  mf.mock("GET@/api/v4/account", (_req, _params) => {
    return new Response(`Error`, { status: 404 });
  });

  try {
    await amo.account.getAccount();
  } catch (err) {
    assertInstanceOf(err, HttpError);
  }

  await sleep(200);
});

Deno.test("should return NoContentError", async () => {
  mf.mock("GET@/api/v4/leads/69", () => {
    return new Response(null, { status: 204 });
  });

  try {
    await amo.lead.getLeadById(69);
  } catch (err) {
    assertInstanceOf(err, NoContentError);
  }

  await sleep(200);
});

Deno.test("should return ApiError", async () => {
  mf.mock("GET@/api/v4/leads/69", () => {
    return new Response(
      JSON.stringify({
        title: "Unauthorized",
        type: "https://httpstatus.es/401",
        status: 401,
        detail: "Неверный логин или пароль",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/problem+json",
        },
      },
    );
  });

  try {
    await amo.lead.getLeadById(69);
  } catch (err) {
    assertInstanceOf(err, ApiError);
    assertEquals(err.response, {
      title: "Unauthorized",
      type: "https://httpstatus.es/401",
      status: 401,
      detail: "Неверный логин или пароль",
    });
  }

  await sleep(200);
});

Deno.test("should return WebhookError", async () => {
  try {
    await amo.webhookHandler()(
      new Request("https://fakeurl.com/", {
        method: "POST",
        body: "<NotParsable Json>",
      }),
    );
  } catch (err) {
    assertInstanceOf(err, WebhookError);
  }

  await sleep(200);
});

Deno.test("should return AuthError", async () => {
  mf.mock("POST@/oauth2/access_token", () => {
    return new Response(null, { status: 403 });
  });

  const amo = new Amo("mydomain.amocrm.ru", { ...auth, ...token, expires_at: 0 }, {
    on_token: (new_token) => console.log("New token obtained", new_token),
  });

  try {
    await amo.lead.getLeadById(69);
  } catch (err) {
    assertInstanceOf(err, AuthError);
  }

  await sleep(200);
});
