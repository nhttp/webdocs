---
sidebar_position: 1
---

# Error Handling
Simple error handling.
```js
...
// global error handling
app.onError((error, rev) => {
    return rev.response.send(error.message);
})

// global not found error handling
app.on404((rev) => {
    return rev.response.send('Not Found');
})
...
```