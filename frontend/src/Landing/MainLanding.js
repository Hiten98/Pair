import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import BottomBar from './BottomBar'
import Sidebar from './Sidebar'
import Toolbar from './TopBar/Toolbar'
import MainArea from './MainArea'
import './MainLanding.css';
import history from '../history';


class LandingScreen extends Component {
  constructor(props){
    super(props)
    if(props.uid==null){
      history.push('/')
    }
    this.state={
      currPage:history.location.pathname,
      currChat:0,
    }
    let lastTab=history.location.pathname.substring(history.location.pathname.lastIndexOf('/')+1)
    // console.log(lastTab)
    /*if(lastTab=='chat'||lastTab==''||lastTab=='people'){
      history.push(`${history.location.pathname}/0`)
    }else{
      this.state={
        currPage:history.location.pathname.substring(0,history.location.pathname.lastIndexOf('/')),
        currChat:lastTab,
      }
    }*/
  }

  changePage=(newPage)=>{
    this.setState({currPage:newPage},history.push(`${newPage}/${this.state.currChat}`))
  }

  changeChat=(newChat)=>{
    this.setState({currChat:newChat},history.push(`${this.state.currPage}/${newChat}`))
  }

  render() {
    let toSend={
      uid:this.props.uid,
      state:this.state,
      changePage:this.changePage,
      changeChat:this.changeChat,
      type:this.props.type,
    }
    return (
      <div className='whole'>
        <Sidebar {...toSend}/>
        <Col xs={12} sm={10} lg={10} className='mainArea'>

          <Toolbar {...toSend}/>

          <MainArea {...toSend}/>

          <BottomBar {...toSend}/>
        </Col>
      </div>
    );
  }
}

export default LandingScreen;
