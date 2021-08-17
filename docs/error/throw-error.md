---
sidebar_position: 2
---

# Throw Error
Simple throwing error for situation logic.
```js
import { NHttp, BadRequestError } from "https://deno.land/x/nhttp@1.0.0/mod.ts";

const app = new NHttp();

app.post("/user", async ({ response }) => {
    const data = await saveUser();
    if (!data) {
        throw new BadRequestError('Bad request for save');
    }
    return response.send(data);
});

app.listen(3000);
```