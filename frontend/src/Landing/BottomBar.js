import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import './BottomBar.css';
import { RaisedButton } from 'material-ui'
import PasswordField from 'material-ui-password-field'
import AddLocationModal from './AddLocationModal'

class BottomBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employeeModal: false,
      locationModal: false,
    }
  }

  addEmployee = () => {

  }

  addLocation = () => {
    this.setState({ locationModal: true });
  }

  closeLocationModal = () => {
    this.setState({ locationModal: false });
  }

  render() {
    return (
      <div>
      <Col xs={6} className="addEmployee">
        <RaisedButton
          label="+ Employee"
          primary={true}
          onClick={this.addEmployee}
        />
      </Col>
      <Col xs={6} className="addLocation">
        <AddLocationModal />
      </Col>
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
          <Route path='/landing/company' />
        </Switch>
      </div>
    );
  }
}

export default BottomBar;
