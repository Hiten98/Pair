import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import history from '../../history'
import Chats from './Chat/Chatroom'
import Members from './Members/Members'
import Complaints from './Complaints/Complaints'
import './MainArea.css';
import CompanyMain from './CompanyLanding/CompanyMain';
import AdminLayout from './AdminPage/AdminLayout';
import SavedHousingLayout from './SavedHousing/SavedHousingLayout'
import HousingLayout from './Housing/HousingLayout'

class MainArea extends Component {
  render() {
    let currPlace=0
    if (history.location.pathname.indexOf(`/landing/${this.props.type}/chat`)==0
    || history.location.pathname.indexOf(`/landing/${this.props.type}/housing`)==0 
    || history.location.pathname.indexOf(`/landing/${this.props.type}/saved`)==0)
      currPlace='text-display chat-display'
    else
      currPlace='text-display'
    return (
      <div>
        <Row className={currPlace}>
          {/* {(this.props.state.currChatName==''&&this.props.type!='company')?<h1>Please choose a chat from the chats on the left</h1>: */}
          <Switch>
            <Route path='/landing/company' render={()=><CompanyMain {...this.props}/>}/>
            <Route path={`/landing/${this.props.type}/chat`} render={()=><Chats {...this.props}/>}/>
            <Route path={`/landing/${this.props.type}/members`} render={()=><Members {...this.props}/>}/>
            <Route path='/landing/employee/complaints' render={()=><Complaints {...this.props}/>}/>
            <Route path={`/landing/${this.props.type}/saved`} render={()=><SavedHousingLayout {...this.props}/>}/>
            <Route path={`/landing/${this.props.type}/housing`} render={()=><HousingLayout {...this.props}/>}/>
            <Route path='/landing/admin' render={()=><AdminLayout {...this.props}/>}/>
            <Route path="/" render={() => <Redirect to='/home/login' />} />
          </Switch>
        </Row>
      </div>
    );
  }
}

export default MainArea;
