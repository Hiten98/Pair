import React, { Component } from 'react';
import { RaisedButton, Dialog, TextField, Snackbar } from 'material-ui'
import { grey800, black } from 'material-ui/styles/colors';
import { Row } from 'react-bootstrap'
import axios from 'axios'
import emailjs from 'emailjs-com'
import Password from '../../Forms/Intern/Password';
//import './ChangePasswordModal.css';

axios.defaults.baseURL = "http://localhost:9090";

class ChangePasswordModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      sopen: false,
      newPassword: '',
      oldPassword: '',
    }
  }

  changeNewPass = (p) => {
    this.setState({ newPassword: p })
  }

  changeOldPass = (p) => {
    this.setState({ oldPassword: p })
  }

  handleClose = () => {
    this.props.changePass()
  }

  handleRequestClose = () => {
    this.setState({ sopen: false })
  }

  handleSubmit = () => {
    let that = this
    let op = this.state.oldPassword
    let np = this.state.newPassword

    if (np == op) {
      alert('The new password cannot be a previous password')
    } else if (np.length < 8 || op.length < 8) {
      alert('Both passwords must be at least 8 characters')
    } else {
      axios.post('/RESET-PASSWORD', {
        "userID": that.props.uid,
        "newPassword": np,
        "oldPassword": op,
      }).then((response) => {
        console.log(response.data)
        if (response.data.status) {
          that.setState({ sopen: true })
          that.handleClose()
        } else {
          //Create intern failed
          console.log("Failure!");
          alert('Error: wrong old password')
        }
      }).catch((error) => {
        console.log(error);
      });
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
  }

  actions = [
    <RaisedButton
      label="Cancel"
      onClick={this.handleClose}
    />,
    <RaisedButton
      label="Submit"
      onClick={this.handleSubmit}
    />
  ]

  render() {
    return (
      <Row>
        <Dialog
          title='Change Password'
          modal
          actions={this.actions}
          open={this.props.passOpen}
        >
          <h4>To change your password please enter your new and old passwords</h4>

          <Password changePass={this.changeOldPass} dv='Old Password'/>

          <Password changePass={this.changeNewPass} dv='New Password'/>
        </Dialog>
        <Snackbar
          open={this.state.sopen}
          message='Password changed successfully'
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </Row>
    );
  }
}

export default ChangePasswordModal;