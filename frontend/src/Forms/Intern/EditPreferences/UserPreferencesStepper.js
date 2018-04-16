import React, { Component } from 'react';
import { Step, Stepper, StepButton, Dialog, RaisedButton } from 'material-ui'
import history from '../../../history'
//import './LandingScreen.css';

class UserPreferencesStepper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      place: 0,
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleCloseLeave=()=>{
    this.props.changeChanged(false)
    this.handleClose()
    if(this.state.place===1){
      this.props.changePage(1)
      history.push('/register/intern/edit-profile/user-details')
    }else if(this.state.place===2){
      this.props.changePage(2)
      history.push('/register/intern/edit-profile/roommate')
    }else if(this.state.place===3){
      this.props.changePage(3)
      history.push('/register/intern/edit-profile/housing')
    }
  }

  changeToUser = () => {
    if (this.props.changed) {
      this.setState({place:1})
      this.handleOpen()
    } else {
      this.props.changePage(1)
      history.push('/register/intern/edit-profile/user-details')
    }
  }

  changeToRoommate = () => {
    if (this.props.changed) {
      this.setState({place:2})
      this.handleOpen()
    } else {
      this.props.changePage(2)
      history.push('/register/intern/edit-profile/roommate')
    }
  }

  changeToHousing = () => {
    if (this.props.changed) {
      this.setState({place:3})
      this.handleOpen()
    } else {
      this.props.changePage(3)
      history.push('/register/intern/edit-profile/housing')
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

    //to check if a mobile device
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    let orient = ''
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 768) {
      orient = 'vertical'
    } else {
      orient = 'horizontal'
    }

    return (
      <div>
        <Stepper
          linear={false}
          activeStep={this.props.pos - 1}
          orientation={orient}
        >
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

export default UserPreferencesStepper;