import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import AdminCompany from './AdminCompany'
import AdminComplaints from './AdminComplaints'
import history from '../../../history';
//import './AdminLayout.css';

class AdminLayout extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/landing/admin/complaints' render={() => <AdminComplaints {...this.props} />} />
          <Route path='/landing/admin/companies' render={() => <AdminCompany {...this.props} />} />
          <Route render={() => {
            alert('Error: no such url')
            history.push('/')
          }} />
        </Switch>
      </div>
    );
  }
}

export default AdminLayout;
