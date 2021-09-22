const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  const { url, method, headers } = request;
  if (url === "/" && method === "GET") {
    // 读取index.html
    fs.readFile("index.html", (err, data) => {
      if (err) {
        // 处理err
        response.writeHead(500, { "Content-Type": "text/plain;charset=utf-8" });
        response.end("500, 服务器错误");
        return;
      } else {
        // 返回数据给客户端
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        response.end(data);
      }
    });
  } else if (url === "/user" && method === "GET") {
    response.statusCode = "200";
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify({ name: "小明", age: 20 }));
  } else if (method === "GET" && headers.accept.indexOf("text/css") !== -1) {
    // 支持css文件、创建可读流，并把数据通过管道和返回参数response连接
    fs.createReadStream("." + url).pipe(response);
  } else if (method === "GET" && url.endsWith(".js")) {
    // 支持js文件、创建可读流，并把数据通过管道和返回参数response连接
    fs.createReadStream("." + url).pipe(response);
  } else if (method === "GET" && headers.accept.indexOf("image/*") !== -1) {
    // 支持图片文件、创建可读流，并把数据通过管道和返回参数response连接
    fs.createReadStream("." + url).pipe(response);
  } else if (method === "GET" && headers.accept === "*/*") {
    // 支持音频、视频或者其他文件 创建可读流，并把数据通过管道和返回参数response连接
    fs.createReadStream("." + url).pipe(response);
  } else {
    // 处理404
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain;charset=utf-8");
    response.end("404, 页面没有找到");
  }
});

server.listen(8080, () => {
  console.log("localhost:8080");
});
