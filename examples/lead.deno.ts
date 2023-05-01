import { Amo, ApiError, AuthError } from "https://deno.land/x/amo/mod.ts";

try {
  const auth = {
    client_id: "1111-2222-3333",
    client_secret: "myclientsecret",
    redirect_uri: "https://myredirect.org",
  };

  const token = JSON.parse(Deno.readTextFileSync("./token.json"));

  const amo = new Amo("mydomain", { ...auth, ...token }, {
    on_token: (new_token) => {
      console.log("New token obtained", new_token);
      Deno.writeTextFileSync("./token.json", JSON.stringify(new_token, null, 2));
    },
  });

  const { _embedded: { leads: [lead] } } = await amo.lead.addLeads({
    name: "Test Lead",
  });
  console.log(lead);

  const updated_lead = await amo.lead.updateLeads([{
    id: lead.id,
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
