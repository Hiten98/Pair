import React from "react";
import { Row } from "react-bootstrap";
import { Avatar } from "material-ui";

const Message = ({ chat, uid, name }) => (
  <li
    className={`chat ${uid === chat.uid ? "right" : "left"}`}
    style={{
      overflowX: "hidden",
      whiteSpace: "no-wrap",
      wordWrap: "break-word"
    }}
  >
    <Avatar src={chat.image} size={20} />
    <em >{chat.name}</em>
    <br />
    {chat.content}
  </li>
);

export default Message;
