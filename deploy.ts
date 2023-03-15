import nhttp from "https://deno.land/x/nhttp@1.2.6/mod.ts";
import serveStatic from "https://deno.land/x/nhttp@1.2.6/lib/serve-static.ts";

// legacy => export NODE_OPTIONS=--openssl-legacy-provider

nhttp()
  .use(serveStatic("build"))
  .on404(async ({ response }) => {
    response.type("html");
    return await Deno.readFile("build/404.html");
  })
  .listen(8080);