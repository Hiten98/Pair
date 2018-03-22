import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import history from '../history'
import './MainArea.css';

class MainArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classChat: [
        'text-display chat-display', 'text-display'
      ],
      currPlace: 1,
    }
  }

  componentDidMount() {
    if (history.location.pathname.includes('/landing/interns/chat') || history.location.pathname.includes('/landing/employee/chat'))
      this.setState({ currPlace: 0 })
    else
      this.setState({ currPlace: 1 })
  }

  render() {
    return (
      <div>
        <Row className={this.state.classChat[this.state.currPlace]}>
          <Switch>
            <Route path='/landing/employee' />
            <Route path='/landing/interns' />
          </Switch>
        </Row>
      </div>
    );
  }
}

export default MainArea;
