const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");

const app = express();

// const sserver = https
//   .createServer(
//     {
//       key: fs.readFileSync("./private.key").toString(),
//       cert: fs.readFileSync("./certificate.crt").toString(),
//     },
//     app
//   )
//   .listen(3000);
// const serer = io.listen(process.env.PORT || 3000);
const server = http.Server(app);
server.listen(3000);

const io = socketIo(server);
// event fired every time a new client connects:
var users = [];
var data;
io.on("connection", (socket) => {
  console.info(`Client connecté [id=${socket.id}]`);

  socket.on("login", ({ email, admin }) => {
    //Signaler que l'admin est connecté
    io.emit("admin-co", { msg: "Le Cheval Blanc est connecté", bool: 1 });

    //Ajouter les utilisateurs connectés a la liste sauf l'admin
    if (!admin) {
      users.push(email);
    }
    //Envoyer la liste a l'admin
    io.emit("usersToAdmin", users);
    io.emit("usersToAdmin1", socket.id);

    //Envoi de message
    socket.on("send", ({ from, desc, admin, to }) => {
      console.log(from, desc, admin, to);
      if (to == "admin") {
        io.emit("msgToAdmin", { desc, from });
      } else {
        io.emit(to, { admin, desc });
      }
    });

    //Deconnexion
    socket.on("disconnect", () => {
      //Signaler que l'admin n'est pas connecté
      io.emit("admin-co", {
        msg: "Attendre que quelqu'un se connecte",
        bool: 0,
      });
      //Supprimer l'utilisateur de la liste quand il se deconnecte
      if (!admin) {
        users.splice(users.indexOf(email), 1);
      }
      console.info(`Client déconnecté [id=${email}]`);
      //Envoyer la nouvelle liste des utilisateurs connecté
      io.emit("usersToAdmin", users);
    });
  });

  // socket.on("notifSend", (obj) => {
  //   console.log(socket.id + " : " + obj);
  //   server.emit("notifReceiv", obj);
  // });
});
