---
sidebar_position: 4
---

# RespondWith
Just callback Web API [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response).
```js
...
// example with status and headers
app.get("/hello", (rev) => {
    return rev.respondWith(new Response("Hello", {
        status: 200,
        headers: new Headers({
            'x-powered-by': 'nhttp'
        })
    }))
})
...
```