import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import history from '../../history'
import Chats from './Chat/Chatroom'
import Members from './Members/Members'
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
            <Route path={`/landing/${this.props.type}/chat`} render={()=><Chats {...this.props}/>}/>
            <Route path={`/landing/${this.props.type}/members`} render={()=><Members {...this.props}/>}/>
            <Route path={`/landing/${this.props.type}/saved`} render={()=><p>Hi</p>}/>
            <Route path={`/landing/${this.props.type}/housing`} render={()=><p>Hi</p>}/>
            <Route path="/" render={() => <Redirect to='/home/login' />} />
          </Switch>
        </Row>
      </div>
    );
  }
}

export default MainArea;