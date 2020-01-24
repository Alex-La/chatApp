import React, { useEffect } from "react";
import io from "socket.io-client";

let socket;

export default function Users() {
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);
    const userData = JSON.parse(localStorage.getItem("userData"));
    socket.emit("users", { login: userData.login });
    console.log(socket);
  }, [ENDPOINT]);
  return <p>Users</p>;
}
