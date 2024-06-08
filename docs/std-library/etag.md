# Etag
Simple etag libs for NHttp.

### Usage
```ts
import nhttp from "@nhttp/nhttp";
import etag from "@nhttp/nhttp/etag";

const app = nhttp();

app.use(etag());

app.get("/", () => {
  return "Hello With Etag";
});

app.listen(8000);
```

### Sendfile with Etag
```ts
import nhttp from "@nhttp/nhttp";
import { sendFile } from "@nhttp/nhttp/etag";

const app = nhttp();

app.get("/", async (rev) => {
  await sendFile(rev, "./path/to/file");
});

app.listen(8000);
```