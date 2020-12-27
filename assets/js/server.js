const io = require("socket.io")();
const server = io.listen(3000);

// event fired every time a new client connects:
var users = [];
var data;
server.on("connection", (socket) => {
  console.info(`Client connecté [id=${socket.id}]`);

  socket.on("login", ({ email, admin }) => {
    //Signaler que l'admin est connecté
    server.emit("admin-co", { msg: "Le Cheval Blanc est connecté", bool: 1 });

    //Ajouter les utilisateurs connectés a la liste sauf l'admin
    if (!admin) {
      users.push(email);
    }
    //Envoyer la liste a l'admin
    server.emit("usersToAdmin", users);

    //Envoi de message
    socket.on("send", ({ from, desc, admin, to }) => {
      console.log(from, desc, admin, to);
      if (to == "admin") {
        server.emit("msgToAdmin", { desc, from });
      } else {
        server.emit(to, { admin, desc });
      }
    });

    //Deconnexion
    socket.on("disconnect", () => {
      //Signaler que l'admin n'est pas connecté
      server.emit("admin-co", {
        msg: "Attendre que quelqu'un se connecte",
        bool: 0,
      });
      //Supprimer l'utilisateur de la liste quand il se deconnecte
      if (!admin) {
        users.splice(users.indexOf(email), 1);
      }
      console.info(`Client déconnecté [id=${email}]`);
      //Envoyer la nouvelle liste des utilisateurs connecté
      server.emit("usersToAdmin", users);
    });
  });

  // socket.on("notifSend", (obj) => {
  //   console.log(socket.id + " : " + obj);
  //   server.emit("notifReceiv", obj);
  // });
});
