# ♿ amoCRM API client

[![npm](https://img.shields.io/npm/v/@shevernitskiy/amo?logo=npm&style=flat&labelColor=000)](https://www.npmjs.com/package/@shevernitskiy/amo)
[![deno module](https://shield.deno.dev/x/amo)](https://deno.land/x/amo/mod.ts)
[![JSR](https://jsr.io/badges/@shevernitskiy/amo)](https://jsr.io/@shevernitskiy/amo)
![dependencies](https://img.shields.io/badge/dependencies-0-green?style=flat&labelColor=000)
[![license](https://img.shields.io/github/license/shevernitskiy/amo?style=flat&labelColor=000)](https://github.com/shevernitskiy/amo/blob/main/LICENSE)

A simple wrapper client for the amoCRM REST API. It covers almost all API modules and endpoints, and handles token
refreshing and webhook processing.

> [!NOTE]
> Due to the poor API [documentation](https://www.amocrm.ru/developers/content/crm_platform/api-reference) with many
> mistakes, inaccuracies, mismatched examples, and incorrect types, this library may provide incorrect typings. Please
> consider submitting a PR or creating an issue.

## Progress

### Library

- [x] NPM & Node support
- [x] Examples
- [x] Tests (webhook at the moment)
- [x] README

### API

- [x] Account
- [x] Leads
- [x] Unsorted
- [x] Pipelines and Stages
- [x] Contacts
- [x] Companies
- [x] Catalogs
- [x] Products
- [x] Links
- [x] Tasks
- [x] Custom Fields
- [x] Tags
- [x] Events
- [x] Notes
- [x] Customers
- [x] Statuses
- [x] Segments
- [x] Users
- [x] Webhooks
- [x] Widgets
- [x] Calls
- [x] Talks
- [x] Sources
- [x] Salesbot (API method)
- [x] Short Links
- [x] Chat Templates
- [x] Files
- [ ] Chats

### Helpers

- [x] Filter builder
- [x] Webhook handling
- [x] Error handling
- [ ] Salesbot interactions

# Usage

## Installation

<img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/nodejs.svg"> Node.js
(versions >=18 are supported due to Fetch API)

```powershell
npm i @shevernitskiy/amo
```

<img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/deno.svg"> Deno

```ts
import { Amo } from "https://deno.land/x/amo/mod.ts";
```

---

## Basic example

Here's a basic usage scenario. We use a previously saved token object here (since it's valid for a long time, we don't
need to refresh it often). More [examples](https://github.com/shevernitskiy/amo/tree/main/examples) are available.

```ts
import { readFileSync, writeFileSync } from "node:fs";
import { Amo, ApiError, AuthError } from "@shevernitskiy/amo";

try {
  const auth = {
    client_id: "1111-2222-3333",
    client_secret: "myclientsecret",
    redirect_uri: "https://myredirect.org",
  };

  const token = JSON.parse(readFileSync("./token.json", "utf-8"));

  const amo = new Amo("mydomain.amocrm.ru", { ...auth, ...token }, {
    on_token: (new_token) => {
      console.log("New token obtained", new_token);
      writeFileSync("./token.json", JSON.stringify(new_token, null, 2), "utf8");
    },
  });

  const data = await amo.account.getAccount({
    with: ["amojo_id"],
  });

  console.log(data);
} catch (err) {
  if (err instanceof ApiError || err instanceof AuthError) {
    console.error(err.response);
  } else {
    console.error(err);
  }
}
```

---

## Creating client instance

To create a client instance, provide 2 or 3 arguments to the constructor:

- API domain
- Auth data (varies by method)
- Options (optional)

```ts
const amo = new Amo("mydomain.amocrm.ru", auth_object, options_object);
```

### Options

#### Request queue

The amoCRM backend limits you to _7 requests per second_. The client can handle this by performing requests concurrently
or sequentially with delays. By default, the library performs requests concurrently (_7 requests per 1000ms_). To set up
your own concurrency parameters:

- `concurrent_request: number` - size of the concurrent pool
- `concurrent_timeframe: number` - timeframe for the concurrent pool (in ms)

If you want to use sequential requests, set the `request_delay` option parameter:

- `request_delay: number` (in ms) - you can set it to zero if you want to perform requests as-is

#### Callbacks

- `on_token?: (new_token: OAuth) => void | Promise<void>` - callback that will be called on a _new token_ event (when
  receiving from a code or refreshing). The library manages auth and token processing for you, but it's strongly
  recommended to store the new token persistently (fs, db) to provide it on the next app start.

- `on_error?: (error: Error) => void | Promise<void>;` - default error handler. If provided, it will be called instead
  of throwing errors. The request lifecycle will not be interrupted and you'll receive `null` as a response.

---

## Authorization

The client supports both authorization methods: auth code and token data. It also automatically refreshes the token upon
expiration.

### Auth by code

This method is typically used once when a fresh app is registered. You provide the code and receive the token data.

```ts
const amo = new Amo("mydomain.amocrm.ru", {
    client_id: "1111-2222-3333",
    client_secret: "myclientsecret",
    grant_type: "authorization_code",
    code: "supersecretcode",
    redirect_uri: "https://myredirect.org"
  }, {
    on_token: (new_token) => console.log("New token obtained", new_token);
  },
)
```

### Auth by existing token

This method is used every time after the first authorization by code. The API doesn't provide the `expires_at` property,
but the library returns it in the `on_token` callback value. If you're using a long-lived dev token, just keep
`expires_at` blank.

```ts
const amo = new Amo("mydomain.amocrm.ru", {
    client_id: "1111-2222-3333",
    client_secret: "myclientsecret",
    redirect_uri: "https://myredirect.org",
    token_type: "Bearer",
    expires_in: 86400,
    access_token: "megatoken",
    refresh_token: "antohermegatoken",
    expires_at: 1682573043856
  }, {
    on_token: (new_token) => console.log("New token obtained", new_token);
  },
)
```

---

## Making requests

The client provides methods by API category. Each category reflects the docs structure (not endpoints). Here's the
schema for calling a method:

```ts
client_instance.category.method(...)
```

A real-world example:

```ts
const lead = await amo.lead.getLeadById(6969);
```

### Parameters

Some methods can receive typical request parameters: _order, with, page, limit_, and _filter_

#### With

Accepts an array of strings.

```ts
with: ["drive_url", "amojo_id", "amojo_rights", "datetime_settings"]
```

#### Order

Accepts an object.

```ts
order: { param: "id", type: "asc" }
```

#### Filter

Filter is a complex parameter that depends on the method. The library provides a filter builder to construct filter
queries based on method constraints. Each filter can accept different input condition types: single (property = value),
multi (property = array of values), range (property = from-to), custom fields*, and statuses* (*only for leads, as far
as I know).

To use the filter builder, pass a callback that receives a filter instance and returns it with your parameters. The
instance is typed, and you won't be able to set a value if it doesn't satisfy the method constraints (the value type
will be `never`).

```ts
filter:
((filter) =>
  filter
    .single("id", 6969)
    .multi("created_by", ["john", "smith"])
    .range("closed_at", 2418124812, 123124712712));
```

---

## Webhooks

The client can handle incoming webhooks and acts as an event emitter, emitting typed context to the listener callback
depending on the event. To use this feature, the client provides a typical handler that you can set up to handle
incoming HTTP requests.

Handler signature (I may add _(req, res)_ type for Express users later):

```ts
((request: Request) => Promise<Response>);
```

Webhook handling example. Remember that `webhookHandler()` is a function factory—create the handler once and then use
it.

```ts
const amo = new Amo("mydomain.amocrm.ru", auth_object, options_object);

amo.on("leads:status", (lead) => console.log(lead.id));

const handler = amo.webhookHandler();
Deno.serve({ port: 4545 }, handler);
```

---

## Error handling

The client throws several types of errors:

- `ApiError`
- `AuthError`
- `HttpError`
- `NoContentError`
- `WebhookError`

`ApiError` and `AuthError` have an additional `response` property with the API error message.

Handling is simple:

```ts
try {
  const amo = new Amo("mydomain.amocrm.ru", auth_object, options_object);
  const lead = amo.lead.getLeadById(6969);
} catch (err) {
  if (err instanceof AuthError) {
    console.error("AuthError", err.response);
  } else if (err instanceof ApiError) {
    console.error("ApiError", err.response);
  } else if (err instanceof NoContentError) {
    console.error("NoContentError", err.message);
  } else if (err instanceof HttpError) {
    console.error("HttpError", err.message);
  } else {
    console.error("UnknownError", err);
  }
}
```

You can also use a default non-intercepted error handler passed with the `options` to the client constructor:

```ts
const amo = new Amo("mydomain.amocrm.ru", auth_object, {
  on_error: (err) => console.error("Amo emits error", err);
});
const lead = amo.lead.getLeadById(6969);
if (lead) {
  // do logic
}
```

# Contribution

Pull requests, issues, and feedback are very welcome. Code style is formatted with `deno fmt`.

# License

Copyright 2023, shevernitskiy. MIT license.
