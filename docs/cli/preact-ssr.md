# Preact SSR
The Preact Server-Side-Rendering (SSR) with Partial-Hydrations.

### Features
- Partial-Hydrations Support.
- Route a`la [Nextjs](https://nextjs.org).
- Fast JIT-Reload in dev.

### Directory Structure
```md
├── components
│   ├── counter.tsx
│   ├── layout.tsx
│   └── user_form.tsx
├── public
│   └── img
│       └── favicon.ico
├── routes
│   ├── api
│   │   └── user
│   │       └── index.ts
│   ├── user
│   │   ├── index.tsx
│   │   └── [name].tsx
│   ├── _404.tsx
│   ├── _error.tsx
│   └── index.tsx
├── app.ts
├── config.ts
├── deno.json
├── import_map.json
├── main.ts
```

### Command
#### Deno
```bash
deno task dev
deno task build
deno task start
```
#### Npm
```bash
npm run dev
npm run build
npm run start
```
#### Bun
```bash
bun run dev
bun run build
bun run start
```

### Router
this router is elegant.

```jsx
// routes/index.tsx

import { type RequestEvent } from "@nhttp/nhttp";

export default function home(rev: RequestEvent) {
  return (...)
}
```
Using Middleware
```jsx
// routes/index.tsx

import { type RequestEvent } from "@nhttp/nhttp";

function home(rev: RequestEvent) {
  return (...)
}

export default [middlewareFn, home];
```

Using Api and custom methods.
```jsx
// routes/api/user.ts

import { type RequestEvent } from "@nhttp/nhttp";

function all(rev: RequestEvent) {...}
function createUser(rev: RequestEvent) {...}

export default {
  GET: all,
  // example POST using middleware.
  POST: [validate(MySchema), createUser]
};
```

### Partial Hydration
```jsx
// components/counter.tsx

import { withHydrate } from "@nhttp/hydrate";

const Counter = () => {...}

// HOC client-interactive
export default withHydrate(Counter, import.meta.url);
```