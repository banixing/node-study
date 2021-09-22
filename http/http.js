const http = require("http");

const server = http.createServer((request, response) => {
  const { url, method } = request;
  if (url === "/hello" && method === "GET") {
    response.end("Hello Node");
  } else {
    response.statusCode = "404";
    response.setHeader('Content-Type', "text/plain;charset=utf-8")
    response.end('404 页面不存在')
  }
});

server.listen(8080, () => {
  console.log("localhost:8080");
});
