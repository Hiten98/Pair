import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Card, CardHeader, Paper, RaisedButton, TextField, Dialog } from 'material-ui';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9090'
//import './LandingScreen.css';

class LandingScreen extends Component {
  people = []
  company = "null"
  cards = []

  componentWillMount() {
    //KUNAL
    //get array of interns from server
    //get company name from server
    let that = this

    axios.post('/GET-MASTER-LIST', {
      userID: this.props.uid
    }).then(function (response) {
      //console.log(response.data)
      if (response.data.userId.charAt(0) == 2) {
        //console.log(response);
        let i = 0
        let parsed = JSON.parse(JSON.stringify(response.data.list))
        //console.log(response.data.list)
        for (var intern in parsed) {
          //console.log(parsed[intern])

          //Show intern titles
          //for(let th in intern)
          //console.log(JSON.parse(JSON.stringify(th)))
          //if (!(parsed[intern].firstName == null || parsed[intern].lastName == null)) {
            that.people[i] = parsed[intern].firstName + ' ' + parsed[intern].lastName
            //i++
          //}
          that.forceUpdate()
        }
      }
    }).catch(function (error) {
      console.log(error);
    });
  }



  style = {
    //height:100,
    //margin:20,
    textAlign: 'left',
    //width:'90%',
  }
  render() {
    for (let i = 0; i < this.people.length; i++) {
      this.cards.push(
        <Card style={this.style}>
          <CardHeader
            title={this.people[i]}
          //subtitle={this.company}
          />
        </Card>
      )
    }
    return (
      <div>
        {this.cards}
      </div>
    );
  }
}

export default LandingScreen;