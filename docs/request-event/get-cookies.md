---
sidebar_position: 7
---

# Request getCookies
Get cookies from request if set cookie in response.
```js
...
app.get("/", (rev) => {
    rev.getCookies();
    // decode if encode true
    rev.getCookies(true);
    // more code
});
...
```