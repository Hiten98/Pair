import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
//import './Clean.css';

class Clean extends Component {
  render() {
    let labels = ['Yes', 'No', 'No but it\'s okay if they do']
    let items = []
    for (let i = 1; i <= 3; i++) {
      items.push(<MenuItem value={`${i}`} key={i} primaryText={labels[i - 1]} />)
    }

    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 450) {
      return (
        <Col xs={12} sm={6}>
          <hr/>
          <Row style={{ width: '90%', marginLeft: '5%' }}>Do you smoke?</Row>
          <Row style={{ width: '90%' }}>
            <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.smokeChange}>
              {items}
            </DropDownMenu>
          </Row>
        </Col>
      );
    } else {
      return (
        <Col xs={12} sm={6}>
          {(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 765) ? <hr /> : null}
          <Col xs={5}>Do you smoke?</Col>
          <Col xs={7}>
            <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.smokeChange}>
              {items}
            </DropDownMenu>
          </Col>
        </Col>
      );
    }
  }
}

export default Clean;