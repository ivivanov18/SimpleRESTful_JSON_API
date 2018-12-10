const http = require("http");
const url = require("url");

const port = 8080;
const hostname = "localhost";

const handlers = {};

handlers.hello = (data, callback) => {
  callback(200, { msg: "Hello World" });
};

handlers.notFound = (data, callback) => {
  callback(404, { msg: "Not Found" });
};

const router = {
  hello: handlers.hello
};

const server = http.createServer((req, res) => {
  //parse url
  // true -> the query property will always be set to an object returned by the querystring // module's parse() method
  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname;

  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
});

server.listen();
