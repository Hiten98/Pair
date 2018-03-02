import React, { Component } from 'react';
import history from '../../history'
import Email from './Email.js'
import Password from './Password'
import CreationButtons from './CreationButtons'
//import './InternCreation.css';

class InternCreation extends Component {
  constructor(props){
    super(props)
    this.state={
      uid:null,
      email:null,
      pass:null,
    }
  }

  userID=history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1)

  changeEmail=(email)=>{
    this.setState({email:email})
  }

  changePass=(pass)=>{
    this.setState({pass:pass})
  }

  componentDidMount(){
    this.setState({
      uid:this.userID,
    })
    this.props.updateUid(this.userID)
  }

  render() {
    return (
      <div>
        <Email uid={this.userID} changeEmail={this.changeEmail} />

        <Password changePass={this.changePass}/>

        <CreationButtons username={this.state.email} password={this.state.password} uid={this.state.uid}/>
      </div>
    );
  }
}

export default InternCreation;