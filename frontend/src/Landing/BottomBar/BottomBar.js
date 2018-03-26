import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import history from '../../history';
import AddIntern from './AddIntern'
import CompanyBottomBar from './CompanyBottomBar'
import './BottomBar.css';

class BottomBar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Row className='search-bar'>
        <Switch>
          <Route path={`/landing/employee/members`} render={() => <AddIntern {...this.props}/>} />
          <Route path='/landing/company' render={()=><CompanyBottomBar {...this.props}/>}/>
        </Switch>
      </Row>
    );
  }
}

export default BottomBar;
