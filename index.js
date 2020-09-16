const http = require("http");
const WebSocket = require("websocket").server;
const PORT = 8080;
const server = http.createServer((req, res) => {
  console.log("Server started !");
});
let connection = null;
server.listen(PORT, () => console.log(`Server listening at ${PORT}`));

const ws = new WebSocket({
  httpServer: server,
});
ws.on("request", (request) => {
  connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("New connection openned"));
  connection.on("close", () => console.log("Connection close:/"));
  connection.on("message", (message) => {
    console.log(`Received message is: ${message.utf8Data}`);
    connection.send("Hey client. Just received your shit!");
  });
});
