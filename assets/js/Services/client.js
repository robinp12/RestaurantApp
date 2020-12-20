import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const io = require("socket.io-client"),
  ioClient = io.connect("http://localhost:3000", {
    transports: ["websocket"],
  });

function sendToSocket(channel, param) {
  ioClient.emit(channel, param);
}
function listenToSocket(channel, connected) {
  if (connected) {
    ioClient.on(channel, (param) => {
      return toast.info(
        <a
          className={"text-light"}
          //  href="http://localhost:8000/?#commander"
        >
          {param}
        </a>,
        {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 7000,
        }
      );
    });
  }
}
export default { sendToSocket, listenToSocket };
