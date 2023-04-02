# Body Parser

NHttp automatically parses the body. 

Support `json / urlencoded / multipart / raw`.

```ts
const app = nhttp();

app.post("/save", (rev) => {
  console.log(rev.body);
  return "success save";
});

// inline bodyParser
// app.post("/save", bodyParser(), (rev) => {...});

```

## Config And Limit
### Disable Body Parser
```js
const app = nhttp({ 
  bodyParser: false /* default to true */ 
});
```
### Limit Body Parser
```js
const app = nhttp({ 
  bodyParser: {
    json: "1mb",       /* default unlimited */
    urlencoded: "1mb", /* default unlimited */
    raw: "1mb",        /* default unlimited */
    multipart: "1mb"   /* default unlimited */
  } 
});
```