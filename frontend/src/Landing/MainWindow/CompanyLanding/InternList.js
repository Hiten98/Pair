import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import {Paper,List,ListItem,RaisedButton,Dialog,Snackbar} from 'material-ui'
import {Col} from 'react-bootstrap'
//import './InternList.css';

class InternList extends Component {
  constructor(props){
    super(props)
    this.state={
      internsCard: [],
      open: false,
      sopen: false,
      removeInternUID: null,
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

  handleRequestClose = () => {
    this.setState({ sopen: false })
  }

  removeIntern = () => {
    //console.log(this.state.removeInternUID);
    let that = this
    axios.post('/REMOVE-USER', {
      "userID": this.state.removeInternUID
    }).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error);
    });

    this.setState({ open: false })
    that.setState({ sopen: true })
  }

  componentDidMount=()=>{
    let that=this
    // console.log(this.props)
    axios.post('/GET-MASTER-LIST-COMPANY', {
      "companyName": this.props.uid
    }).then(function (response) {
      // console.log(response.data);

      // Make Cards for INTERNS
      let tempCard = []
      for (let i in response.data) {
        let temp = parseInt(i) % 2;
        if (temp != 0)
          var backgroundColor = '#D3D3D3'
        else
          var backgroundColor = 'white'
        let name=response.data[i].firstName + ' ' + response.data[i].lastName
        if(response.data[i].firstName=='undefined')
          name='*Intern has not accepted yet*'
        tempCard.push(
          <Paper zDepth={2} key={i}>
            <ListItem
              primaryText={name}
              secondaryText={response.data[i].email}
              //style={{background:backgroundColor }}
              hoverColor='#F95498B0'
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
      <Col xs={4} className="Interns" style={{overflowY:'auto'}}>
        <List>
          <h3>Interns</h3>
          {this.state.internsCard}
        </List>
        <Dialog
          title='Would you like to remove this intern? This cannot be undone'
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
    );
  }
}

export default InternList;
