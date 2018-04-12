import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
//import './Bedtime.css';

class Waketime extends Component {
  render() {
    let items = []
    for (let i = 1; i <= 12; i++) {
      items.push(<MenuItem value={`${i}`} key={i} primaryText={`${i} AM`} />)
    }
    for (let i = 13; i <= 24; i++) {
      items.push(<MenuItem value={`${i}`} key={i} primaryText={`${i - 12} PM`} />)
    }

    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 450) {
      return (
        <Col xs={12} sm={6}>
          <hr />
          <Row style={{ width: '90%', marginLeft: '5%' }}>What time do you like to wake up?</Row>
          <Row style={{ width: '90%', marginLeft: '5%' }}>
            <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.waketimeChange}>
              {items}
            </DropDownMenu>
          </Row>
        </Col>
      );
    } else {
      return (
        <Col xs={12} sm={6}>
          {(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 765) ? <hr /> : null}
          <Col xs={7} sm={8}>What time do you like to wake up?</Col>
          <Col xs={5} sm={4}>
            <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.waketimeChange}>
              {items}
            </DropDownMenu>
          </Col>
        </Col>
      );
    }
  }
}

export default Waketime;