---
sidebar_position: 2
---

# Throw Error
Simple throwing error for situation logic.
see list Error Class => https://deno.land/x/nhttp@0.7.2/error.ts
```js
import { NHttp  } from "https://deno.land/x/nhttp@0.7.2/mod.ts";
import { BadRequestError } from "https://deno.land/x/nhttp@0.7.2/error.ts";

const app = new NHttp();

app.post("/user", async ({ response }) => {
    const data = await saveUser();
    if (!data) {
        throw new BadRequestError('Bad request for save');
    }
    response.send(data);
});

app.listen(3000);
```