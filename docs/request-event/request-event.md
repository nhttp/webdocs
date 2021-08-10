---
sidebar_position: 1
---

# Request Event
RequestEvent or Deno.RequestEvent (rev) is a some object like :

```js
readonly request!: Request;
respondWith!: (r: Response | Promise<Response>) => Promise<void> | Response;
body!: object;
file!: object;
responseInit!: ResponseInit;
response!: HttpResponse;
url!: string;
originalUrl!: string;
params!: object;
path!: string;
query!: object;
search!: string | null;
getCookies!: (decode?: boolean) => Record<string, string>;
// more...
```