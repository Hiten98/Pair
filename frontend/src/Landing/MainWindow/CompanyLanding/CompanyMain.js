import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import history from '../../../history'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { List, ListItem, Paper } from 'material-ui'
import { grey800, black } from 'material-ui/styles/colors';
import InternList from './InternList'

class CompanyMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employeeCards: [],
      locationCards: [],
      pin: null,
      company: props.uid,
    }
  }

  componentDidMount() {
    //console.log(this.props);
    //console.log(this.props.uid);
    var companyName = this.props.uid;

    //Get Company Post Request
    let that = this

    axios.post('/GET-COMPANY-FROM-NAME', {
      "name": companyName
    }).then(function (response) {
      console.log(response.data);
      that.setState({ pin: response.data.pin })

      //Make Cards for Employees
      let tempCard = []
      for (let i in response.data.employees) {
        let temp = parseInt(i) % 2;
        if (temp != 0)
          var backgroundColor = '#D3D3D3'
        else
          var backgroundColor = 'white'
        tempCard.push(
          <Paper zDepth={2} key={i}>
            <ListItem
              primaryText={response.data.employees[i]}
              style={{ background: backgroundColor }}
              disabled={true}
            />
          </Paper>
        )
      }
      that.setState({ employeeCards: tempCard })

      // Make Cards for Locations
      tempCard = []
      for (let i in response.data.locations) {
        let temp = parseInt(i) % 2;
        if (temp != 0)
          var backgroundColor = '#D3D3D3'
        else
          var backgroundColor = 'white'
        tempCard.push(
          <Paper zDepth={2} key={i}>
            <ListItem
              primaryText={response.data.locations[i]}
              style={{ background: backgroundColor }}
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

  render() {
    return (
      <div style={{overflow:'hidden'}}>
        <Row className="companyName">{this.props.uid}</Row>
        <Row style={{marginLeft:'2vw',marginRight:'2vw',overflow:'hidden'}}>
          <Col xs={4} className="Employees" >
            <List>
              <h3>Employees</h3>
              {this.state.employeeCards}
            </List>
          </Col>
          <InternList {...this.props}{...this.state} />

          <Col xs={4} className="Locations" style={{overflowY:'auto'}}>
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

export default CompanyMain;
