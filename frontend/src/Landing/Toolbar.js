import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import './Toolbar.css';

class Toolbar extends Component {
  render() {
    return (
      <div>
        <Row className="tool-bar">
          <Switch>
            <Route path='/landing/interns' />
          </Switch>
        </Row>
      </div>
    );
  }
}

export default Toolbar;