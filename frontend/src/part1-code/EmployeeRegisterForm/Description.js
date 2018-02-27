import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { TextField } from 'material-ui';
//import './LandingScreen.css';

class Description extends Component {
  render() {
    return (
      <TextField
        floatingLabelText="Bio (Optional)"
        className="Description"
        fullWidth
        multiLine
        defaultValue={this.props.dv}
        hintStyle={this.props.styles.hintStyle}
        floatingLabelStyle={this.props.styles.floatingLabelStyle}
        floatingLabelShrinkStyle={this.props.styles.floatingLabelShrinkStyle}
        underlineStyle={this.props.styles.teztfietextFieldStyle}
        onChange={this.props.descriptionChange}
      />
    );
  }
}

export default Description;