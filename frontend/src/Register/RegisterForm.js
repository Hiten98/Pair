import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import CodeField from './CodeField'
import RegisterButtons from './RegisterButtons'
import './RegisterForm.css';

class RegisterForm extends Component {
  constructor(props){
    super(props)
    this.state={
      companyCode:null,
    }
  }

  codeChange=(code)=>{
    this.setState({companyCode:code})
  }

  render() {
    return (
      <div className="form">
        <Row className="register-title row-sm">
          Register
        </Row>
        
        <CodeField codeChange={this.codeChange} />

        <RegisterButtons updateCompany={this.props.updateCompany} updateLocations={this.props.updateLocations} companyCode={this.state.companyCode}/>
      </div>
    );
  }
}

export default RegisterForm;