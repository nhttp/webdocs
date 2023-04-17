---
sidebar_position: 1
---

# Intro

[![nhttp ci](https://github.com/nhttp/nhttp/workflows/ci/badge.svg)](https://github.com/nhttp/nhttp)
[![License](https://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)
[![deno.land](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Fnhttp@1.2.11%2Fmod.ts)](https://deno.land/x/nhttp)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](http://makeapullrequest.com)
![deps badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fdep-count%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts)
![cache badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Fcache-size%2Fhttps%2Fdeno.land%2Fx%2Fnhttp%2Fmod.ts)
[![codecov](https://codecov.io/gh/nhttp/nhttp/branch/master/graph/badge.svg?token=SJ2NZQ0ZJG)](https://codecov.io/gh/nhttp/nhttp)
[![CodeFactor](https://www.codefactor.io/repository/github/nhttp/nhttp/badge/master)](https://www.codefactor.io/repository/github/nhttp/nhttp/overview/master)
[![nest.land](https://nest.land/badge.svg)](https://nest.land/package/nhttp)

## Features

- Focus on simple and easy to use.
- Fast performance.
- Cross runtime support (Deno, Node, Bun, etc).
- Low overhead & True handlers (no caching anything).
- Middleware support.
- Sub router support.
- Template engine support (jsx, ejs, nunjucks, eta, pug, ..etc).
- Return directly on handlers.
- Auto parses the body (`json / urlencoded / multipart / raw`).

[See Examples](https://github.com/nhttp/nhttp/tree/master/examples)

## Installation

### deno.land

```ts
import nhttp from "https://deno.land/x/nhttp@1.2.11/mod.ts";
```

### deno-npm

```ts
import nhttp from "npm:nhttp-land@1.2.11";
```

### nest.land

```ts
import nhttp from "https://x.nest.land/nhttp@1.2.11/mod.ts";
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

## Usage

```ts
import nhttp from "https://deno.land/x/nhttp@1.2.11/mod.ts";

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
  return await Promise.resolve(new Blob(["cat"], { type: "text/plain" }));
});
```

## Run

```bash
deno run -A myapp.ts
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

import { n, Helmet, renderToHtml, FC } from "https://deno.land/x/nhttp@1.2.11/lib/jsx.ts";
import nhttp from "https://deno.land/x/nhttp@1.2.11/mod.ts";

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
