# Websocket

### Import
#### Nodejs
```ts
import nhttp from "nhttp-land";
import { createServer } from "node:http";
import fs from "node:fs";
import { Server } from "socket.io";

const app = nhttp();
const server = createServer(app.handle as any);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("wellcome");
});

app.get("/", ({ response }) => {
  response.type("html");
  return fs.readFileSync("./client.html");
});

server.listen(8000);
```
