import { readFileSync, writeFileSync } from "node:fs";
import { Amo, ApiError, AuthError } from "@shevernitskiy/amo";

try {
  const auth = {
    client_id: "1111-2222-3333",
    client_secret: "myclientsecret",
    redirect_uri: "https://myredirect.org",
  };

  const token = JSON.parse(readFileSync("./token.json", "utf-8"));

  const amo = new Amo("mydomain", { ...auth, ...token }, {
    on_token: (new_token) => {
      console.log("New token obtained", new_token);
      writeFileSync("./token.json", JSON.stringify(new_token, null, 2), "utf8");
    },
  });

  const lead = await amo.lead.addLeads({
    name: "Test Lead",
  });
  console.log(lead);

  const updated_lead = await amo.lead.updateLeads([{
    id: lead._embedded.leads[0].id,
    name: "Not, I want another Test Lead",
  }]);
  console.log(updated_lead);
} catch (err) {
  if (err instanceof ApiError || err instanceof AuthError) {
    console.error(err.response);
  } else {
    console.error(err);
  }
}
