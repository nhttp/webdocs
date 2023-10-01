---
sidebar_position: 1
---

# Intro

[![nhttp ci](https://github.com/nhttp/nhttp/workflows/ci/badge.svg)](https://github.com/nhttp/nhttp)
[![License](https://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)
[![deno.land](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Fnhttp@1.3.12%2Fmod.ts)](https://deno.land/x/nhttp)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](http://makeapullrequest.com)
![deps badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fdep-count%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts)
[![minzip](https://img.shields.io/bundlephobia/minzip/nhttp-land)](https://deno.land/x/nhttp)
[![min](https://img.shields.io/bundlephobia/min/nhttp-land)](https://deno.land/x/nhttp)
[![codecov](https://codecov.io/gh/nhttp/nhttp/branch/master/graph/badge.svg?token=SJ2NZQ0ZJG)](https://codecov.io/gh/nhttp/nhttp)
[![CodeFactor](https://www.codefactor.io/repository/github/nhttp/nhttp/badge/master)](https://www.codefactor.io/repository/github/nhttp/nhttp/overview/master)

## Features

- Focus on simple and easy to use.
- Fast Performance.
  [One of the fastest Frameworks](https://github.com/denosaurs/bench#hello-bench).
- Cross runtime support (Deno, Node, Bun, etc).
- Low overhead & True handlers (no caching anything).
- Built-in Middleware.
- Sub router support.
- Template engine support (jsx, ejs, nunjucks, eta, pug, ..etc).
- Return directly on handlers.
- Auto parses the body (`json / urlencoded / multipart / raw`).

[See Examples](https://github.com/nhttp/nhttp/tree/master/examples)

> starting v1.3.12, requires Deno 1.35 or higher.

## CLI

### Deno

```bash
deno run -Ar npm:create-nhttp
```

### Npm

```bash
npm create nhttp@latest
```

## Manual Installation

### deno.land

```ts
import nhttp from "https://deno.land/x/nhttp@1.3.12/mod.ts";
```

### deno-npm

```ts
import nhttp from "npm:nhttp-land@1.3.12";
```

### npm/yarn

```bash
npm i nhttp-land

// or

yarn add nhttp-land
```

```ts
// module
import nhttp from "nhttp-land";

// commonjs
const nhttp = require("nhttp-land").default;
```

## Simple Usage

```ts
import nhttp from "https://deno.land/x/nhttp@1.3.12/mod.ts";

const app = nhttp();

app.get("/", () => {
  return "Hello, World";
});

app.get("/cat", () => {
  return { name: "cat" };
});

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```

> Return direcly supported =>
> `Response | String | JSON | Number | ReadableStream | Uint8Array | Blob | null`

Return directly support promise (async/await).

```ts
app.get("/cat", async () => {
  return await Promise.resolve("hello");
});
```

## Run

```bash
deno run -A myapp.ts
```

## Middleware
All Route built-in middleware.

### Example 1
```ts
const app = nhttp();

app.use((rev, next) => {
  rev.foo = "bar";
  return next();
});

app.get("/", ({ foo }) => foo);
```

### Example 2
```ts
const app = nhttp();

type Foo = { count: number };

app.get<Foo>("/foo", (rev, next) => {
  rev.count = 0;
  return next();
});
app.get<Foo>("/foo", (rev, next) => {
  rev.count++;
  return next();
});
app.get<Foo>("/foo", (rev, next) => {
  rev.count++;
  return next();
});
app.get<Foo>("/foo", (rev) => rev.count);

// GET/foo => 2
```

## Body Parser

Support `json / urlencoded / multipart / raw`.

> note: nhttp automatically parses the body.

```ts
const app = nhttp();

// if you want disable bodyParser
// const app = nhttp({ bodyParser: false });

app.post("/save", (rev) => {
  console.log(rev.body);
  return "success save";
});

// inline bodyParser
// app.post("/save", bodyParser(), (rev) => {...});
```

## Other Runtime (Node / Bun)

> for nodejs, requires v18.0.0 or higher. cause it uses
> [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

```ts
import nhttp from "nhttp-land";

const app = nhttp();

app.get("/", () => new Response("hello"));

app.get("/hello", () => "Hello, World");

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```

### Coudflare Workers

```ts
import nhttp from "nhttp-land";

const app = nhttp();

app.get("/hello", () => "Hello, World");

export default app.module();

// for other just invoke app.handle
// export default app.handle;
```

## tsconfig (Bun / Node)

```json
{
  "compilerOptions": {
    // if bun
    // "types": ["bun-types"],
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ]
  }
}
```

## Jsx

```jsx
/** @jsx n */
/** @jsxFrag n.Fragment */

import nhttp from "https://deno.land/x/nhttp@1.3.12/mod.ts";
import { n, FC, renderToHtml, Helmet } from "https://deno.land/x/nhttp@1.3.12/lib/jsx.ts";

const Home: FC<{ title: string }> = (props) => {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <h1>Home Page</h1>
    </>
  );
};

const app = nhttp();

app.engine(renderToHtml);

app.get("/", () => <Home title="welcome jsx" />);

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```

## License

[MIT](https://github.com/nhttp/nhttp/blob/master/LICENSE)
