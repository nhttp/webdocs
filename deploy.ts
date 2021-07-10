import { NHttp } from "https://deno.land/x/nhttp@0.7.2/mod.ts";
import staticFiles from "https://deno.land/x/static_files@1.1.0/mod.ts";

const url = new URL("build", import.meta.url).href;
const app = new NHttp();
app.use(staticFiles(url, { fetch: true }));

app.on404((rev) => {
  rev.url = "/404.html";
  staticFiles(url, { fetch: true })(rev);
});

addEventListener("fetch", app.fetchEventHandler());
