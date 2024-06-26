# Upload File

NHttp built in multipart by default. so, no need any library to handle upload.

> Support Deno, Bun, Nodejs.

```js
import { multipart, nhttp } from "@nhttp/nhttp";
const app = nhttp();

// handle upload multipart/form-data
const upload = multipart.upload({ name: "image" });

app.post("/upload", upload, (rev) => {
  console.log(rev.file);
  return "success upload file";
});
app.listen(3000);
```

### Multipart

```js
...

// upload
multipart.upload({ name: "image" });

// single upload
multipart.upload({ name: "image", maxCount: 1 });

// required field (will throw bad request error 400)
multipart.upload({ name: "image", required: true });

// accept file
multipart.upload({ name: "image", accept: 'png|jpg' });

// maxSize file
multipart.upload({ name: "image", maxSize: '2 mb' });

// disable upload
multipart.upload({ name: "image", writeFile: false });

// callback
multipart.upload({
  name: "image", 
  callback: (file) => {
    // change filename
    file.filename = Date.now() + file.name;
  }
});

// storage
multipart.upload({
  name: "image", 
  storage: async (file) => {
    // my_code to save storage.
  }
});

// destination
multipart.upload({
  name: "image", 
  dest: "public/user_folder/"
});

// multiple field
multipart.upload(
  [
    { 
      name: "user_image", 
      dest: "public/user_folder/"
      // other
    },
    { 
      name: "employee_image", 
      dest: "public/employee_folder/"
      // other
    }
  ]
);
...
```
