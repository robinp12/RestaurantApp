import { useState } from "react";

const io = require("socket.io-client"),
  ioClient = io.connect("http://localhost:3000", {
    transports: ["websocket"],
  });

function sendToSocket(params) {
  ioClient.emit("msg", params);
}
function listenToSocket() {
  let [result, setResult] = useState({});
  ioClient.on("server", (id) => {
    setResult(id);
  });
  return result;
}
export default { sendToSocket, listenToSocket };
