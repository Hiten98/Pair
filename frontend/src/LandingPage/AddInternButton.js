import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Card, CardHeader, Paper, RaisedButton, TextField, Dialog, RadioButtonGroup, RadioButton } from 'material-ui';
import { Grid, Row, Col, Image } from 'react-bootstrap'
//import './LandingScreen.css';
import axios from 'axios'
import emailjs from 'emailjs-com'

axios.defaults.baseURL = 'http://localhost:9090'

class LandingScreen extends Component {
  locs = []
  sh = []
  state = {
    open: false,
    loc: null,
    intern: null,
    company: null,
  }

  componentWillMount() {
    //KUNAL GET LOCATIONS
    let that = this
    axios.post('/GET-EMPLOYEE', {
      "userID": this.props.uid
    }).then(function (response) {
      let i = 0
      let parsed = JSON.parse(JSON.stringify(response.data))
      console.log(parsed.employee[6])
      that.locs = parsed.employee[6]
      that.setState({company:parsed.employee[0]})
      that.forceUpdate()

    }).catch(function (error) {
      console.log(error);
    })/*.then(function(){
      for (let i = 0; i < that.locs.length; i++) {
        that.sh.push(<RadioButton value={i} key={i} label={that.locs[i]} />)
      }
    })*/


  }

  handleClick = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  locChange = (ev, value) => {
    this.setState({ loc: value })
  }

  handleSubmit = () => {
    if (this.state.intern == null || this.state.intern == "") {
      console.log("Please enter an email")
    } else {
      axios.post('/CREATE-INTERN', {
        "username": this.state.intern,
        "location": this.locs,
        "company": this.state.company
      }).then((response) => {
        if (response.data.userID != null) {
          console.log("Success! ID CREATED:" + response.data.userID);

          let url = "http://localhost:3000/register/intern/part1/" + response.data.userID;
          emailjs.init("user_he0zBgUrFvMqcqcm0LHMN");


          emailjs.send("default_service", "welcome_to_pair", {
            toemail: this.state.intern,
            company_name: this.state.company,
            action_url: url
          }).then(
            function (response) {
              console.log("SUCCESS", response);
            },
            function (error) {
              console.log("FAILED", error);
            }
          );


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