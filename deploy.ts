import { NHttp } from "https://deno.land/x/nhttp@0.7.5/mod.ts";
import mime from "https://esm.sh/mime/lite?no-check";
import { readAll, readerFromStreamReader } from "https://deno.land/std@0.99.0/io/mod.ts";

// deno support. but cf_workers not support
export const fetch_url = new URL("build", import.meta.url).href;

// alternative for build cf_workers
// const fetch_url = "https://raw.githubusercontent.com/nhttp/webdocs/master/build";

const app = new NHttp();

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
    const headers = new Headers();
    if (res.headers.get("ETag")) {
      headers.set("ETag", res.headers.get("ETag") || "");
    } else if (res.headers.get("last-modified")) {
      const lastMod = res.headers.get("last-modified") || "";
      const key = btoa(lastMod);
      headers.set("last-modified", lastMod);
      headers.set("ETag", `W/"${key}"`);
    }
    if (request.headers.get("if-none-match") === headers.get("ETag")) {
      return response.status(304).send();
    }
    if (request.headers.get("range")) {
      headers.set("Accept-Ranges", "bytes");
    }
    const ext = fetchFile.substring(fetchFile.lastIndexOf(".") + 1);
    headers.set("Content-Type", mime.getType(ext));
    const reader = readerFromStreamReader(res.body.getReader());
    const body = await readAll(reader);
    response.header(headers).send(body);
  } catch (error) {
    next(error);
  }
});

app.on404(async ({ response }) => {
  const res = await fetch(fetch_url + "/404.html");
  const data = await res.text();
  response.status(404).type("text/html").send(data);
});

addEventListener("fetch", app.fetchEventHandler());