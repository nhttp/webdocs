import { nhttp } from "https://deno.land/x/nhttp@1.1.19/mod.ts";
import { serveStatic } from "https://deno.land/x/nhttp@1.1.19/lib/serve-static.ts";

// legacy => export NODE_OPTIONS=--openssl-legacy-provider

nhttp()
  .use(serveStatic("build"))
  .on404(({ response }) => {
    response.type("html");
    return Deno.readTextFileSync("build/404.html");
  })
  .listen(8080);