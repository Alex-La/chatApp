import React from "react";

import Chats from "./Chats";
import Users from "./Users";

export default function Content(props) {
  if (props.link === "users") return <Users />;
  return <Chats />;
}
