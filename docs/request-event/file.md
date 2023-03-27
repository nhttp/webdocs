# rev.file

Lookup file. related to [Upload Middleware](https://nhttp.deno.dev/docs/usage/upload)

```js
import { multipart, nhttp } from "https://deno.land/x/nhttp@1.2.9/mod.ts";

const app = nhttp();

const upload = multipart.upload({ name: "image" });
app.post("/", upload, (rev) => {
  console.log(rev.file);
  console.log(rev.body);
  return "success upload";
});
```
