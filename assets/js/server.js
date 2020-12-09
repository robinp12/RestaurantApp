const io = require("socket.io")();
const server = io.listen(3000);

// event fired every time a new client connects:
server.on("connection", (socket) => {
  console.info(`Client connected [id=${socket.id}]`);

  // initialize this client's sequence number
  socket.on("msg", (obj) => {
    console.log(socket.id + " : " + obj);
    socket.broadcast.emit("server", obj + " : " + socket.id);
  });

  // when socket disconnects, remove it from the list:
  socket.on("disconnect", () => {
    console.info(`Client gone [id=${socket.id}]`);
  });
});
