---
sidebar_position: 1
---

# Request Event
RequestEvent or Deno.RequestEvent (rev) is a some object like :

```js
// default from Deno.RequestEvent
request: Request;
respondWith(r: Response | Promise<Response>): Promise<void>;

// custom
body: { [k: string]: any };
file: { [k: string]: any };
responseInit: ResponseInit;
response: HttpResponse;
url: string;
originalUrl: string;
params: { [k: string]: any };
path: string;
query: { [k: string]: any };
search: string | null;
_parsedUrl: { [k: string]: any };
getCookies: (decode?: boolean) => Record<string, string>;
// more...
```