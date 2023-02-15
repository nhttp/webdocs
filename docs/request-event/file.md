# rev.file

Lookup file. related to [Upload Middleware](https://nhttp.deno.dev/docs/usage/upload)

```js
import { multipart, nhttp } from "https://deno.land/x/nhttp@1.1.14/mod.ts";

const app = nhttp();

const upload = multipart.upload({ 
  name: "image",
  // Bun or Node use this config
  // writeFile: Bun.write or fs.writeFileSync
});
app.post("/", upload, (rev) => {
  console.log(rev.file);
  return "success upload";
});
```
