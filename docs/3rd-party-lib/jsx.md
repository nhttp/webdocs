# Jsx

Simple jsx libs.

### Import

#### Deno

```ts
import {...} from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";
```

#### Deno npm

```ts
import {...} from "npm:nhttp-land@1.3.26/jsx";
```

#### Node / Bun

```ts
import {...} from "nhttp-land/jsx";
// or
// const {...} = require("nhttp-land/jsx");
```

### Usage

```tsx
/** @jsx n */
/** @jsxFrag n.Fragment */

import nhttp from "https://deno.land/x/nhttp@1.3.26/mod.ts";
import {
  type FC,
  Helmet,
  n,
  renderToHtml,
} from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";

// support for AsyncComponent
const Fetcher: FC = async () => {
  try {
    const res = await fetch("http://nhttp.deno.dev/");
    return <span>Oke, {res.status}</span>;
  } catch (err) {
    return <span>Noop, {err.message}</span>;
  }
};

const Home: FC<{ title: string }> = (props) => {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <h1>Home Page</h1>
      <Fetcher />
    </>
  );
};
const app = nhttp();

app.engine(renderToHtml);
// or stream
// app.engine(renderToReadableStream);

app.get("/", () => {
  return <Home title="welcome jsx" />;
});

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```

### Config Automatic

#### Transform to react-jsx

```json
// deno.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "nhttp-jsx"
  },
  "imports": {
    "nhttp-jsx/jsx-runtime": "https://deno.land/x/nhttp@1.3.26/lib/jsx/jsx-runtime.ts"
  }
}
```

#### Transform to Precompile

[Deno](https://deno.com/) has claimed 7 ~ 20x faster. ref =>
[fastest jsx transform](https://deno.com/blog/v1.38#fastest-jsx-transform)

```json
// deno.json
{
  "compilerOptions": {
    "jsx": "precompile",
    "jsxImportSource": "nhttp-jsx"
  },
  "imports": {
    "nhttp-jsx/jsx-runtime": "https://deno.land/x/nhttp@1.3.26/lib/jsx/jsx-runtime.ts"
  }
}
```

### Using Hooks

#### useRequestEvent

use requestEvent.

```tsx
import { useRequestEvent } from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";

const Home: FC = () => {
  const rev = useRequestEvent();

  return <h1>The url is {rev.url}</h1>;
};
```

#### useParams

use parameter from router. e.g. `/user/:name`.

```tsx
import { useParams } from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";

const User: FC = () => {
  const params = useParams<{ name: string }>();

  return <h1>{params.name}</h1>;
};
```

#### useQuery

use query parameter from url. e.g. `/user?name=john`.

```tsx
import { useQuery } from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";

const User: FC = () => {
  const query = useQuery<{ name: string }>();

  return <h1>{query.name}</h1>;
};
```

#### useBody

use request body.

```tsx
import { useBody } from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";

const User: FC = async () => {
  const user = useBody<{ name: string }>();

  // example save to db.
  await db_user.save(user);

  return <h1>{user.name}</h1>;
};
```

#### useResponse

use http_response.

```tsx
import { useResponse } from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";

const User: FC = () => {
  const res = useResponse();

  res.setHeader("name", "john");

  return <h1>{res.getHeader("name")}</h1>;
};
```

#### useScript

minimal for simple client interactive.

```tsx
import { useScript } from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";

const Counter: FC = () => {
  const state = { count: 0 };

  useScript(state, (state) => {
    const $ = (id: string) => {
      const c = document.querySelector("#counter_app");
      return c.querySelector(`#${id}`) as HTMLElement;
    };

    $("plus").onclick = () => {
      $("count").innerText = String(state.count += 1);
    };

    $("min").onclick = () => {
      $("count").innerText = String(state.count -= 1);
    };
  });

  return (
    <div id="counter_app">
      <button id="plus">+ Increment</button>
      <h1 id="count">{state.count}</h1>
      <button id="min">- Decrement</button>
    </div>
  );
};
```

#### useId

generate unique id.

```tsx
import { useId } from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";

const User: FC = () => {
  const title_id = useId();
  const label_id = useId();

  return (
    <>
      <h1 id={title_id}>Title</h1>
      <label id={label_id}>Label</label>
    </>
  );
};
```

#### useStyle

add style directly to the markup.

```tsx
import { useStyle } from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";

const User: FC = () => {
  useStyle({
    ".title": {
      backgroundColor: "red",
    },
    ".label": {
      color: "blue",
    },
  });

  return (
    <>
      <h1 className="title">Title</h1>
      <label className="label">Label</label>
    </>
  );
};
```

#### Context

Add context provider.

```tsx
import {
  createContext,
  useContext,
} from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";

const FooContext = createContext();

const Foo: FC = () => {
  const foo = useContext(FooContext);

  return <h1>{foo}</h1>;
};

app.get("/foo", () => {
  return (
    <FooContext.Provider value="foobar">
      <Foo />
    </FooContext.Provider>
  );
});
```
### With Htmx
```tsx
/** @jsx n */
/** @jsxFrag n.Fragment */
import nhttp from "https://deno.land/x/nhttp@1.3.26/mod.ts";
import { n, htmx, renderToHtml } from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";

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
### With Twind Server

```jsx
/** @jsx n */
/** @jsxFrag n.Fragment */

import {
  FC,
  n,
  renderToHtml,
} from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";
import { useTwindServer } from "https://deno.land/x/nhttp@1.3.26/lib/jsx/twind-server.ts";
import nhttp from "https://deno.land/x/nhttp@1.3.26/mod.ts";

useTwindServer();

const app = nhttp();

app.engine(renderToHtml);

app.get("/", () => <h1 className="mt-20">hello twind</h1>);

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```

### With React

```jsx
import React from "https://esm.sh/react";
import {
  Helmet,
  options,
  renderToHtml,
} from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";
import { renderToString } from "https://esm.sh/react-dom/server";
import nhttp from "https://deno.land/x/nhttp@1.3.26/mod.ts";

options.onRenderElement = (elem) => {
  return renderToString(elem);
};

const app = nhttp();

app.engine(renderToHtml);

app.get("/", () => {
  return (
    <>
      <Helmet>
        <title>With React</title>
      </Helmet>
      <h1>Hello From React</h1>
    </>
  );
});

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```

### With Preact

```jsx
/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h } from "https://esm.sh/preact";
import {
  Helmet,
  options,
  renderToHtml,
} from "https://deno.land/x/nhttp@1.3.26/lib/jsx.ts";
import { renderToString } from "https://esm.sh/preact-render-to-string";
import nhttp from "https://deno.land/x/nhttp@1.3.26/mod.ts";

options.onRenderElement = (elem) => {
  return renderToString(elem);
};

const app = nhttp();

app.engine(renderToHtml);

app.get("/", () => {
  return (
    <>
      <Helmet>
        <title>With Preact</title>
      </Helmet>
      <h1>Hello From Preact</h1>
    </>
  );
});

app.listen(8000, () => {
  console.log("> Running on port 8000");
});
```
