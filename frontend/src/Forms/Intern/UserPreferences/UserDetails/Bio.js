import React, { Component } from 'react';
import { TextField } from 'material-ui'
import { grey800, black } from 'material-ui/styles/colors';
//import './FirstName.css';

class FirstName extends Component {
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
      <TextField
        floatingLabelText="Bio (Optional)"
        className="Description"
        fullWidth
        multiLine
        defaultValue={this.props.dv}
        hintStyle={this.styles.hintStyle}
        floatingLabelStyle={this.styles.floatingLabelStyle}
        floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
        underlineStyle={this.styles.teztfietextFieldStyle}
        onChange={this.props.bioChange}
      />
    );
  }
}

export default FirstName;