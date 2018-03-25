import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import CompanyBottomBar from './CompanyBottomBar'
import './BottomBar.css';

class BottomBar extends Component {

  render() {
    return (
      <div>
      <Switch>
        <Route path='/landing/company' render={()=><CompanyBottomBar {...this.props}/>}/>
        </Switch>
      </div>
    );
  }
}

export default BottomBar;
