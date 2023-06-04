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
