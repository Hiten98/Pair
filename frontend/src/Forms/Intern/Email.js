import React, { Component } from 'react';
import PasswordField from 'material-ui-password-field'
import grey800 from 'material-ui/styles/colors'
import history from '../../history'
import axios from 'axios'
//import './Email.css';

axios.defaults.baseURL = "https://glacial-spire-77473.herokuapp.com/";


class Email extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
    }
  }

  styles = {
    underlineStyle: {
      borderColor: grey800,
    },
    visibilityIconStyle: {
      opacity: '0',
    }
  }

  componentDidMount() {
    let that = this
    axios.post('/GET-EMAIL', {
      "userID": this.props.uid
    }).then(function (response) {
      // console.log(response.data)
      if (response.data.email != null) {
        //console.log(response.data)
        that.props.changeEmail(response.data.email)
        that.setState({ email: response.data.email })
        //Put it in the email field
      } else {
        history.push('/home/login')
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (
      <PasswordField
        className="username"
        floatingLabelText="Email"
        value={this.state.email}
        visible
        fullWidth
        disabled
        disableButton
        underlineStyle={this.styles.underlineStyle}
        visibilityIconStyle={this.styles.visibilityIconStyle}
      />
    );
  }
}

export default Email;