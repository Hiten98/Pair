import React, { Component } from 'react';
import history from '../history'
import Email from '../Forms/Intern/Email';
import Password from '../Forms/Intern/Password';
import ForgotPasswordSubmit from './ForgotPasswordSubmit.js'
//import './ForgotForm.css';

class ForgotForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      pass1: '',
      pass2: '',
      uid: history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1),
    }
  }

  changeEmail=(email)=>{
    this.setState({email:email})
  }

  changePass1=(pass)=>{
    this.setState({pass1:pass})
  }

  changePass2=(pass)=>{
    this.setState({pass2:pass})
  }

  componentDidMount(){
    if(this.state.uid==''||this.state.uid=='forgot'){
      history.push('/')
    }
  }

  render() {
    return (
      <div>
        <Email uid={this.state.uid} changeEmail={this.changeEmail}/>

        <Password changePass={this.changePass1}/>

        {/* <Password changePass={this.changePass2}/> 

        <h5>The above passwords must match</h5>*/}

        <ForgotPasswordSubmit {...this.state}/>
      </div>
    );
  }
}

export default ForgotForm;