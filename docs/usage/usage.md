---
sidebar_position: 1
---

# Usage

### Simple Usage

Create file `app.ts` and copy-paste this code.

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

### Run

```bash
deno run -A app.ts
```

## Using JSX + Htmx

Create file `app.tsx` and copy-paste this code.

```jsx
import nhttp from "@nhttp/nhttp";
import { htmx, renderToHtml } from "@nhttp/nhttp/jsx";

const app = nhttp();

app.engine(renderToHtml);

app.use(htmx());

app.get("/", () => {
  return (
    <button hx-post="/clicked" hx-swap="outerHTML">
      Click Me
    </button>
  );
});

app.post("/clicked", () => {
  return <span>It's Me</span>;
});

app.listen(8000);
```

## config jsx

deno.json / tsconfig.json

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@nhttp/nhttp/jsx"
  }
}
```