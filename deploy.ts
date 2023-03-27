import nhttp, { Handler } from "https://deno.land/x/nhttp@1.2.9/mod.ts";
import serveStatic from "https://deno.land/x/nhttp@1.2.9/lib/serve-static.ts";

const assets = serveStatic("build", {
  setHeaders({ response }) {
    response.setHeader("x-powered-by", "nhttp");
  },
});

const notFound: Handler = async ({ response }) => {
  response.type("html");
  return await Deno.readFile("build/404.html");
};

nhttp()
  .use(assets)
  .on404(notFound)
  .listen(8080);
