import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import AdminCompany from './AdminCompany'
import AdminComplaints from './AdminComplaints'
//import './AdminLayout.css';

class AdminLayout extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/landing/admin/complaints' render={()=><AdminComplaints {...this.props}/>}/>
          <Route path='/landing/admin/company-acceptance' render={()=><AdminCompany {...this.props}/>}/>
        </Switch>
      </div>
    );
  }
}

export default AdminLayout;
