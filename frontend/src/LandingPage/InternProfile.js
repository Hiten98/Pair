import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
//import './LandingScreen.css';
import { Card, CardHeader, Paper, RaisedButton, TextField, Dialog } from 'material-ui';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9090'

class InternProfile extends Component {
  cards=[]
  cardd=[]

  style = {
    //height:100,
    //margin:20,
    textAlign: 'left',
    //width:'90%',
  }

  componentWillMount() {
    let that=this
    axios.post("/GET-INTERN", {
      "userID": this.props.uid
    }).then(function (response) {
      let profile = JSON.parse(JSON.stringify(response.data))
      for (let line in profile) {
        console.log("Hi")
        //console.log(profile[line][0].description)
        //that.cards.push(<Card style={that.style}><CardHeader title={`Name ${} ${}`})
        that.cards.push(<h1 key={0}>Profile:</h1>)
        that.cards.push('Name: '+profile[line][3]+" "+profile[line][4])
        that.cards.push('Bio: '+profile[line][0].description)
        that.cards.push('Facebook Link: '+profile[line][0].fbLink)
        that.cards.push('LinkedIn Link: '+profile[line][0].linkedInLink)
        that.cards.push('Twitter Link: '+profile[line][0].twitterLink)
        that.cards.push('Company: '+ profile[line][1])
        console.log(profile)
        that.forceUpdate()
      }
      
      
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {
    for (let i = 0; i < this.cards.length; i++) {
      this.cardd.push(
        <Card style={this.style}>
          <CardHeader
            title={this.cards[i]}
          //subtitle={this.company}
          />
        </Card>
      )
    }
    return (
      <div>
        {this.cardd}
      </div>
    );
  }
}

export default InternProfile;