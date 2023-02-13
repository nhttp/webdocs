---
sidebar_position: 1
---

# Intro

[![nhttp ci](https://github.com/nhttp/nhttp/workflows/ci/badge.svg)](https://github.com/nhttp/nhttp)
[![License](https://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)
[![deno.land](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Fnhttp@1.1.13%2Fmod.ts)](https://deno.land/x/nhttp)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](http://makeapullrequest.com)
![deps badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fdep-count%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts)
![cache badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fcache-size%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts)
[![codecov](https://codecov.io/gh/nhttp/nhttp/branch/master/graph/badge.svg?token=SJ2NZQ0ZJG)](https://codecov.io/gh/nhttp/nhttp)
[![CodeFactor](https://www.codefactor.io/repository/github/nhttp/nhttp/badge/master)](https://www.codefactor.io/repository/github/nhttp/nhttp/overview/master)
[![nest.land](https://nest.land/badge.svg)](https://nest.land/package/nhttp)

## Features

- Simple Performance.
- Middleware support.
- Sub Router support.
- Return directly on handlers.
- Includes body parser with verify body.
- Cross Runtime support (Deno, Bun, Node, etc).

[See examples](https://github.com/nhttp/nhttp/tree/master/examples)

## Installation

### deno.land

```ts
import { nhttp } from "https://deno.land/x/nhttp@1.1.13/mod.ts";
```

### nest.land

```ts
import { nhttp } from "https://x.nest.land/nhttp@1.1.13/mod.ts";
```

### npm/yarn

```bash
npm i nhttp-land

// or

yarn add nhttp-land
```

```ts
import { nhttp } from "nhttp-land";
```

## Usage

```ts
import { nhttp } from "https://deno.land/x/nhttp@1.1.13/mod.ts";

const app = nhttp();

app.get("/", (rev) => {
  rev.send("Hello, John");
  // or json
  // rev.send({ name: "john" });
});

app.get("/cat", () => {
  return "Hello, Cat";
  // or json
  // return { name: "cat" };
});

app.get("/hello", (rev) => {
  rev.respondWith(new Response("Hello, World"));
});

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```

## Run

```bash
deno run -A myapp.ts
```

## Deno Flash

> requires `--unstable` flag.

```ts
const app = nhttp({ flash: true });
```

## Middleware

```ts
const app = nhttp();

app.use((rev, next) => {
  rev.foo = "bar";
  return next();
});

app.get("/", ({ foo }) => foo);
```

## Body Parser

Support `json / urlencoded / multipart / raw`.

> note: nhttp automatically parses the body.

```ts
const app = nhttp();

// if want disable bodyParser
// const app = nhttp({ bodyParser: false });

app.post("/save", (rev) => {
  console.log(rev.body);
  return "success save";
});

// inline bodyParser
// app.post("/save", bodyParser(), (rev) => {...});
```

## Other Runtime (Bun / Node)

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

## tsconfig

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

## License

[MIT](https://github.com/nhttp/nhttp/blob/master/LICENSE)
