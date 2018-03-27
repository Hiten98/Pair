import React, { Component } from 'react';
import { RaisedButton, Dialog, TextField, Snackbar } from 'material-ui'
import { grey800, black } from 'material-ui/styles/colors';
import { Row } from 'react-bootstrap'
import axios from 'axios'
import emailjs from 'emailjs-com'
//import './ForgotPasswordModal.css';

axios.defaults.baseURL = 'localhost:9090'

class AddEmployeeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      email: '',
      sopen:false,
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  emailChange = (ev) => {
    this.setState({ email: ev.target.value })
  }

  handleRequestClose=()=>{
    this.setState({sopen:false})
  }

  handleSubmit = () => {
    //TODO: this doesn't actually work yet, need to get email information from kunal and testing if an email is valid
    let email = this.state.email
    let that = this

    if (!(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(email)) {
      alert("Email is invalid")
    } else {
      //Get pin

      let url = "http://localhost:3000/home/register";
      emailjs.init("user_he0zBgUrFvMqcqcm0LHMN");


      emailjs.send("default_service", "employee_invite", {
        toemail: email,
        action_url: url,
        companyCode: this.props.pin
      }).then(
        function (response) {
          console.log("SUCCESS", response);
          that.setState({sopen:true})
          that.handleClose()
        },
        function (error) {
          console.log("FAILED", error);
          alert('Email did not send, try again')
        }
      );
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
      label="Send Email"
      onClick={this.handleSubmit}
    />
  ]

  render() {
    return (
      <Row>
        <RaisedButton
          label={'+ Employee'}
          primary
          onClick={this.handleOpen}
          style={{ marginTop: '5%' }}
        />
        <Dialog
          title='Add Employee'
          modal
          actions={this.actions}
          open={this.state.open}
        >
          <h4>An email with a link to sign up for Pair will be sent to this email</h4>
          <TextField
            floatingLabelText="Enter Employee's email"
            floatingLabelStyle={this.styles.floatingLabelStyle}
            floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
            fullWidth
            underlineStyle={this.styles.underlineStyle}
            onChange={this.emailChange}
          />
        </Dialog>
        <Snackbar
          open={this.state.sopen}
          message='Email successfully sent'
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </Row>
    );
  }
}

export default AddEmployeeModal;
