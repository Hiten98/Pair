import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import People from './People'
import DisplayProfile from './DisplayProfile'
//import './Members.css';

class Members extends Component {
  constructor(props){
    super(props)
    this.state={
      currProfile:this.props.uid,
      currPaper:0,
    }
    props.resetPeople()
  }

  changeSelected=(cp,i)=>{
    this.setState({currProfile:cp,currPaper:i})
  }

  render() {
    let toSend={
      props:this.props,
      changeSelected:this.changeSelected,
      currProfile:this.state.currProfile,
      currPaper:this.state.currPaper,
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