# ♿amoCRM API client

[![npm](https://img.shields.io/npm/v/@shevernitskiy/amo?logo=npm&style=flat&labelColor=000)](https://www.npmjs.com/package/@shevernitskiy/amo)
[![deno module](https://shield.deno.dev/x/amo)](https://deno.land/x/amo/mod.ts)
![dependencies](https://img.shields.io/badge/dependencies-0-green?style=flat&labelColor=000)
[![license](https://img.shields.io/github/license/shevernitskiy/amo?style=flat&labelColor=000)](https://github.com/shevernitskiy/amo/blob/main/LICENSE)

This is a simple wrapper client for the amoCRM REST API. It covers almost all API modules and endpoints. Also, it
manages to token refreshing and webhook handling.

> ⚠️Due to awful API [documentation](https://www.amocrm.ru/developers/content/crm_platform/api-reference) with tons of
> mistakes, inaccuracies, examples mismatch and wrong types, lib may provide wrong typing (pls consider to make a PR or
> issue at least).

## Progress

- ### Lib
  - [x] NPM & Node support
  - [x] examples (not so much)
  - [x] maybe some test (webhook atm)
  - [x] readme (draft)
- ### API
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
  - [x] Salesbot (api method)
  - [x] Short Links
  - [x] Chat Templates
  - [x] Files
  - [ ] Chats
- ### Helpers
  - [x] Filter builder
  - [x] Webhook handling
  - [x] Error handling
  - [ ] Salesbot interactions

# Usage

## Installation

<img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/nodejs.svg"> Node.JS
(versions >=18 are supported because of Fetch API)

```powershell
npm i @shevernitskiy/amo
```

<img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/deno.svg"> Deno

```ts
import { Amo } from "https://deno.land/x/amo/mod.ts";
```

---

## Basic example

Here is the basic usage scenario. We use previously saved token object here (cause it valid for a long time, so we do
not need to refresh it often). More [examples](https://github.com/shevernitskiy/amo/tree/main/examples).

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

To create a client instance, you should provide 2 or 3 args to the constructor:

- API domain
- auth data (may be different)
- options (optionally)

```ts
const amo = new Amo("mydomain.amocrm.ru", auth_object, options_object);
```

### Options

#### Request queue

Amo backend limits you to _7 reqs/sec_, so the client can manage with it by performing requests concurrently or
sequently with delay. By default, lib performs requests concurrently (_7reqs/1000ms_ by default). To setup you own
concurrency params use:

- `concurrent_request: number` - size of concurrent pool
- `concurrent_timeframe: number` - timeframe for concurrent pool (ms)

If you want to use sequential requests, set `request_delay` option param:

- `request_delay: number` (ms) - you can set it to zero, if you want to perform requests as it is

#### Callbacks

- `on_token?: (new_token: OAuth) => void | Promise<void>` - callback, that will be called on _new token_ event (during
  receiving from a code or refreshing). Lib manages the auth/token stuff for you, but it is strongly recommended to
  store the new token persistently somewhere you want (fs, db) to provide it on the next app start.
- `on_error?: (error: Error) => void | Promise<void>;` - default error handler. If provided, it will be called instead
  of throwing errors. Request lifycycle will not be interrupted and you receive `null` as a response.

---

## Authorization

The client can authorize you by both methods: auth code and token data. Also, it refreshes the token automatically on
expiration.

### Auth by code

Usually, this method is used just once while a fresh app is registered. You provide the code and get the token data.

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
})
```

### Auth by existing token

This method is used every time after the first authorization by code. The API does not provide the property
`expires_at`, but lib returns it in `on_token` callback value.

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
})
```

---

## Making requests

The client provides methods by API category. Each category reflects the docs structure (not endpoints, actually - this
is one of the strange api architecture things). Here is the schema for calling a method in some category:

```ts
client_instance.category.method(...)
```

So the real world example will:

```ts
const lead = await amo.lead.getLeadById(6969);
```

### Parameters

Some methods can receive typical request parameters: _order, with, page, limit_ and _filter_

#### With

Can take array of strings.

```ts
with: ["drive_url", "amojo_id", "amojo_rights", "datetime_settings"]
```

#### Order

Can take the object.

```ts
order: { param: "id", type: "asc" }
```

#### Filter

Filter is a complex parameter that depends on the method. Lib provides a filter builder to construct filter queries
depending on the method. Each filter can take different types of input conditions: single (property = value), multi
(property = array of values), range (property = from-to), custom fields* , statuses* (*only for leads as I know?). To
use the filter builder depending on the constraits of the API method, you should pass the callback that receives filter
instance and return it with your params. The instance will be typed, and you will not be able to set the value if it
does not satisfy the method constraints (type of the value will be `never`).

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

The client could handle incoming webhook and acting as event emitter, wich emits typed context to the listener callback
depending on the event. To use this possibility, the client provides a typical handler that you could setup to handle
incoming http requests.

Handler signature is (maybe i'll add _(req, res)_ type for express enojyers later):

```ts
((request: Request) => Promise<Response>);
```

Webhook handling example. Remember that `webhookHandler()` is a function factory, create handler just once and then use
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

`ApiError` and `AuthError` has additional property response with API error message.

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

Also you could use default non-intercepted error handler passed with the `options` to client constructor:

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

Pull request, issues and feedback are very welcome. Code style is formatted with deno fmt.

# License

Copyright 2023, shevernitskiy. MIT license.
