---
sidebar_position: 3
---

# Response
The response http server.
```js
...
// example with status and headers
app.get("/hello", ({ response }) => {
    return response.status(200).header({ 'name': 'value' }).send('hello');
})
...
```


### Response.header
`header: (key?: object | string | undefined, value?: any) => HttpResponse | string | Headers;`

```js
...

// key and value
response.header("key1", "value1");

// with object
response.header({ "key2": "value2" });

// multiple header
response.header({
    "key3": "value3",
    "key4": "value4"
});

// get header
console.log(response.header());
// => Headers {
//         "key1":"value1",
//         "key2":"value2",
//         "key3":"value3",
//         "key4":"value4",
//     }

// get header by key
console.log(response.header("key1"));
// => value1

// delete key1
response.header().delete("key1");
console.log(response.header());
// => Headers {
//         "key2":"value2",
//         "key3":"value3",
//         "key4":"value4",
//     }

// convert to json object
console.log(Object.fromEntries(response.header().entries()));
// => {
//       "key2":"value2",
//       "key3":"value3",
//       "key4":"value4",
//    }

// reset header
responseInit.headers = void 0;

console.log(response.header());
// => Headers { }
```

## Response.type
Shorthand for `response.header("Content-Type", yourContentType);`

### Response.status
`status: (code?: number | undefined) => HttpResponse | number;`
```js
// set status
response.status(201);

// get status
console.log(response.status());
// => 201
```

### Response.send
`send: (body?: BodyInit | { [k: string]: any } | null) => Promise<void>;`

### Response.json
`json: (body: { [k: string]: any } | null) => Promise<void>;`

### Response.redirect
`redirect: (path: string, status?: number) => Promise<void>;`

### Response.cookie
```js
...
response.cookie("key", "value", {
    HttpOnly: true,
    maxAge: 60 * 60,
    // encode value
    encode: true
})
...
```
Type Cookie
```js
type Cookie = {
  expires?: Date;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  other?: string[];
  encode?: boolean;
};
```