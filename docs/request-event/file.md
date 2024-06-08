# rev.file

Lookup file. related to [Upload Middleware](https://nhttp.deno.dev/docs/usage/upload)

```js
import { multipart, nhttp } from "@nhttp/nhttp";

const app = nhttp();

const upload = multipart.upload({ name: "image" });
app.post("/", upload, (rev) => {
  console.log(rev.file);
  console.log(rev.body);
  return "success upload";
});
```
