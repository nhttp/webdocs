# Throw Error

Simple throwing error for situation logic.

```js
import { HttpError, nhttp } from "@nhttp/nhttp";

const app = nhttp();

app.post("/user", async ({ response }) => {
  const data = await saveUser();
  if (!data) {
    throw new HttpError(400, "Bad request for save");
  }
  response.send(data);
});

app.listen(3000);
```
