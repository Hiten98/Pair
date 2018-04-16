import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
//import './Distance.css';

class Distance extends Component {

  render() {
    let labels = ['< 0.5 mi', '0.5 - 1 mi', '1 - 2 mi', '2 - 4 mi', '4 - 6 mi', '6 - 10 mi', '10+ mi']
    let items = []
    for (let i = 1; i <= 7; i++) {
      items.push(<MenuItem value={`${i}`} key={i} primaryText={labels[i - 1]} />)
    }

    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    // console.log(this.props.dv)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 450) {
      return (
        <Col xs={12}>
          <hr />
          <Row style={{ width: '90%', marginLeft: '5%' }}>What is your preferred distance from your work's campus?</Row>
          <Row style={{ width: '90%', marginLeft: '5%' }}>
            <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.distanceChange}>
              {items}
            </DropDownMenu>
          </Row>
        </Col>
      );
    } else {
      return (
        <Col xs={6}>
          {(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 765) ? <hr /> : null}
          <Col xs={8}>What is your preferred distance from your work's campus?</Col>
          <Col xs={4}>
            <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.distanceChange}>
              {items}
            </DropDownMenu>
          </Col>
        </Col>
      );
    }
  }
}

export default Distance;