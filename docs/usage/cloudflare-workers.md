---
sidebar_position: 6
---

# Cloudflare Workers

## Usage With Wrangler

### Install Wrangler

```bash
npm install @cloudflare/wrangler -g
```

### Generate App and cd app_name

```bash
wrangler generate app_name
cd app_name
```

### Install nhttp-land

```bash
npm install nhttp-land --save
```

### Webpack

Modify wrangler.toml

```toml
name = "app_name"
type = "webpack"

account_id = "your_account_id"
workers_dev = true
route = ""
zone_id = ""
```

### Code

Modify index.js

```js
import nhttp from "nhttp-land";

const app = nhttp();

app.get("/", () => {
  return "hello, world";
});

// fetch
addEventListener("fetch", (event) => {
  event.respondWith(app.handleEvent(event));
});

// module workers
// export default { fetch: app.handle };
```

### Run Development

```bash
wrangler dev
```

More info https://developers.cloudflare.com/workers/
