import React, { Component } from 'react';
import { RaisedButton, Dialog, TextField, Snackbar } from 'material-ui'
import { grey800, black } from 'material-ui/styles/colors';
import { Row } from 'react-bootstrap'
import axios from 'axios'
import history from '../../history'
//import './DeleteAccountModal.css';

axios.defaults.baseURL = "localhost:9090";

class DeleteAccountModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      sopen: false,
    }
  }

  handleClose = () => {
    try {
      localStorage.removeItem('app')
    } catch (err) {
      //console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
    history.go(0)
  }

  handleRequestClose = () => {
    this.setState({ sopen: false })
  }

  handleSubmit = () => {
    let that = this

    axios.post('/REMOVE-USER', {
      "userID": that.props.uid
    }).then((response) => {
      //console.log(response.data)
      if (response.data.status) {
        that.setState({ sopen: true },that.handleClose)
        
      } else {
        //Create intern failed
        console.log("Failure!");
        alert('Error: try again')
      }
    }).catch((error) => {
      console.log(error);
    });
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
      label="No"
      onClick={this.handleClose}
    />,
    <RaisedButton
      label="Yes, I'm sure"
      onClick={this.handleSubmit}
    />
  ]

  render() {
    return (
      <Row>
        <Dialog
          title='Delete Account'
          modal
          actions={this.actions}
          open={this.props.deleteOpen}
        >
          <h4>Are you sure you want to delete your account? This cannot be undone</h4>
        </Dialog>
        <Snackbar
          open={this.state.sopen}
          message='Account deleted successfully'
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </Row>
    );
  }
}

export default DeleteAccountModal;