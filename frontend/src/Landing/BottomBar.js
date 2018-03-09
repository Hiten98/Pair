import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import './BottomBar.css';

class BottomBar extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/landing/interns/chat' />
          <Route path='/landing/employees/chat' />
          <Route path='/landing/' render={() =>
            <Row className='search-bar'>
              <Switch>
                <Route path='/landing/employee' />
              </Switch>
            </Row>
          } />
        </Switch>
      </div>
    );
  }
}

export default BottomBar;