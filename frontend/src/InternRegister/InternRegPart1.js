import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import Username from './Username'
import Password from '../EmployeeRegisterForm/password'
import '../EmployeeRegisterForm/NewEmployeeRegister.css';
import { grey800, black, pink900, white } from 'material-ui/styles/colors';
import { Checkbox, RaisedButton } from 'material-ui';
import history from '../history'

class LandingScreen extends Component {
  constructor(props){
    super(props)
    props.updateUid(props.uid)

    //KUNAL put code here to get the email and put it in the following variable
    let email=null
    this.setState({username:email})
  }

  state={
    username:null,
    password:null,
  }

  buttonSubmit=()=>{
    let email=this.state.username
    let password=this.state.password

    //KUNAL PUT YOUR CODE HERE
    //check to make sure password exists
    history.push('/intern/user-details')
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
              <Username styles={this.styles} email={this.state.username}/>
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