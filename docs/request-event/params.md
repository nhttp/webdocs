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
// => { name: 'john' } or { name: null }
app.get("/user/:name?", ...handlers);

// extension params (Example: only png and jpg).
// => { filename: 'file.jpg' } or { filename: 'file.png' }
app.get("/image/:filename.(png|jpg)", ...handlers);

// exact params.
// => { wild: ['param1', 'param2'] }
app.get("/all/*", ...handlers);

```