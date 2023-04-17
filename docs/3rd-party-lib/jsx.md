# Jsx
Simple jsx libs.

### Import
#### Deno
```ts
import {...} from "https://deno.land/x/nhttp@1.2.11/lib/jsx.ts";
```
#### Deno npm
```ts
import {...} from "npm:nhttp-land@1.2.11/jsx";
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

app.use((rev, next) => {
  rev.jsx = (elem: JSX.Element) => {
    rev.response.type("text/html; charset=utf-8").send(renderToHtml(elem));
  }
  return next();
});

app.get("/", ({ jsx }) => jsx(<Home title="welcome jsx" />));

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```