import nhttp from "https://deno.land/x/nhttp@1.3.0/mod.ts";
import serveStatic from "https://deno.land/x/nhttp@1.3.0/lib/serve-static.ts";

const app = nhttp();

app.use(serveStatic("build", {
  setHeaders({ response }, path) {
    let cc = "public, max-age=604800, immutable";
    if (path.endsWith(".html")) cc = "no-cache";
    response.setHeader("cache-control", cc);
    response.setHeader("x-powered-by", "nhttp");
  },
  etag: false,
  spa: true,
}));

app.listen(8080, (err, info) => {
  if (err) throw err;
  console.log(`> Running on http://${info.hostname}:${info.port}`);
});
