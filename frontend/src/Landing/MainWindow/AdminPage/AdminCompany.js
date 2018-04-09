import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
//import './AdminCompany.css';

class AdminCompany extends Component {
  constructor(props){
    super(props)
    this.state={
      companies:[],
    }
    console.log(props)
  }

  componentDidMount=()=>{

  }

  render() {
    console.log('hello')
    return (
      <div>
      </div>
    );
  }
}

export default AdminCompany;
