# CSRF

Cross Site Request Forgery (CSRF) libs.

### Import

#### Deno

```ts
import {...} from "https://deno.land/x/nhttp@1.3.19/lib/csrf.ts";
```

#### Deno npm

```ts
import {...} from "npm:nhttp-land@1.3.19/csrf";
```

#### Node / Bun

```ts
import {...} from "nhttp-land/csrf";
// or
// const {...} = require("nhttp-land/csrf");
```

### Usage

```ts
import nhttp from "https://deno.land/x/nhttp@1.3.19/mod.ts";
import csrf from "https://deno.land/x/nhttp@1.3.19/lib/csrf.ts";

const MyForm: FC<{ csrf: string }> = (props) => {
  return (
    <form method="POST" action="/">
      <input name="_csrf" type="hidden" value={props.csrf} />
      <input name="name" />
      <button type="submit">Submit</button>
    </form>
  );
};

const csrfProtect = csrf();

const app = nhttp();

app.get("/", csrfProtect, (rev) => {
  return <MyForm csrf={rev.csrfToken()} />;
});

app.post("/", csrfProtect, (rev) => {
  return <MyForm csrf={rev.csrfToken()} />;
});

app.listen(8000);
```
