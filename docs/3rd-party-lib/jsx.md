# Jsx

Simple jsx libs.

### Import

#### Deno

```ts
import {...} from "https://deno.land/x/nhttp@1.3.9/lib/jsx.ts";
```

#### Deno npm

```ts
import {...} from "npm:nhttp-land@1.3.9/jsx";
```

#### Node / Bun

```ts
import {...} from "nhttp-land/jsx";
// or
// const {...} = require("nhttp-land/jsx");
```

### Config

```json
{
  "jsx": "react",
  "jsxFactory": "n",
  "jsxFragmentFactory": "n.Fragment"
}
```

### Or inline file (tsx)

```ts
/** @jsx n */
/** @jsxFrag n.Fragment */
```

### Usage

```jsx
/** @jsx n */
/** @jsxFrag n.Fragment */

import { n, FC, renderToHtml, Helmet } from "https://deno.land/x/nhttp@1.3.9/lib/jsx.ts";
import nhttp from "https://deno.land/x/nhttp@1.3.9/mod.ts";

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

### Expected in browser

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>welcome jsx</title>
  </head>
  <body>
    <h1>Home Page</h1>
  </body>
</html>
```

### Using middleware

```jsx
/** @jsx n */
/** @jsxFrag n.Fragment */

import { n, FC, renderToHtml } from "https://deno.land/x/nhttp@1.3.9/lib/jsx.ts";
import nhttp from "https://deno.land/x/nhttp@1.3.9/mod.ts";

const app = nhttp();

app.use((rev, next) => {
  rev.jsx = (elem: JSX.Element) => {
    return rev.response.html(renderToHtml(elem));
  }
  return next();
});

app.get("/", ({ jsx }) => jsx(<h1>foobar</h1>));

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```

### Using Twind

```jsx
/** @jsx n */
/** @jsxFrag n.Fragment */

import { FC, n, renderToHtml } from "https://deno.land/x/nhttp@1.3.9/lib/jsx.ts";
import useTwind from "https://deno.land/x/nhttp@1.3.9/lib/jsx/twind.ts";
import nhttp from "https://deno.land/x/nhttp@1.3.9/mod.ts";

useTwind();

const app = nhttp();

app.engine(renderToHtml);

app.get("/", () => <h1 className="mt-20">hello twind</h1>);

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```

### Using React

```jsx
import React from "https://esm.sh/react@18.2.0";
import {
  options,
  renderToHtml,
  Helmet
} from "https://deno.land/x/nhttp@1.3.9/lib/jsx.ts";
import { renderToString } from "https://esm.sh/react-dom@18.2.0/server";
import nhttp from "https://deno.land/x/nhttp@1.3.9/mod.ts";

options.onRenderElement = (elem) => {
  Helmet.render = renderToString;
  return Helmet.render(elem);
};

const app = nhttp();

app.engine(renderToHtml);

app.get("/", () => <h1>hello react</h1>);

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```
