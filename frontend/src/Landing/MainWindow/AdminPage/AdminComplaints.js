import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import { Row, Col } from "react-bootstrap";
import { TextField, ListItem, List, RaisedButton } from "material-ui";
import axios from "axios";
import './AdminComplaints.css';

class AdminComplaints extends Component {
  constructor(props) {
      super(props);

      this.state = {
        uid: this.props.uid,
        complaints: [],
        viewComplaints: []
      };
    }

    handleBan = (event, index, banUid) => {
      let that = this;
      axios
        .post("/BAN-INTERN", {
          userID: banUid
        })
        .then(function(response) {
          console.log("Success");
          let msg =
            that.state.complaints[index][0] +
            "$:$" +
            that.state.complaints[index][1] +
            "$:$" +
            that.state.complaints[index][2] +
            "$:$" +
            that.state.complaints[index][3];
          axios
            .post("/REMOVE-COMPLAINT-ADMIN", {
              userID: that.state.uid,
              complaint: msg
            })
            .then(function(response) {
              console.log("Remove" + index + "uid" + banUid);
              // let data = that.state.complaints;
              // data.splice(index, 1);
              // let data2 = that.state.viewComplaints;
              // data2.splice(index, 1);
              // that.setState({
              //   complaints: data,
              //   viewComplaints: data2
              // });
              that.componentDidMount();
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    };

    handleIgnore = (event, index, banUid) => {
      let that = this;

      console.log("Remove" + index + "uid" + banUid);
      let msg =
            that.state.complaints[index][0] +
            "$:$" +
            that.state.complaints[index][1] +
            "$:$" +
            that.state.complaints[index][2] +
            "$:$" +
            that.state.complaints[index][3];
          axios
            .post("/REMOVE-COMPLAINT-ADMIN", {
              userID: that.state.uid,
              complaint: msg
            })
            .then(function(response) {
              console.log("Remove" + index + "uid" + banUid);
              // let data = that.state.complaints;
              // data.splice(index, 1);
              // let data2 = that.state.viewComplaints;
              // data2.splice(index, 1);
              // that.setState({
              //   complaints: data,
              //   viewComplaints: data2
              // });
              that.componentDidMount();
            })
            .catch(function(error) {
              console.log(error);
            });
    };

    componentDidMount = () => {
      axios
        .post("/GET-ADMIN", {
        })
        .then((response) => {
          console.log(response.data);
          let complaintsList = response.data;
          let ccList = [];
          for (let c in complaintsList) {
            ccList.push(complaintsList[c].split("$:$"));
          }
          this.setState(
            {
              complaints: ccList
            },
            () => {
              let msg = [];
              for (let arr in this.state.complaints) {
                msg.push(
                  <ListItem style={{ marginLeft: "2vw", marginRight: "2vw" }}>
                    <Row>
                      <Col
                        style={{
                          float: "left",
                          maxWidth: "75%",
                          textAlign: "left",
                          whiteSpace: "pre-wrap",
                          wordWrap: "break-word"
                        }}
                      >
                        <b>
                          <em>{this.state.complaints[arr][1]}</em>
                        </b>{" "}
                        reported{" "}
                        <b>
                          <em>{this.state.complaints[arr][2]}</em>
                        </b>{" "}
                        <br />
                        Reason: {this.state.complaints[arr][3]}
                      </Col>
                      <Col style={{ float: "right", maxWidth: "25%" }}>
                        <RaisedButton
                          label="Ban"
                          secondary={true}
                          onClick={e =>
                            this.handleBan(e, arr, this.state.complaints[arr][0])
                          }
                          style={{ marginRight: "0.5vw" }}
                        />
                        <RaisedButton
                          label="Ignore"
                          secondary={true}
                          onClick={e =>
                            this.handleIgnore(
                              e,
                              arr,
                              this.state.complaints[arr][0]
                            )
                          }
                          style={{ marginRight: "0.5vw" }}
                        />
                      </Col>
                    </Row>
                  </ListItem>
                );
              }
              this.setState({
                viewComplaints: msg
              });
            }
          );
        })
        .catch(error => {
          console.log(error);
        });
    };

    render() {
      return (
        <div className="complaints2">
          <Row className="container-fluid">
            <h3 className="complaints">Complaints</h3>
          </Row>
          <Row className="overflow-prevention">{this.state.viewComplaints}</Row>
        </div>
      );
    }
}

export default AdminComplaints;