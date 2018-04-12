import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import history from '../../../history';
import axios from 'axios'
import { Card, CardHeader, CardText, CardActions, RaisedButton } from 'material-ui';
//import './AdminCompany.css';

class AdminCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companies: [],
    }
    // console.log(props)
    if (props.type != 'admin' && props.uid != '') {
      alert('Error: You don\'t have the required permissions')
      history.push('/')
    }
  }

  componentDidMount = () => {
    let that = this
    let tempCards = []
    axios.post("/GET-ADMIN-COMPANIES", {
    }).then(function (response) {
      console.log(response.data)
      for (let i in response.data) {
        axios.post("/GET-COMPANY-FROM-NAME", {
          companyName: response.data[i]
        }).then(function (response2) {
          console.log(response2.data)
          let tempLocations = []
          for (let k in response2.data.listOfLocations) {
            tempLocations.push(
              <p key={k}>{response.data.listOfLocations[k]}</p>
            )
          }
          tempCards.push(
            <Card key={i}>
              <CardHeader
                title={response.data[i]}
              />
              <CardText>
                <h5><b>Contact Email:</b> {response2.data.email}</h5>
                <h5><b>Locations:</b></h5>
                {tempLocations}
              </CardText>
              <CardActions>
                <RaisedButton
                  label='Accept Company'
                  onClick={() => that.handleAccept(response.data[i])}
                />
                <RaisedButton
                  label='Deny Company'
                  onClick={() => that.handleDeny(response.data[i])}
                />
              </CardActions>
            </Card>
          )
        }).catch(function (error) {
          console.log(error);
        })
      }
      that.setState({ companies: tempCards })
    }).catch(function (error) {
      console.log(error);
    })
  }

  // handleAccept=()

  render() {
    return (
      <div>
        {this.state.companies}
      </div>
    );
  }
}

export default AdminCompany;
