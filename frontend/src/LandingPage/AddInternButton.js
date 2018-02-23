import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Card, CardHeader, Paper, RaisedButton, TextField, Dialog, RadioButtonGroup, RadioButton } from 'material-ui';
import { Grid, Row, Col, Image } from 'react-bootstrap'
//import './LandingScreen.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9090'

class LandingScreen extends Component {
  locs = ["hi","What"]
  sh = []
  state = {
    open: false,
    loc: null,
    intern: null,
    company: null,
  }

  componentWillMount() {
    //KUNAL GET LOCATIONS
    for (let i = 0; i < this.locs.length; i++) {
      this.sh.push(<RadioButton value={i} key={i} label={this.locs[i]}/>)
    }
  }

  handleClick = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  locChange=(ev,value)=>{
    this.setState({loc:value})
  }

  handleSubmit = () => {
    if (this.state.intern == null || this.state.intern == "") {
      console.log("Please enter an email")
    } else {
      axios.post('/CREATE-INTERN', {
        "username": this.state.intern,
        "location": this.state.loc,
        "company": this.state.company
      }).then((response) => {
        if (response.data.userID != null) {
          console.log("Success! ID CREATED:" + response.data.userID);
          /*this.props.updateUid(response.data.querySelectorID);
          //Redirect to preferences page
          this.redirect(1);*/
        } else {
          //Create intern failed
          console.log("Failure!");
          this.setState({
            error: true
          })
        }
      }).catch((error) => {
        console.log(error);
      });

    }
    this.setState({ open: false })
  }

  changed = (ev) => {
    this.setState({ intern: ev.target.value })
  }

  actions = [
    <RaisedButton
      label="Cancel"
      onClick={this.handleClose}
    />,
    <RaisedButton
      label="Add Intern"
      onClick={this.handleSubmit}
    />
  ]

  render() {
    return (
      <div>
        <RaisedButton
          label="Add intern"
          onClick={this.handleClick}
          style={{ marginTop: "20px" }}
        />
        <Dialog
          title="Add Intern"
          modal
          actions={this.actions}
          open={this.state.open}
        >
          <Row>
            <TextField
              fullWidth
              floatingLabelText="Enter email"
              onChange={this.changed}
            />
          </Row>
          <Row>
            <RadioButtonGroup name="locs" onChange={this.locChange}>
              {this.sh}
            </RadioButtonGroup>
          </Row>
        </Dialog>
      </div>
    );
  }
}

export default LandingScreen;