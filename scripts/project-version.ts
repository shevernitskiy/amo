if (Deno.args[0] === undefined) {
  throw Error("missing version arg!");
}

const data = JSON.parse(Deno.readTextFileSync("./deno.json"));
data.version = Deno.args[0];
Deno.writeTextFileSync("./deno.json", JSON.stringify(data, null, 2));

console.log(`version set to ${Deno.args[0]}`);
