---
sidebar_position: 8
---

# Other Runtime
Support Bun, Node, CF-Workers, etc.

> For Nodejs, requires v18.14.0 or higher.

### Install

```bash
npm i nhttp-land

// or

yarn add nhttp-land
```

```ts
import { nhttp } from "nhttp-land";
```

### Usage (Bun / Node)

```ts
import { multipart, nhttp } from "nhttp-land";

const app = nhttp();

app.get("/", () => "hello, world");

// example upload
const upload = multipart.upload({
  name: "image",
  writeFile: Bun.write, /* or fs.writeFileSync */
});
app.post("/upload", upload, (rev) => {
  console.log(rev.file);
  console.log(rev.body);
  return "success upload";
});

app.listen(8000, () => {
  console.log("> Running on port 8000");
});

// if cfw or other runtime, just invoke app.handle
// export default { fetch: app.handle };
```

### tsconfig

```json
{
  "compilerOptions": {
    "types": ["bun-types"],
    "experimentalDecorators": true,
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
