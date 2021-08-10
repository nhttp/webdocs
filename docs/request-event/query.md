---
sidebar_position: 6
---

# Query
Just object query parameters.
```js
...
// example: /user?name=john
app.get("/user", ({ response, query }) => {
    console.log(query);
    // => { name: 'john' }

    return response.send(query.name);
});
...

```