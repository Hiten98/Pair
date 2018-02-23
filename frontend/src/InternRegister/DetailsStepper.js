import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Step, Stepper, StepButton, Dialog, RaisedButton } from 'material-ui'
import history from '../history'
//import './LandingScreen.css';

class DetailsStepper extends Component {
  state = {
    open: false,
    place: null,
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  leave = (place) => {
    if(place!=null)
    history.push(place)
  }

  handleCloseLeave=()=>{
    console.log(this.state.place)
    if(this.state.place!=null){
      history.push(this.state.place)
    }
  }

  changeToUser = () => {
    if (this.props.pos != 1) {
      this.setState({ place: '/intern/user-details' })
      if (this.props.hasChanged) {
        this.handleOpen()
      } else {
        this.leave('/intern/user-details')
      }
      this.setState({place:null})
    }
  }

  changeToRoommate = () => {
    if (this.props.pos != 2) {
      this.setState({ place: '/intern/roommate-preferences' })
      if (this.props.hasChanged) {
        this.handleOpen()
      } else {
        this.leave('/intern/roommate-preferences')
      }
      this.setState({place:null})
    }
  }

  changeToHousing = () => {
    if (this.props.pos != 3) {
      this.setState({ place: '/intern/housing-preferences' })
      if (this.props.hasChanged) {
        this.handleOpen()
      } else {
        this.leave('/intern/housing-preferences')
      }
      this.setState({place:null})
    }
  }

  render() {
    const actions = [
      <RaisedButton
        label="Discard Changes"
        onClick={this.handleCloseLeave}
      />,
      <RaisedButton
        label="Stay on Page"
        onClick={this.handleClose}
      />
    ]
    return (
      <div>
        <Stepper linear={false} activeStep={this.props.pos-1}>
          <Step>
            <StepButton onClick={this.changeToUser}> User Details </StepButton>
          </Step>
          <Step>
            <StepButton onClick={this.changeToRoommate}>Roommate Preferences</StepButton>
          </Step>
          <Step>
            <StepButton onClick={this.changeToHousing}>Housing Preferences</StepButton>
          </Step>

        </Stepper>
        <Dialog
          actions={actions}
          modal
          open={this.state.open}
        >
          Do you wish to leave this page and discard changes?
        </Dialog>
      </div>
    );
  }
}

export default DetailsStepper;