const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

// CONFIG SERVER
const port = 8080;
const hostname = "localhost";

// HANDLERS ROUTES
const handlers = {};

handlers.hello = (data, callback) => {
  callback(200, { msg: "Welcome to the Great Node.js" });
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

  // get path from parsedURL
  const path = parsedUrl.pathname;

  // apply regex to just leave the path
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // get the headers
  const headers = req.headers;

  // get the method
  const method = req.method.toLowerCase();

  // get the query string as an object
  const queryStringObject = parsedUrl.query;

  // get the payload
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", data => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();

    // get the handler according to path
    const chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    };

    // apply handler to send response
    chosenHandler(data, (statusCode, payload) => {
      const statusCodeToSend =
        typeof statusCode === "number" ? statusCode : 200;

      const payloadToSend =
        typeof payload === "object" ? payload : { msg: "Just Welcome" };

      const payloadToSendString = JSON.stringify(payloadToSend);

      // response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCodeToSend);
      res.end(payloadToSendString);
    });
  });
});

server.listen(port, () => {
  console.log(
    `The server is listening on the port ${port} on the host ${hostname}`
  );
});
