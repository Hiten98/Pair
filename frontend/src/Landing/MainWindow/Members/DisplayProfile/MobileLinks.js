import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { RaisedButton } from 'material-ui'
import { Row } from 'react-bootstrap'
//import './Links.css';

class Links extends Component {
  goToLink = (address) => {
    if (this.props[address].trim().indexOf('www.') === 0)
      window.open(`http://${this.props[address]}`, true)
    else if (this.props[address].trim().indexOf('http://www.') === 0)
      window.open(`${this.props[address]}`, true)
    else if (this.props[address].trim().indexOf('http://') === 0)
      window.open(`http://www.${this.props[address].substring(7)}`, true)
    else if (this.props[address].trim().indexOf('https://www.') === 0)
      window.open(`${this.props[address]}`, true)
    else if (this.props[address].trim().indexOf('https://') === 0)
      window.open(`https://www.${this.props[address].substring(7)}`, true)
    else
      window.open(`http://www.${this.props[address]}`, true)
  }

  displayLink = (link) => {
    if (this.props[link] != '') {
      return (
        <RaisedButton
          label={link}
          className='link'
          secondary
          style={{marginTop:'20px'}}
          onClick={() => { this.goToLink(link) }} />
      )
    }
  }

  render() {
    return (
      <Row className='row-div' style={{ marginBottom: '2vh' }}>
        {(this.props.linkedin != null || this.props.facebook != null || this.props.twitter != null) ? <h3>Social:</h3> : <div></div>}
        {this.displayLink('linkedin')}
        {this.displayLink('facebook')}
        {this.displayLink('twitter')}
      </Row>
    );
  }
}

export default Links;