---
sidebar_position: 2
---

# Throw Error
Simple throwing error for situation logic.
```js
import { NHttp, HttpError } from "https://deno.land/x/nhttp@1.1.7/mod.ts";

const app = new NHttp();

app.post("/user", async ({ response }) => {
    const data = await saveUser();
    if (!data) {
        throw new HttpError(400, 'Bad request for save');
    }
    return response.send(data);
});

app.listen(3000);
```