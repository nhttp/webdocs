---
sidebar_position: 8
---

# Runtime
NHttp Support Deno, Bun, Node, CF-Workers, etc.

> For Nodejs, requires v18.0.0 or higher.

### Deno/Bun/Node
```ts
import nhttp from "@nhttp/nhttp";

const app = nhttp();

app.get("/", () => {
  return "Hello, World";
});

app.get("/cat", () => {
  return { name: "cat" };
});

app.listen(8000);
```

### cloudflare-workers or other runtime
```ts
import nhttp from "@nhttp/nhttp";

const app = nhttp();

app.get("/", () => {
  return "Hello, World";
});

app.get("/cat", () => {
  return { name: "cat" };
});

export default app.module();
```

### For typescript user
tsconfig.json
```json
{
  "compilerOptions": {
    "moduleResolution": "nodenext",
    "target": "ES5",
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ]
  }
}
```