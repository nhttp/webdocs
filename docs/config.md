---
sidebar_position: 6
---

# Config
```js
...
// example config
const app = new NHttp({
    parseQuery: qs.parse,  /* default from utils */
    bodyLimit: {
        json: "1mb",       /* default 3mb */
        urlencoded: "1mb"  /* default 3mb */
    },
    env: "development"     /* or production */
});
...
```