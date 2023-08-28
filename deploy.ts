import nhttp from "https://deno.land/x/nhttp@1.3.8/mod.ts";
import serveStatic from "https://deno.land/x/nhttp@1.3.8/lib/serve-static.ts";

const app = nhttp();

app.use(serveStatic("build", {
  setHeaders({ response }, path) {
    if (!path.endsWith(".html")) {
      response.setHeader("cache-control", "public, max-age=604800, immutable");
    }
    response.setHeader("x-powered-by", "nhttp");
  },
  spa: true,
}));

app.listen(8080, (err, info) => {
  if (err) throw err;
  console.log(`> Running on http://${info.hostname}:${info.port}`);
});
