import nhttp from "jsr:@nhttp/nhttp@2.0.0";
import serveStatic from "jsr:@nhttp/nhttp@2.0.0";

const app = nhttp();

app.use(serveStatic("build", {
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
}));

app.listen(8080, (err, info) => {
  if (err) throw err;
  console.log(`> Running on http://${info.hostname}:${info.port}`);
});
