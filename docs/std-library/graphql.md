# Graphql (yoga)
Handle graphql with [yoga](https://github.com/dotansimha/graphql-yoga).

### Usage
```ts
import nhttp from "@nhttp/nhttp";
import yogaHandler from "@nhttp/nhttp/yoga";
import { createSchema, createYoga } from "npm:graphql-yoga";

const yoga = createYoga({
  schema: createSchema({...}),
});

const app = nhttp();

app.any("/graphql", yogaHandler(yoga));

app.listen(8000);
```