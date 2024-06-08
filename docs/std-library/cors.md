# CORS
Simple cors for NHttp.

### Usage
```ts
import nhttp from "@nhttp/nhttp";
import cors from "@nhttp/nhttp/cors";

const app = nhttp();

app.use(cors());

app.get("/", () => {
  return "Hello With cors";
});

app.listen(8000);
```