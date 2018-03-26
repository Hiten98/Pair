import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { RaisedButton, Dialog, TextField, DropDownMenu, MenuItem, Snackbar } from 'material-ui';
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
//import './ReportIntern.css';

class ReportIntern extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      sopen: false,
      reason: '',
      fromPerson: '',
      toPerson: '',
      moduid: 0,
      uid: '',
      modList: [],
      chatName: '',
    }
    // console.log(props)
  }

  handleSubmit = () => {
    // console.log(this.state)
    if (this.state.reason == '') {
      alert('Please enter a reason')
    } else if (this.state.moduid == 0) {
      alert('Please choose a moderator')
    } else {
      axios.post('/CREATE-COMPLAINT', {
        modID: this.state.moduid,
        userID: this.state.uid,
        to: this.state.toPerson,
        from: this.state.fromPerson,
        complaint: this.state.reason,
      }).then((response) => {
        // console.log(response.data)
        if (response.data.status) {
          this.setState({ open: false, sopen: true })
        }
      }).catch((error) => {
        console.log(error);
      });
      // console.log(this.state)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.currProfile != nextProps.currProfile) {
      this.setState({ uid: nextProps.currProfile })
      axios.post('/GET-INTERN', {
        userID: nextProps.currProfile
      }).then((response) => {
        // console.log(response.data)
        this.setState({ toPerson: `${response.data.firstName} ${response.data.lastName}` })
      }).catch((error) => {
        console.log(error);
      });
      this.getModList(nextProps)
    }
  }

  componentDidMount = () => {
    // console.log(this.props.props.state.currChatName)
    axios.post('/GET-INTERN', {
      userID: this.props.uid
    }).then((response) => {
      // console.log(response.data)
      this.setState({ fromPerson: `${response.data.firstName} ${response.data.lastName}` })
    }).catch((error) => {
      console.log(error);
    });
    this.getModList(this.props)
  }

  getModList = (props) => {
    let that = this
    this.setState({ chatName: props.props.state.currChatName, moduid: 0 })
    if (props.props.state.currChatName.substring(0, 1) == 1) {
      axios.post('/GET-MODS-IN-CHATROOM', {
        chatroomName: props.props.state.currChatName
      }).then((response) => {
        // console.log(response.data)
        let tempList = []
        tempList.push(<MenuItem value={0} key={0} primaryText='Choose a moderator' />)
        for (let i in response.data) {
          let splitted = response.data[i].split('$:$')
          tempList.push(
            <MenuItem value={splitted[0]} key={parseInt(i) + 1} primaryText={splitted[1]} />
          )
        }
        that.setState({ modList: tempList })
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.setState({ moduid: '4000' })
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

  changeMod = (event, target, value) => {
    this.setState({ moduid: value })
  }

  changeReason = (ev) => {
    // console.log(ev.target.value)
    this.setState({ reason: ev.target.value })
  }

  handleRequestClose = () => {
    this.setState({
      sopen: false,
    });
  };

  render() {
    // console.log(this.state)
    return (
      <div>
        {(this.props.currProfile != this.props.uid && this.props.props.type == 'intern' && this.props.currProfile.substring(0, 1) != 2) ?
          <Col xs={4}>
            <RaisedButton
              secondary
              label='Report'
              onClick={this.openModal}
            />
          </Col> :
          <div></div>}
        <Dialog
          title={`Report ${this.state.toPerson}?`}
          modal
          actions={this.actions}
          open={this.state.open}
        >
          {(this.state.chatName.substring(0, 1) == 1) ?
            <Row>
              <h5 style={{ marginLeft: '3%' }}>{`Please choose the moderator you want to report ${this.state.toPerson} to`}</h5>
              <DropDownMenu
                style={{ marginLeft: '0%' }}
                value={this.state.moduid}
                onChange={this.changeMod}
              >
                {this.state.modList}
              </DropDownMenu>
            </Row> : <div></div>}
          <Row style={{ width: '90%', marginLeft: '1%' }}>
            <TextField
              fullWidth
              multiLine
              floatingLabelText={`Enter the reason why you are reporting ${this.state.toPerson} (required)`}
              onChange={this.changeReason}
            />
          </Row>
        </Dialog>
        <Snackbar
          open={this.state.sopen}
          message={`${this.state.toPerson} has been reported`}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default ReportIntern;
