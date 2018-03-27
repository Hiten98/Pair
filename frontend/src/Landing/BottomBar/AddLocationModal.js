import React, { Component } from 'react';
import { RaisedButton, Dialog, TextField, Snackbar } from 'material-ui'
import { grey800, black } from 'material-ui/styles/colors';
import { Row } from 'react-bootstrap'
import axios from 'axios'
//import './ForgotPasswordModal.css';

axios.defaults.baseURL = 'localhost:9090'

class AddLocationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      locations: '',
      sopen:false,
      company: '',
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  locationsChange = (ev) => {
    this.setState({ locations: ev.target.value })
  }

  handleRequestClose=()=>{
    this.setState({sopen:false})
  }

  handleSubmit = () => {
    let locations = this.state.locations;
    let locationsParsed = locations.split(';');
    //console.log(locationsParsed);
    let that = this

    if (!(new RegExp('^((([A-Za-z ,]+;)+[A-Za-z ,]+)|[A-Za-z ,]+)+$')).test(locations)) {
      alert("Locations format is invalid")
    } else if (locationsParsed != "") {

      axios.post('/UPDATE-COMPANY', {
        "companyName": this.props.companyName,
        "locations": locationsParsed,
        "employees": []
      }).then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.log(error);
      });

      this.setState({ open: false })
      that.setState({sopen:true})

    } else {
      alert('Please Enter a Location before clicking Add')
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
      label="Add"
      onClick={this.handleSubmit}
    />
  ]

  render() {
    return (
      <Row>
        <RaisedButton
          label='Add Location'
          primary
          onClick={this.handleOpen}
          style={{ marginTop: '5%' }}
        />
        <Dialog
          title='Add Location'
          modal
          actions={this.actions}
          open={this.state.open}
        >
          <TextField
            floatingLabelText="Enter new Locations separated by a semicolon"
            floatingLabelStyle={this.styles.floatingLabelStyle}
            floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
            fullWidth
            underlineStyle={this.styles.underlineStyle}
            onChange={this.locationsChange}
          />
        </Dialog>
        <Snackbar
          open={this.state.sopen}
          message='Locations successfully added'
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </Row>
    );
  }
}

export default AddLocationModal;
