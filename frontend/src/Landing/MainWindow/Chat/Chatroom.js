import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Row, Col, DropdownButton, MenuItem } from "react-bootstrap";
import { TextField } from "material-ui";
import history from "../history";
import "./MainArea.css";
import "./Chatroom.css";
import axios from "axios";
import Message from "./Message";
import MessageList from "./MessageList";

axios.defaults.baseURL = "https://glacial-spire-77473.herokuapp.com/";

class Chatroom extends Component {
  constructor(props) {
    super(props);
    //change uid to this.props.uid
    //change chatroom id to this.props.state.currChat-1
    this.state = {
      uid: "1115",
      name: "",
      chatroomId: "0",
      chatroomName: "",
      chats: [],
      inputText: "",
      myImg: ""
    };
  }

  componentDidMount() {
    let that = this;
    console.log(this.state.uid);
    axios
      .post("/GET-INTERN", {
        userID: this.state.uid
      })
      .then(response => {
        that.setState({
          name: response.data.firstName + " " + response.data.lastName,
          myImg: response.data.image
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .post("/GET-CHATROOM", {
        userID: this.state.uid
      })
      .then(response => {
        let chatroomList = response.data;
        that.setState({ chatroomName: response.data[this.state.chatroomId] });
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
    //console.log(this.state.inputText);
    axios
      .post("/SEND-MESSAGE", {
        userID: this.state.uid,
        name: this.state.name,
        chatroomName: this.state.chatroomName,
        message: this.state.inputText,
        image: this.state.myImg
      })
      .then(response => {
        console.log(response.data);
        that.setState({ inputText: "" });
      })
      .catch(error => {
        console.log(error);
        that.setState({
          chats: [],
          inputText: ""
        });
      });
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

  render() {
    const { chats } = this.state;
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="chatroom">
          <Row className="container-fluid">
            <h3>
              <Col>{this.state.chatroomName.substring(1)}</Col>
            </h3>
          </Row>
          <MessageList {...this.state} />
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
                hintText="Type a message..."
                fullWidth={true}
                multiLine={true}
                maxlength
                onChange={this.handleInputTextChange}
                value={this.state.inputText}
              />
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Chatroom;
