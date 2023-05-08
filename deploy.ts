import nhttp from "https://deno.land/x/nhttp@1.2.15/mod.ts";
import serveStatic from "https://deno.land/x/nhttp@1.2.15/lib/serve-static.ts";

const app = nhttp();

app.use(serveStatic("build", {
  setHeaders({ response }) {
    response.setHeader("x-powered-by", "nhttp");
  },
  spa: true
}));

app.listen(8080, (err, info) => {
  if (err) throw err;
  console.log(`> Running on http://${info.hostname}:${info.port}`);
});
