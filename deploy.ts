import { nhttp } from "https://deno.land/x/nhttp@1.1.12/mod.ts";

// old docu need : export NODE_OPTIONS=--openssl-legacy-provider

// deno support. but cf_workers not support
const fetch_url = new URL("build", import.meta.url).href;

// alternative for build cf_workers
// const fetch_url = "https://raw.githubusercontent.com/nhttp/webdocs/master/build";

const app = nhttp();

const now = new Date();

app.use(async ({ request, response, url }, next) => {
  const isDirectory = url.slice((url.lastIndexOf(".") - 1 >>> 0) + 2) === "";
  let fetchFile = fetch_url + url;
  if (isDirectory) {
    if (fetchFile[fetchFile.length - 1] !== "/") {
      fetchFile += "/";
    }
    fetchFile += "index.html";
  }
  try {
    const res = await fetch(fetchFile);
    if (!res.ok) return next();
    response.header("x-powered-by", "nhttp");
    const etag = res.headers.get("etag");
    const lastMod = res.headers.get("last-modified");
    if (etag) {
      response.header("etag", etag);
    } else if (lastMod) {
      const key = btoa(lastMod);
      response.header("last-modified", lastMod);
      response.header("etag", `W/"${key}"`);
    } else {
      const stats = await Deno.stat(new URL(fetchFile));
      response.header("last-modified", (stats.mtime || now).toUTCString());
      response.header("etag", `W/"${stats.size}-${(stats.mtime || now).getTime()}"`);
    }
    if (request.headers.get("if-none-match") === response.header("etag")) {
      return response.status(304).send();
    }
    if (request.headers.get("range")) {
      response.header("accept-ranges", "bytes");
    }
    response.type(fetchFile.substring(fetchFile.lastIndexOf(".") + 1));
    return res.text();
  } catch {
    return next();
  }
});

app.on404(async ({ response }) => {
  const res = await fetch(fetch_url + "/404.html");
  const data = await res.text();
  response.type("html").send(data);
});

app.listen(8080);