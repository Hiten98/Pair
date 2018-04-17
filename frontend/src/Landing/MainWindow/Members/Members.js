import React, { Component } from 'react';
import People from './PersonList/People'
import DisplayProfile from './DisplayProfile/DisplayProfile'
import axios from 'axios';
//import './Members.css';

class Members extends Component {
  constructor(props){
    super(props)
    this.state={
      currProfile:this.props.uid,
      currPaper:0,
      temp:false,
      blockedUsers:[],
    };
    props.resetPeople();
  }

  componentDidMount=()=>{
    let that=this;
    axios.post("/GET-BLOCKED-USERS", {
      "userID": this.props.uid
    }).then(function (response) {
      // console.log(response.data)
      let tempblocked=[];
      for(let i in response.data)
        tempblocked.push(response.data[i]);
      that.setState({blockedUsers:tempblocked})
    }).catch(function (error) {
      console.log(error);
    })
  }

  changeSelected=(cp,i)=>{
    this.setState({currProfile:cp,currPaper:i})
  }

  updateProfile=()=>{
    this.setState({temp:!this.state.temp}, this.componentDidMount)
  }

  render() {
    let toSend={
      props:this.props,
      changeSelected:this.changeSelected,
      updateProfile:this.updateProfile,
      ...this.state,
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