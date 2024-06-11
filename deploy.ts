import nhttp from "jsr:@nhttp/nhttp@2.0.1";
import serveStatic from "jsr:@nhttp/nhttp@2.0.1/serve-static";

const app = nhttp();

app.use(serveStatic("build", {
  cache: true,
  spa: true,
}));

app.listen(8080, (err, info) => {
  if (err) throw err;
  console.log(`> Running on http://${info.hostname}:${info.port}`);
});
