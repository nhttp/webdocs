---
sidebar_position: 1
---

# Request Event
RequestEvent or Deno.RequestEvent (rev) is a some object like :

```js
readonly request!: Request;
respondWith!: (r: Response | Promise<Response>) => Promise<void> | Response;

// more object/func
body!: TObject;
file!: TObject;
responseInit!: ResponseInit;
response!: HttpResponse;
url!: string;
params!: TObject;
path!: string;
conn!: Deno.Conn;
query!: TObject;
search!: string | null;
getCookies!: (decode?: boolean) => Record<string, string>;
// more...
```