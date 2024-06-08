# Logger
Simple http-logger for NHttp.

### Usage
```ts
import nhttp from "@nhttp/nhttp";
import logger from "@nhttp/nhttp/logger";

const app = nhttp();

app.use(logger());

app.get("/", () => {
  return "Hello World";
});

app.listen(8000);
```