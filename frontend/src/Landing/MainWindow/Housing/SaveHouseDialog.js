import React, { Component } from 'react';
import {Dialog, RadioButtonGroup, FlatButton} from 'material-ui';
import axios from 'axios';
//import './SaveHouseDialog.css';

class SaveHouseDialog extends Component {
  constructor(props){
    super(props);
    this.state={
      radioValue: "",
      radios: [],
    };
  }

  handleCloseDialogWithSubmit = () => {
    // console.log(this.state.radioValue);
    // console.log(this.props.uid);
    // console.log(this.props.selectedHouse);
    this.props.handleCloseDialog()
    axios.post("/ADD-HOUSE", {
        name: this.state.radioValue,
        userID: this.props.uid,
        house: this.props.selectedHouse
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
  };

  render() {
    const actions2 = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleCloseDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleCloseDialogWithSubmit}
      />
    ];
    return (
      <Dialog
        title="Choose the chat to save to..."
        actions={actions2}
        modal={false}
        open={this.props.openDialog}
        onRequestClose={this.props.handleCloseDialog}
        autoScrollBodyContent={true}
      >
        <RadioButtonGroup name="shipSpeed" onChange={(event, value) => this.setState({ radioValue: value })}>
          {this.props.radios}
        </RadioButtonGroup>
      </Dialog>
    );
  }
}

export default SaveHouseDialog;
