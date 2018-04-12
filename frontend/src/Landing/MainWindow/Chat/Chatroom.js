import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Row, Col, DropdownButton, MenuItem } from "react-bootstrap";
import { TextField, RaisedButton } from "material-ui";
import "./Chatroom.css";
import axios from "axios";
import Message from "./Message";
import MessageList from "./MessageList";
import LeaveChatButton from "./LeaveChatButton";

axios.defaults.baseURL = "https://glacial-spire-77473.herokuapp.com/";

class Chatroom extends Component {
  constructor(props) {
    super(props);
    //TODO: change chatroom id to this.props.state.currChat
    this.state = {
      uid: this.props.uid,
      name: "",
      chatroomId: this.props.state.currChat,
      chatroomName: "",
      chats: [],
      inputText: "",
      myImg: "undefined",
      banned: false
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.state.currChatName != nextProps.state.currChatName) {
      this.setState(
        {
          chatroomId: nextProps.state.currChat,
          chatroomName: nextProps.state.currChatName
        },
        this.componentDidMount
      );
    }
  };

  componentDidMount() {
    let that = this;
    
    if (this.state.uid[0] == 1) {
      axios
        .post("/GET-INTERN", {
          userID: this.state.uid
        })
        .then(response => {
          that.setState({
            name: response.data.firstName + " " + response.data.lastName,
            myImg: response.data.image,
            banned: response.data.banned
          }, () => {
            if (this.props.state.currChatName.substring(0, 1) != 1) {
              that.setState({ banned: false })
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (this.state.uid[0] == 2) {
      axios
        .post("/GET-EMPLOYEE", {
          userID: this.state.uid
        })
        .then(response => {
          that.setState({
            name: response.data.firstName + " " + response.data.lastName,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    axios
      .post("/GET-CHATROOM", {
        userID: this.state.uid
      })
      .then(response => {
        let chatroomList = response.data;
        if (response.data[this.state.chatroomId] != null) {
          that.setState({ chatroomName: response.data[this.state.chatroomId] });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  //Input text handler
  handleInputTextChange = event => {
    this.setState({ inputText: event.target.value });
  };

  //Submit message handler
  submitMessage = e => {
    e.preventDefault();
    let that = this;
    let msgToSubmit = this.state.inputText.trim();
    if (msgToSubmit.length > 0) {
      axios
        .post("/SEND-MESSAGE", {
          userID: this.state.uid,
          name: this.state.name,
          chatroomName: this.state.chatroomName,
          message: this.state.inputText.trim(),
          image: this.state.myImg
        })
        .then(response => {
          that.setState({ inputText: "" });
        })
        .catch(error => {
          console.log(error);
          that.setState({
            chats: [],
            inputText: ""
          });
        });
    }
  };

  //Handle Chat options
  handleOptions = event => {
    if (event == 1) {
      //Route to intern list
    } else if (event == 2) {
      //Route to add intern to chat
    } else if (event == 3) {
      //Route to report user
    }
  };

  returnDesktop() {
    const { chats } = this.state;
    let arrow = <i className="material-icons">&#xE163;</i>
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="chatroom">
          <Row className="container-fluid">
            <h3>
              <Col>{this.state.chatroomName.substring(1)}</Col>
            </h3>
          </Row>
          <MessageList {...this.state} {...this.props} />
          <LeaveChatButton {...this.props}/>
        </div>

        <div className="messages">
          <form
            className="input"
            ref="form"
            onSubmit={e => this.submitMessage(e)}
          >
            <div className="inputtext">
              <TextField
                style={{
                  width: "80%",
                  marginLeft: "-14vw",
                  position: "relative"
                }}
                hintText={(this.state.banned) ? "Temporary ban, please contact your company chat moderator" : "Type a message..."}
                fullWidth={true}
                multiLine={true}
                onChange={this.handleInputTextChange}
                value={this.state.inputText}
                disabled={this.state.banned}
              />
              <RaisedButton
                label={arrow}
                secondary
                className='SubmitButtonChat'
                disabled={this.state.banned}
                // buttonStyle={{marginTop:'1vh', backgroundColor:'#ff4081'}}
                onClick={e => this.submitMessage(e)}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }

  returnMobile() {
    const { chats } = this.state;
    let arrow = <i className="material-icons">&#xE163;</i>
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="chatroom">
          <Row className="container-fluid">
            <h3 style={{fontSize:'4vh'}}>
              <Col>{this.state.chatroomName.substring(1)}</Col>
            </h3>
          </Row>
          <MessageList {...this.state} {...this.props} />
          {/* <LeaveChatButton {...this.props}/> */}
        </div>

        <div className="messages">
          <form
            className="input"
            ref="form"
            onSubmit={e => this.submitMessage(e)}
          >
            <div className="inputtext">
              <TextField
                style={{
                  width: "70%",
                  marginLeft: "-27vw",
                  position: "relative"
                }}
                hintText={(this.state.banned) ? "Temporary ban, please contact your company chat moderator" : "Type a message..."}
                fullWidth={true}
                multiLine={true}
                onChange={this.handleInputTextChange}
                value={this.state.inputText}
                disabled={this.state.banned}
              />
              <RaisedButton
                label={arrow}
                secondary
                className='SubmitButtonChat'
                disabled={this.state.banned}
                buttonStyle={{paddingTop:'1vh'}}
                onClick={e => this.submitMessage(e)}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }

  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 768) {
      return this.returnMobile();
    } else {
      return this.returnDesktop();
    }
  }
}

export default Chatroom;
