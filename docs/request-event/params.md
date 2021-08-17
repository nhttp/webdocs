---
sidebar_position: 5
---

# Parameters
Just object path parameters.
```js
...
app.get("/user/:name", ({ response, params }) => {
    console.log(params);
    // => { name: 'john' }

    return response.send(params.name);
});
...

// optional params.
// => { name: 'john' } or { }
app.get("/user/:name?", ...handlers);

// extension params (Example: only png and jpg).
// => { filename: 'name_of_file' }
app.get("/image/:filename.(png|jpg)", ...handlers);

// exact params.
// => { wild: ['param1', 'param2'] }
app.get("/*", ...handlers);

```