import React, { Component } from "react";
import { Avatar } from "material-ui";
import "./Chatroom.css";

class Message extends Component {
  constructor(props) {
    super(props);
    //TODO: change chatroom id to this.props.state.currChat
    let i;
    if(this.props.chat.img != "" && this.props.chat.img != "undefined" && this.props.chat.img != null) {
      i = <Avatar src={this.props.chat.img} size={20} />
    }

    this.state = {
      uid: this.props.uid,
      name: this.props.name,
      chat: this.props.chat,
      image: i
    };
    
  }

  render() {
    return (
      <div>
        <li
          className={`chat ${this.state.uid === this.state.chat.uid ? "right" : "left"}`}
          style={{
            overflowX: "hidden",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word"
          }}
        >
          {this.state.image}
          {/* <Avatar src={this.state.chat.img} size={20} /> */}
          <em>{this.state.chat.name}</em>
          <br />
          {this.state.chat.content}
        </li>
      </div>
    );
  }
}

export default Message;

// const Message = ({ chat, uid, name }) => (
//<li
//  className={`chat ${uid === chat.uid ? "right" : "left"}`}
//  style={{
//    overflowX: "hidden",
//    whiteSpace: "pre-wrap",
//    wordWrap: "break-word"
//  }}
//>
//  {/* {console.log(chat.image)} */}
//  <Avatar src={chat.image} size={20} />
//  <em>{chat.name}</em>
//  <br />
//  {chat.content}
// {" "}
// </li>;
// );

// export default Message;
