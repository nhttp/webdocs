# AJV Validator

### Import
#### Nodejs
```ts
import nhttp from "nhttp-land";
import Ajv from "ajv";
```

### Usage
#### Nodejs
```ts
const app = nhttp();
const ajv = new Ajv();

// ajv validate middleware
const validate = (schema) => (rev, next) => {
  const valid = ajv.validate(schema, rev.body);
  if (valid) return next();
  throw new HttpError(422, ajv.errors);
}

const foobarSchema = {
  type: "object",
  properties: {
    foo: {type: "integer"},
    bar: {type: "string"}
  },
  required: ["foo"],
  additionalProperties: false
}

app.post("/save", validate(foobarSchema), () => "success save foobar");
```
