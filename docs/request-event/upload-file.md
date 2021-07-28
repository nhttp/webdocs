---
sidebar_position: 8
---

# Upload File
NHttp built in multipart by default. so NO need any library to handle upload.
```js
import { NHttp, multipart } from "https://deno.land/x/nhttp@0.8.2/mod.ts";
const app = new NHttp();

// handle upload multipart/form-data
app.post("/upload", multipart.upload({ name: "image" }), ({ response, file }) => {
    console.log(file.image);
    // => file or [file1, file2]
    response.send('success upload file');
});
app.listen(3000);
```
### Multipart
Cause based on native HTTP, handling multipart is very simple.
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

// callback
multipart.upload({
    name: "image", 
    callback: (file) => {
        // change filename
        file.filename = Date.now() + file.name;
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