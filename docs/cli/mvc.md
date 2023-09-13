# MVC Template
MVC (Model, View, Controller).

### Features
- Model - use ORM like typeorm or any, to make a model.
- View  - The views uses JSX style.
- Controller  - The controllers uses Decorator style.

### Directory Structure
```md
├── components
│   └── layout.tsx
├── controllers
│   ├── home_controller.tsx
│   └── user_controller.tsx
├── models
│   └── user_model.ts
├── public
│   └── img
│       └── favicon.ico
├── views
│   ├── home_view.tsx
│   └── user_view.tsx
├── app.tsx
├── deno.json
├── main.ts
```

### Command
#### Deno
```bash
deno task dev
deno task start
```
#### Npm
```bash
npm run dev
npm run start
```
#### Bun
```bash
bun run dev
bun run start
```