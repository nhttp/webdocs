import { nhttp } from "https://deno.land/x/nhttp@1.1.18/mod.ts";
import { serveStatic } from "https://deno.land/x/nhttp@1.1.18/lib/serve-static.ts";

// old docu need : export NODE_OPTIONS=--openssl-legacy-provider

const app = nhttp();

app.use(serveStatic("build"));

app.on404(({ response }) => {
  response.type("html");
  return Deno.readTextFileSync("build/404.html");
});

app.listen(8080);