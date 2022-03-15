import { NHttp } from "https://deno.land/x/nhttp@1.1.11/mod.ts";
import mime from "https://esm.sh/mime/lite?no-check";
import { readAll, readerFromStreamReader } from "https://deno.land/std@0.99.0/io/mod.ts";

// deno support. but cf_workers not support
export const fetch_url = new URL("build", import.meta.url).href;

// alternative for build cf_workers
// const fetch_url = "https://raw.githubusercontent.com/nhttp/webdocs/master/build";

const app = new NHttp();

const now = new Date();

app.use(async ({ request, response, url }, next) => {
  let isDirectory = url.slice((url.lastIndexOf(".") - 1 >>> 0) + 2) === "";
  let fetchFile = fetch_url + url;
  if (isDirectory) {
    if (fetchFile[fetchFile.length - 1] !== "/") {
      fetchFile += "/";
    }
    fetchFile += "index.html";
  }
  try {
    const res = await fetch(fetchFile);
    if (!res.ok || !res.body) return next();
    const etag = res.headers.get("ETag");
    const lastMod = res.headers.get("last-modified");
    if (etag) {
      response.header("ETag", etag || "");
    } else if (lastMod) {
      const key = btoa(lastMod);
      response.header("last-modified", lastMod);
      response.header("ETag", `W/"${key}"`);
    } else {
      const stats = await Deno.stat(new URL(fetchFile));
      response.header("Last-Modified", (stats.mtime || now).toUTCString());
      response.header("ETag", `W/"${stats.size}-${(stats.mtime || now).getTime()}"`);
    }
    if (request.headers.get("if-none-match") === response.header("ETag")) {
      return response.status(304).send();
    }
    if (request.headers.get("range")) {
      response.header("Accept-Ranges", "bytes");
    }
    const ext = fetchFile.substring(fetchFile.lastIndexOf(".") + 1);
    response.header("Content-Type", mime.getType(ext));
    const reader = readerFromStreamReader(res.body.getReader());
    const body = await readAll(reader);
    response.header("x-powered-by", "NHttp Deno");
    return response.send(body);
  } catch (error) {
    return next(error);
  }
});

app.on404(async ({ response }) => {
  const res = await fetch(fetch_url + "/404.html");
  const data = await res.text();
  return response.type("text/html").send(data);
});

app.listen(8080);