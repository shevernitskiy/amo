import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import { Amo } from "../src/amo.ts";

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

const test_task = {
  task: {
    update: [
      {
        id: 11122233,
        element_id: 33322211,
        element_type: 2,
        task_type: 1,
        date_create: "2017-07-20 15:00:00",
        text: "Follow-up",
        status: 1,
        account_id: 77711122,
        created_user_id: 123123,
        last_modified: "2017-07-21 19:00:00",
        responsible_user_id: 123123,
        complete_till: "2017-07-22 23:59:00",
        action_close: 1,
        result: {
          id: 155155155,
          text: "Success",
        },
      },
    ],
  },
  account: {
    subdomain: "test",
  },
};

Deno.test("webhook should work properly", async () => {
  const amo = new Amo("mydomain", { ...auth, ...token }, {
    on_token: (new_token) => console.log("New token obtained", new_token),
  });

  amo.on("task:update", (task) => {
    assertEquals(
      test_task.task.update[0].id,
      task.id,
    );
    assertEquals(
      test_task.task.update[0].text,
      task.text,
    );
  });

  const serve_close = new AbortController();

  Deno.serve({
    signal: serve_close.signal,
    port: 4545,
  }, amo.webhookHandler());

  const res = await fetch("http://localhost:4545/", {
    method: "POST",
    body: JSON.stringify(test_task),
  });

  assertEquals(res.status, 200);
  assertEquals(await res.text(), "OK");

  serve_close.abort();
});
