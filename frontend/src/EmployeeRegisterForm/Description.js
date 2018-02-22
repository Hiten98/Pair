import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { TextField } from 'material-ui';
//import './LandingScreen.css';

class Description extends Component {
  render() {
    return (
      <TextField
        hintText="Bio (Optional)"
        className="Description"
        fullWidth
        multiLine
        hintStyle={this.props.styles.hintStyle}
        underlineStyle={this.props.styles.teztfietextFieldStyle}
        onChange={this.props.descriptionChange}
      />
    );
  }
}

export default Description;