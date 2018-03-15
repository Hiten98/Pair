import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Menu from './Menu'
import './Toolbar.css';

class Toolbar extends Component {
  render() {
    return (
      <div>
        <Row className="tool-bar">
          <Menu uid={this.props.uid}/>
        </Row>
      </div>
    );
  }
}

export default Toolbar;