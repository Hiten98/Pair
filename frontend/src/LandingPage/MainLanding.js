import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import wordLogo from '../images/word_no_logo.png'
import './MainLanding.css';
import history from '../history'
import AddInternButton from './AddInternButton'
import DisplayInterns from './DisplayInterns'
import InternToolbar from './InternToolbar'
import InternProfile from './InternProfile'

class LandingScreen extends Component {
  render() {
    return (
      <Grid>
        <Row className='whole'>
          <Col xsHidden sm={2} lg={2} className='sideBar'>
            <img src={wordLogo} alt="logo" className='noWordLogo' />
          </Col>
          <Col xs={12} sm={10} lg={10} className='mainArea'>
            <Row className="greatBar">
              <Switch>
                <Route path='/landing/interns' render={() => <InternToolbar uid={this.props.uid} />} />
              </Switch>
            </Row>
            <Row className='textDisplay'>
              <Switch>
                <Route path='/landing/employee/interns' render={() => <DisplayInterns uid={this.props.uid} />} />
                <Route path='/landing/interns' render={()=><InternProfile uid={this.props.uid}/>}/>
              </Switch>
            </Row>
            <Row className='searchBar'>
              <Switch>
                <Route path='/landing/employee/interns' render={() => <AddInternButton uid={this.props.uid} companyLocationList={this.props.companyLocationList}/>} />
              </Switch>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LandingScreen;