import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { RaisedButton, Dialog, TextField } from 'material-ui';
import { Row } from 'react-bootstrap'
import axios from 'axios'
//import './ReportIntern.css';

class ReportIntern extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      reason: '',
    }
    console.log(props)
  }

  handleSubmit = () => {
    if (this.state.reason != null) {
      alert('Please enter a reason')
    } else {
      axios.post('/CREATE-INTERN', {
        modID: null,
        userID: null,
        to: null,
        from: null,
        complaint: this.state.reason,
      }).then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  openModal = () => {
    this.setState({ open: true })
  }

  closeModal = () => {
    this.setState({ open: false })
  }

  actions = [
    <RaisedButton
      label="Cancel"
      onClick={this.closeModal}
    />,
    <RaisedButton
      label="Report"
      onClick={this.handleSubmit}
    />
  ]

  render() {
    return (
      <div>
        {(this.props.currProfile != this.props.uid) ?
          <RaisedButton
            secondary
            label='Report'
            onClick={this.openModal}
          /> :
          <div></div>}
        <Dialog
          title={`Report this user?`}
          modal
          actions={this.actions}
          open={this.state.open}
        >
          <Row style={{ width: '90%', marginLeft: '5%' }}>
            <TextField
              fullWidth
              multiLine
              floatingLabelText="Enter the reason why you are reporting this user (required)"
              onChange={this.changeReason}
            />
          </Row>
        </Dialog>
      </div>
    );
  }
}

export default ReportIntern;
