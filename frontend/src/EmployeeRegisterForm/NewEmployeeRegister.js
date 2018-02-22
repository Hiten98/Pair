import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import './NewEmployeeRegister.css';
import { Checkbox } from 'material-ui';
import PasswordField from 'material-ui-password-field'
import { grey800, black, pink900, white } from 'material-ui/styles/colors';
import Username from './Username.js'
import Password from './password.js';
import Description from './Description';
import hiistory from '../history.js'

//needed in here
//email
//password
//where they want to moderate
//profile pic
//description
//links

class NewEmployeeRegister extends Component {
  state = {
    username: null,
    password: null,
    checked: [],
    description: null,
    facebook:null,
    linkedin:null,
  }

  handleCheck = (ev) => {
    console.log(ev.target.value)
    let arr=this.state.checked
    if(arr.indexOf(`${ev.target.value}`)>-1){
      arr.splice(arr.indexOf(`${ev.target.value}`),1)
    } else {
      arr.push(`${ev.target.value}`)
    }
    this.setState({checked:arr})
    console.log(this.state.checked)
  }

  userChange = (ev) => {
    this.setState({ username: ev.target.value })
    //console.log(this.state.username)
  }

  passChange = (ev) => {
    this.setState({ password: ev.target.value })
    //console.log(this.state.password)
  }

  descriptionChange = (ev) => {
    this.setState({ description: ev.target.value })
    //console.log(this.state.description)
  }

  componentWillMount(){
    let i=0
    for(let a of this.props.companyLocationList()){
      this.props.item.push(<Checkbox label={a} key={i} value={a} onCheck={this.handleCheck}/>)
      i++
    }
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
          <Col xsHidden={true} sm={2}>

          </Col>
          <Col xs={12} sm={8} className="midCol">
            <Row>
              <Username styles={this.styles} userChange={this.userChange.bind(this)} />
            </Row>
            <Row>
              <Password styles={this.styles} passChange={this.passChange.bind(this)} />
            </Row>
            <Row className="checkboxes">
              Company Locations:<br />
              {this.props.item}
            </Row>

            <Row>
              <Description styles={this.styles} descriptionChange={this.descriptionChange.bind(this)} />
            </Row>
          </Col>
          <Col xsHidden sm={2}>

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default NewEmployeeRegister;