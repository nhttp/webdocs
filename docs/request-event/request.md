---
sidebar_position: 2
---

# Request
Just Web API [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request).
```js
...
console.log(rev.request.method);
// => GET

console.log(rev.request.url);
// => http://localhost:3000/path

console.log(new URL(rev.request.url));
// => URL {...}

console.log(rev.request.headers);
// => Headers {...}
...
```

> Note: rev.request.url is a full url. rev.url is a path url.
