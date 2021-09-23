const net = require("net");
const chatServer = net.createServer();
const clientList = [];

chatServer.on("connection", (client) => {
  // 流
  client.write("Hi\n");
  clientList.push(client);
  client.on("data", (data) => {
    // 二进制通讯 Buffer
    console.log("receive", data.toString());
    // 广播
    clientList.forEach((v) => {
      v.write(data);
    });
  });
});

chatServer.listen(9000)