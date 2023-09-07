import nhttp from "https://deno.land/x/nhttp@1.3.9/mod.ts";
import serveStatic from "https://deno.land/x/nhttp@1.3.9/lib/serve-static.ts";

const app = nhttp();

app.use(
  (rev, next) => {
    const accept = rev.headers.get("accept");
    const userAgent = rev.headers.get("user-agent");
    if (
      !accept?.includes("text/html") &&
      userAgent?.toLowerCase().startsWith("deno")
    ) {
      return new Response("create_nhttp", {
        headers: { "Location": "https://esm.sh/create-nhttp" },
        status: 307,
      });
    }
    return next();
  },
  serveStatic("build", {
    setHeaders({ response }, path) {
      if (!path.endsWith(".html")) {
        response.setHeader(
          "cache-control",
          "public, max-age=604800, immutable",
        );
      }
      response.setHeader("x-powered-by", "nhttp");
    },
    spa: true,
  }),
);

app.listen(8080, (err, info) => {
  if (err) throw err;
  console.log(`> Running on http://${info.hostname}:${info.port}`);
});
