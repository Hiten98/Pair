import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Row, Col, DropdownButton, MenuItem } from "react-bootstrap";
import { TextField, Snackbar } from "material-ui";
import "./Chatroom.css";
import axios from "axios";
import Message from "./Message";

axios.defaults.baseURL = "https://glacial-spire-77473.herokuapp.com/";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatroomId: props.chatroomId,
      uid: props.uid,
      name: props.name,
      chatroomName: props.chatroomName,
      chats: [],
      myImg: props.myImg,
      ms: 0,
      numPrevMsgs: 0,
      numMsgs: 0,
      newMessage: false
    };
    this.interval = setInterval(this.tick, 500);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.state.currChatName != nextProps.state.currChatName) {
      this.setState(
        {
          chatroomId: nextProps.state.currChat - 1,
          chatroomName: nextProps.state.currChatName
        },
        this.componentDidMount
      );
    }
  };

  componentDidMount=()=> {
    let that = this;
    if (this.state.chatroomId != "" || this.state.chatroomId != null) {
      axios
        .post("/GET-CHATROOM", {
          userID: this.state.uid
        })
        .then((response) => {
          let chatroomList = response.data;
          if (response.data[this.state.chatroomId] != null) {
            that.setState({
              chatroomName: response.data[this.state.chatroomId]
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    //console.log("Chatroom Name: " + this.state.chatroomName);
    if (this.state.chatroomName != null && this.state.chatroomName != "") {
      axios
        .post("/GET-MESSAGES", {
          chatroomName: that.state.chatroomName
        })
        .then(response => {
          let messages = response.data;
          let chatroomMessages = [];
          for (let m in messages) {
            if (m != "" && m != null && m != "number") {
              let messageContent = messages[m].split("$:$");
              chatroomMessages.push(
                <Message
                  key={m}
                  chat={{
                    uid: messageContent[0],
                    name: messageContent[1],
                    img: messageContent[2],
                    content: messageContent[3]
                  }}
                  uid={that.state.uid}
                  name={that.state.name}
                  image={that.state.myImg}
                  style={{ wordWrap: "break-all" }}
                />
              );
            }
          }
          that.setState({
            chats: chatroomMessages,
            inputText: "",
            numPrevMsgs: this.state.numMsgs,
            numMsgs: chatroomMessages.length
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (this.state.numPrevMsgs == 0) {
      this.scrollToBottomInstant();
    }

    if (
      this.state.numMsgs > this.state.numPrevMsgs &&
      this.state.numPrevMsgs != 0
    ) {
      if (this.state.chats[this.state.chats.length - 1].props.chat.uid != this.state.uid) {
        this.setState({
          newMessage: true
        });
      } else {
        this.scrollToBottom();
      }
    }
  }

  tick = () => {
    this.componentDidMount();
    this.render();
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  scrollToBottomInstant = () => {
    this.messagesEnd.scrollIntoView({ behavior: "instant" });
  };

  handleRequestClose = () => {
    this.setState({
      newMessage: false
    });
  };

  handleActionClick = () => {
    this.setState({
      open: false
    });
    this.scrollToBottom();
  };

  render() {
    const { chats } = this.state;
    // console.log(chats);
    return (
      <Row style={{ width: "101.3%", overflowX: "hidden" }}>
        <ul className="chats" ref="chats">
          {this.state.chats}
          <li
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </ul>
        <Snackbar
          open={this.state.newMessage}
          message="New message(s)!"
          action="Click to view"
          autoHideDuration={5000}
          onActionClick={this.handleActionClick}
          onRequestClose={this.handleRequestClose}
        />
      </Row>
    );
  }
}

export default MessageList;
