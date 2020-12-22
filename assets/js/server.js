const io = require("socket.io")();
const server = io.listen(3000);

// event fired every time a new client connects:
var users = [];
server.on("connection", (socket) => {
  console.info(`Client connecté [id=${socket.id}]`);
  console.log(socket.rooms);

  let me = {};
  socket.on("login", (user) => {
    me.id = user.replace("@", "").replace(".", "");
    me.email = user;
    users.push(me);
    console.log(users);
    server.emit("newuser", me);
    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
      // console.log("deco " + users.indexOf(user));
      users.splice(users.indexOf(user), 1);
      console.info(`Client déconnecté [id=${socket.id}][${me.email}]`);
      server.emit("discousr", me.email);
    });
  });

  // initialize this client's sequence number
  // socket.on("notifSend", (obj) => {
  //   console.log(socket.id + " : " + obj);
  //   server.emit("notifReceiv", obj);
  // });

  socket.on("send", (obj) => {
    if (obj.admin) {
      obj.id = "Admin";
      obj.name = "Admin";
    } else {
      obj.id = socket.id;
    }
    console.log(obj.id + " : " + obj.desc);
    server.emit("receive", obj);
  });
});
