# CSRF

Cross Site Request Forgery (CSRF) for NHttp.

### Usage

```tsx
import nhttp from "@nhttp/nhttp";
import csrf from "@nhttp/nhttp/csrf";

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
