import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import Username from './Username'
import Password from '../EmployeeRegisterForm/password'
import '../EmployeeRegisterForm/NewEmployeeRegister.css';
import { grey800, black, pink900, white } from 'material-ui/styles/colors';
import { Checkbox, RaisedButton } from 'material-ui';
import history from '../history'
import axios from 'axios'

axios.defaults.baseURL = "localhost:9090";

class LandingScreen extends Component {
  constructor(props) {
    super(props)
    
    
  }
  username = null
  componentWillMount() {
    if (this.state.username == null) {
      this.props.updateUid(this.props.uid)
    let email = null
    let that=this

    //KUNAL put code here to get the email and put it in the following variable
    axios.post('/GET-EMAIL', {
      "userID": this.props.uid
    }).then(function (response) {
      if (response.data.email != null) {
        email = response.data.email
        //Put it in the email field
      }
    }).catch(function (error) {
      console.log(error);
    }).then(function(){
      while (true) {
        if (email != null) {
          console.log(email)
          that.username=email
          that.forceUpdate()
          break
        }
      }
    }).then(that.forceUpdate())
    }
  }

  state = {
    username: null,
    password: null,
  }

  buttonSubmit = () => {
    let email = this.username
    let password = this.state.password

    //KUNAL PUT YOUR CODE HERE
    //check to make sure password exists
    if (password == null || password.length < 8) {
      alert("Password is shorter than 8 characters")
    } else {
      axios.post('/SET-INTERN-PASSWORD', {
        "userID":this.props.uid,
        "username": email,
        "password": password,
      }).then(function (response) {
        if (response.data.status == false) {
          console.log("Something went wrong :(")
        } else {
          console.log("Created account password!");
          //Go to preferences p1
          history.push('/intern/user-details')
        }
      }).catch(function (error) {
        console.log(error);
      });

    }

  }

  passChange = (ev) => {
    this.setState({ password: ev.target.value })
    //console.log(this.state.password)
  }

  styles = {
    underlineStyle: {
      borderColor: black,
    },
    floatingLabelStyle: {
      color: grey800,
    },
    floatingLabelShrinkStyle: {
      color: black,
    },
    hintStyle: {
      color: grey800,
      fontWeight: "bold",
      textAlign: 'left',
    },
    visibilityIconStyle: {
      opacity: '0',
    },
    teztfietextFieldStyle: {
      borderBottomColor: black,
      fontWeight: "bold",
    }
  }


  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={1} sm={2}>

          </Col>
          <Col xs={10} sm={8} className="midCol">
            <Row className="Title"> Intern Registration</Row>
            <Row>
              <Username styles={this.styles} email={this.username} />
            </Row>
            <Row>
              <Password styles={this.styles} passChange={this.passChange.bind(this)} />
            </Row>
            <Row className="notThis">
              <RaisedButton
                label="Register Password"
                style={{ marginTop: "20px", }}
                primary
                onClick={this.buttonSubmit}
              />
            </Row>
          </Col>
          <Col xs={1} sm={2}>

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LandingScreen;