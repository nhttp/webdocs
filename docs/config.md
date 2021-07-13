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
        urlencoded: "1mb", /* default 3mb */
        raw: "1mb",        /* default 3mb */
        multipart: "1mb"   /* default 100mb */
    },
    env: "development"     /* or production */
});
...
```
### Disable Body parser
```js
...
const app = new NHttp({
    bodyLimit: {
        json: 0,       /* disable json */
        urlencoded: 0, /* disable urlencoded */
        raw: 0,        /* disable raw */
        multipart: 0   /* disable multipart */
    }
});
...
```