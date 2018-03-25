import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import People from './PersonList/People'
import DisplayProfile from './DisplayProfile/DisplayProfile'
//import './Members.css';

class Members extends Component {
  constructor(props){
    super(props)
    this.state={
      currProfile:this.props.uid,
      currPaper:0,
      temp:false,
    }
    props.resetPeople()
  }

  changeSelected=(cp,i)=>{
    this.setState({currProfile:cp,currPaper:i})
  }

  updateProfile=()=>{
    this.setState({temp:!this.state.temp})
  }

  render() {
    let toSend={
      props:this.props,
      changeSelected:this.changeSelected,
      currProfile:this.state.currProfile,
      currPaper:this.state.currPaper,
      updateProfile:this.updateProfile,
      temp:this.state.temp,
    }
    return (
      <div>
        <People {...toSend}/>
        <DisplayProfile {...toSend}/>
      </div>
    );
  }
}

export default Members;