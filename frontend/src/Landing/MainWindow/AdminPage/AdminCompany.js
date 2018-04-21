import React, { Component } from 'react';
import history from '../../../history';
import axios from 'axios'
import { Card, CardHeader, CardText, CardActions, RaisedButton } from 'material-ui';
//import './AdminCompany.css';

class AdminCompany extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pendingCompanies: [],
      deniedCompanies: [],
    }
    // console.log(props)
    if (props.type!='' && props.type != 'admin') {
      alert('Error: You don\'t have the required permissions')
      history.push('/')
    }
  }

  componentDidMount = () => {
    let that = this
    this.setState({pendingCompanies:[],deniedCompanies:[]})
    axios.post("/GET-ADMIN-COMPANIES", {
    }).then(function (response) {
      // console.log(response.data)
      let tempDenied=[]
      let tempPending=[]
      for (let i in response.data) {
        // console.log(response.data[i])
        axios.post("/GET-COMPANY-FROM-NAME", {
          name: response.data[i]
        }).then(function (response2) {
          // console.log(response2.data)
          let tempLocations = []
          for (let k in response2.data.locations) {
            tempLocations.push(
              <h5 key={k}>{response2.data.locations[k]}</h5>
            )
          }
          let tempItem = (
            <Card key={i} style={{ marginTop: '10px', marginLeft: '10px', marginRight: '20px' }}>
              <CardHeader
                title={<h2>{response.data[i]}</h2>}
              />
              <CardText style={{ marginTop: '-40px' }}>
                <h5><b>Contact Email:</b> {response2.data.email}</h5>
                <h5><b>Locations:</b></h5>
                {tempLocations}
              </CardText>
              <CardActions style={{ marginTop: '-20px' }}>
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

          if (response2.data.verified == 'pending') {
            // let tempPending=that.state.pendingCompanies
            tempPending[response.data[i]]=tempItem
            // that.setState({ pendingCompanies: tempPending })
          } else if (response2.data.verified == false) {
            // console.log('hi')
            // let tempDenied=that.state.deniedCompanies
            tempDenied[response.data[i]]=tempItem
            // that.setState({ deniedCompanies: tempDenied })
          }
          that.setState({ pendingCompanies: tempPending, deniedCompanies:tempDenied })
        }).catch(function (error) {
          console.log(error);
        })
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  getItems=(arr)=>{
    // console.log(arr)
    let tempArr=[]
    for(let i in arr)
      tempArr.push(arr[i])
    return(tempArr)
  }

  checkItems=(arr)=>{
    let numItem=0
    for(let i in arr)
      numItem++
    // console.log(numItem)
    return (numItem>0)
  }

  handleAccept = (company) => {
    let that = this
    axios.post('/ACCEPT-COMPANY', {
      "name": company
    }).then(function (response) {
      // console.log(response.data);
      if (response.data.status != false)
        that.componentDidMount()

    }).catch(function (error) {
      console.log(error);
    });
  }

  handleDeny = (company) => {
    let that = this
    axios.post('/DENY-COMPANY', {
      "name": company
    }).then(function (response) {
      // console.log(response.data);
      if (response.data.status != false)
        that.componentDidMount()

    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div style={{ textAlign: 'left', marginLeft: '10px' }}>
        {this.checkItems(this.state.pendingCompanies) ?
          <div>
            <h1>Pending</h1>
            {this.getItems(this.state.pendingCompanies)}
          </div>
          : null}
        {this.checkItems(this.state.deniedCompanies) ?
          <div>
            <h1>Denied</h1>
            {this.getItems(this.state.deniedCompanies)}
          </div>
          : null}
      </div>
    );
  }
}

export default AdminCompany;
