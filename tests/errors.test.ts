import test from "node:test";
import assert from "node:assert/strict";

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

const amo = new Amo("mydomain.amocrm.ru", { ...auth, ...token }, {
  on_token: (new_token) => console.log("New token obtained", new_token),
});

test("should return HttpError", async (t) => {
  t.mock.method(global, "fetch", () => {
    return new Response(`Error`, { status: 404 });
  });

  try {
    await amo.account.getAccount();
    assert.fail("Expected error was not thrown");
  } catch (err) {
    assert.ok(err instanceof HttpError, "Error should be instance of HttpError");
  }

  await sleep(1200);
});

test("should return NoContentError", async (t) => {
  t.mock.method(global, "fetch", () => {
    return new Response(null, { status: 204 });
  });

  try {
    await amo.lead.getLeadById(69);
    assert.fail("Expected error was not thrown");
  } catch (err) {
    assert.ok(err instanceof NoContentError, "Error should be instance of NoContentError");
  }

  await sleep(1200);
});

test("should return ApiError", async (t) => {
  t.mock.method(global, "fetch", () => {
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
    assert.fail("Expected error was not thrown");
  } catch (err) {
    assert.ok(err instanceof ApiError, "Error should be instance of ApiError");
    assert.deepStrictEqual(err.response, {
      title: "Unauthorized",
      type: "https://httpstatus.es/401",
      status: 401,
      detail: "Неверный логин или пароль",
    });
  }

  await sleep(1200);
});

test("should return WebhookError", async () => {
  try {
    await amo.webhookHandler()(
      new Request("https://fakeurl.com/", {
        method: "POST",
        body: "<NotParsable Json>",
      }),
    );
    assert.fail("Expected error was not thrown");
  } catch (err) {
    assert.ok(err instanceof WebhookError, "Error should be instance of WebhookError");
  }

  await sleep(1200);
});

test("should return AuthError", async (t) => {
  t.mock.method(global, "fetch", () => {
    return new Response(null, { status: 403 });
  });

  const localAmo = new Amo("mydomain.amocrm.ru", { ...auth, ...token, expires_at: 0 }, {
    on_token: (new_token) => console.log("New token obtained", new_token),
  });

  try {
    await localAmo.lead.getLeadById(69);
    assert.fail("Expected error was not thrown");
  } catch (err) {
    assert.ok(err instanceof AuthError, "Error should be instance of AuthError");
  }

  await sleep(1200);
});

test("should return AuthError to error handler", async (t) => {
  t.mock.method(global, "fetch", () => {
    return new Response(null, { status: 403 });
  });

  const localAmo = new Amo("mydomain.amocrm.ru", { ...auth, ...token, expires_at: 0 }, {
    on_token: (new_token) => console.log("New token obtained", new_token),
    on_error: (err) => assert.ok(err instanceof AuthError, "Error should be instance of AuthError"),
  });

  await localAmo.lead.getLeadById(69);

  await sleep(1200);
});
