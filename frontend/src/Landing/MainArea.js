import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import history from '../history'
import './MainArea.css';
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { List, ListItem, Subheader, Paper } from 'material-ui'

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
      pin: null,
    }
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


  }

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
          <Col xs={6} className="Employees">
          <List>
            <p className="title">Employees</p>
            {this.state.employeeCards}
          </List>
          </Col>
          <Col xs={6} className="Locations">
          <List>
            <p className="title">Locations</p>
            {this.state.locationCards}
          </List>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainArea;
