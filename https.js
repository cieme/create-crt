const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};
const PORT = 443;
https
  .createServer(options, (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain;charset=UTF8" });
    res.end("Hello World!爱看书的小沐！");
  })
  .listen(PORT, () => console.log(`App listening on port ${PORT}!`));
