import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import './NewEmployeeRegister.css';
import { TextField, Checkbox } from 'material-ui';
import PasswordField from 'material-ui-password-field'
import { grey800, black, pink900, white } from 'material-ui/styles/colors';

//needed in here
//email
//password
//where they want to moderate
//profile pic
//description
//links

class NewEmployeeRegister extends Component {
  item = []
  constructor(props) {
    super(props)
    let i=0;
    for (let a of props.companyLocationList()) {
      this.item.push(<Checkbox label={a} key={i} onCheck={this.handleCheck.bind(this)}/>)
      i++;
    }
  }

  handleCheck=(i,checked)=>{
    if(checked){
      console.log(i)
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
      fontSize: '10vw',
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
              <PasswordField
                className="username"
                floatingLabelText="Email"
                visible
                fullWidth
                disableButton={true}
                floatingLabelStyle={this.styles.floatingLabelStyle}
                floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
                underlineStyle={this.styles.underlineStyle}
                hintStyle={this.styles.hintStyle}
                visibilityIconStyle={this.styles.visibilityIconStyle}
                onChange={this.userChange}
              />
            </Row>
            <Row>
              <PasswordField
                className="password"
                hintText="At least 8 characters"
                floatingLabelText="Password"
                floatingLabelStyle={this.styles.floatingLabelStyle}
                floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
                underlineStyle={this.styles.underlineStyle}
                visibilityIconStyle={{ opacity: '0.8' }}
                fullWidth
                hintStyle={this.styles.hintStyle}
                onChange={this.passChange}
              />
            </Row>
            <Row>
              Company Locations:<br />
              {this.item}

            </Row>

            <Row>
              <TextField
                hintText="Description"
                className="Description"
                fullWidth
                multiLine
                hintStyle={this.styles.floatingLabelStyle}
                underlineStyle={this.styles.teztfietextFieldStyle}
              />
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