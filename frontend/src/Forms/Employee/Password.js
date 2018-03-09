import React, { Component } from 'react';
import PasswordField from 'material-ui-password-field'
import { grey800, black, red900 } from 'material-ui/styles/colors';
//import './Password.css';

class Password extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conditions: null,
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
      //fontWeight: "bold",
      textAlign: 'left',
    },
  }

  passChange = (ev) => {
    if (ev.target.value.length < 8) {
      this.setState({ conditions: { errorText: "Your password is too short", errorStyle: { color: red900 } } })
    } else {
      this.setState({ conditions: null })
    }
    this.props.change(ev.target.value)
  }



  render() {
    return (
      <div style={{height:'90px'}}>
        <PasswordField
          className="password"
          hintText="At least 8 characters"
          floatingLabelText="Password"
          value={this.props.dv}
          floatingLabelStyle={this.styles.floatingLabelStyle}
          floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
          underlineStyle={this.styles.underlineStyle}
          visibilityIconStyle={{ opacity: '0.8' }}
          fullWidth
          hintStyle={this.styles.hintStyle}
          onChange={this.passChange}
          {...this.state.conditions}
        />
      </div>
    );
  }
}

export default Password;