import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import history from '../history'
import './MainArea.css';
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import {List, ListItem, Subheader, Paper, RaisedButton, Dialog, TextField, Snackbar} from 'material-ui'
import { grey800, black } from 'material-ui/styles/colors';

class MainArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classChat: [
        'text-display chat-display', 'text-display'
      ],
      currPlace: 1,
      employeeCards: [],
      locationCards: [],
      internsCard: [],
      pin: null,
      removeInternUID: null,
      open: false,
      sopen:false,
    }
  }

  removeInternModal = (ev) => {
    console.log(ev);
    this.setState({ removeInternUID: ev });
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleRequestClose=()=>{
    this.setState({sopen:false})
  }

  removeIntern = () => {
    console.log(this.state.removeInternUID);
    let that = this
    axios.post('/REMOVE-USER', {
      "userID": this.state.removeInternUID
    }).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error);
    });

    this.setState({ open: false })
    that.setState({sopen:true})
  }

  componentDidMount() {
    if (history.location.pathname.includes('/landing/interns/chat') || history.location.pathname.includes('/landing/employee/chat'))
      this.setState({ currPlace: 0 })
    else
      this.setState({ currPlace: 1 })

    //console.log(this.props);
    //console.log(this.props.uid);
    var companyName = this.props.uid;

    //Get Company Post Request
    let that = this

    axios.post('/GET-COMPANY-FROM-NAME', {
      "name": companyName
    }).then(function (response) {
      //console.log(response.data);
      that.setState({ pin: response.data.pin })

      //Make Cards for Employees
      let tempCard=[]
      for (let i in response.data.employees) {
        let temp = parseInt(i) % 2;
        if (temp != 0)
          var backgroundColor='#D3D3D3'
        else
          var backgroundColor='white'
        tempCard.push(
          <Paper zDepth={2} key={i}>
            <ListItem
              primaryText={response.data.employees[i]}
              style={{background:backgroundColor }}
              disabled={true}
            />
          </Paper>
        )
      }
      that.setState({ employeeCards: tempCard })

      // Make Cards for Locations
      tempCard=[]
      for (let i in response.data.locations) {
        let temp = parseInt(i) % 2;
        if (temp != 0)
          var backgroundColor='#D3D3D3'
        else
          var backgroundColor='white'
        tempCard.push(
          <Paper zDepth={2} key={i}>
            <ListItem
              primaryText={response.data.locations[i]}
              style={{background:backgroundColor }}
              disabled={true}
            />
          </Paper>
        )
      }
      that.setState({ locationCards: tempCard })


    }).catch(function (error) {
      console.log(error);
    });

    // Get Master List of Interns
    that = this

    axios.post('/GET-MASTER-LIST-COMPANY', {
      "companyName": companyName
    }).then(function (response) {
      console.log(response.data);

      // Make Cards for INTERNS
      let tempCard=[]
      for (let i in response.data) {
        let temp = parseInt(i) % 2;
        if (temp != 0)
          var backgroundColor='#D3D3D3'
        else
          var backgroundColor='white'
        tempCard.push(
          <Paper zDepth={2} key={i}>
            <ListItem
              primaryText={response.data[i].firstName + ' ' + response.data[i].lastName}
              //style={{background:backgroundColor }}
              hoverColor='#D3D3D3'
              onClick={() => that.removeInternModal(i)}
            />
          </Paper>
        )
      }
      that.setState({ internsCard: tempCard })

    }).catch(function (error) {
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
      label="NO"
      onClick={this.handleClose}
    />,
    <RaisedButton
      label="YES"
      onClick={this.removeIntern}
    />
  ]

  render() {
    return (
      <div>
        <Row className={this.state.classChat[this.state.currPlace]}>
          <Switch>
            <Route path='/landing/employee' />
            <Route path='/landing/interns' />
            <Route path='/landing/company' />
          </Switch>
          <p className="companyName">{this.props.uid}</p>
          <Col xs={4} className="Employees">
          <List>
            <h3>Employees</h3>
            {this.state.employeeCards}
          </List>
          </Col>
          <Col xs={4} className="Interns">
          <List>
            <h3>Interns</h3>
            {this.state.internsCard}
          </List>
          <Dialog
            title='Would you like to remove this intern?'
            modal
            actions={this.actions}
            open={this.state.open}
          >
          </Dialog>
          <Snackbar
            open={this.state.sopen}
            message='Intern successfully removed'
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          </Col>
          <Col xs={4} className="Locations">
          <List>
            <h3>Locations</h3>
            {this.state.locationCards}
          </List>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainArea;
