const http = require("http");
const fs = require("fs");

const service = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World!");
});

service.listen(80).addListener("listening", (err) => {
  if (err) {
    console.error(err);
  }
  console.log("Server running at https://localhost:443");
});
