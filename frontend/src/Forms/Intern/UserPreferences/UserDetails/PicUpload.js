import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import { RaisedButton } from 'material-ui'
import { white } from 'material-ui/styles/colors'
import { Col, Row } from 'react-bootstrap'

class PicUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesPreview: [],
      filesToBeSent: [],
      printcount: 1,
    }
  }

  clear = () => {
    this.setState({ filesPreview: [], filesToBeSent: [] })
    this.props.changePic(null)
  }

  changeToBase64=(imge)=>{
    let reader=new FileReader()
    let that=this
    reader.onloadend=function(){
      that.props.changePic(reader.result)
      //console.log(reader.result)
    }
    reader.readAsDataURL(imge)
  }

  onDrop(acceptedFiles, rejectedFiles) {
    // console.log('Accepted files: ', acceptedFiles[0].name);
    var filesToBeSent = this.state.filesToBeSent;
    if (filesToBeSent.length < this.state.printcount) {
      filesToBeSent.push(acceptedFiles);
      var filesPreview = [];
      for (var i in filesToBeSent) {
        filesPreview.push(<div key={i}>
          {filesToBeSent[i][0].name}<br/>
          <img height='90vh' style={{marginBottom:'20px'}} alt='Profile Picture' src={filesToBeSent[i][0].preview} /><br/>
          <div>
            <RaisedButton
              primary
              label='Clear'
              styles={{ top: 10, marginTop:'20px',color:white}}
              onClick={this.clear}
            />
          </div>
        </div>
        )
      }
      this.setState({ filesToBeSent, filesPreview });
      this.changeToBase64(filesToBeSent[0][0])
    }
    else {
      alert("You can only upload one picture at a time")
    }
  }

  returnDesktop() {
    return (
      <Row style={{marginTop:'20px'}}>
        <Col xs={3} md={3}>
          <Dropzone accept='image/*' onDrop={(files) => this.onDrop(files)}>
            <div>Please select a picture to upload by either dropping them here or click to select files</div>
          </Dropzone>
        </Col>
        <Col xs={5} md={5}>
          Profile picture to be uploaded (Optional):
         {this.state.filesPreview}
        </Col>
        {(this.props.prevpic!=''&&this.props.prevpic!=null)?
        <Col xs={4} md={4}>
          Previous profile picture:<br/>
          {(this.props.prevpic!='undefined'&&this.props.prevpic!=null)?<img src={this.props.prevpic} alt='Profile picture' height='200vh'/>:'No previous picture'}
        </Col>:<p></p>}
      </Row>
    )
  }

  returnMobile() {
    return (
      <div style={{marginTop:'20px',width:'90%', marginLeft:'10%'}}>
        <Row>
          <Dropzone accept='image/*' onDrop={(files) => this.onDrop(files)}>
            <div>Please select a picture to upload by either dropping them here or click to select files</div>
          </Dropzone>
        </Row>
        <Row style={{marginTop:'20px'}}>
          Profile picture to be uploaded (Optional):
         {this.state.filesPreview}
        </Row>
        {(this.props.prevpic!='undefined'&&this.props.prevpic!=null)?
        <Row style={{marginTop:'20px'}}>
          Previous profile picture:<br/>
          {(this.props.prevpic!='undefined'&&this.props.prevpic!=null)?<img src={this.props.prevpic} alt='Profile picture' height='200vh'/>:'No previous picture'}
        </Row>:null}
      </div>
    )
  }

  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 1000) {
      return this.returnMobile();
    } else {
      return this.returnDesktop();
    }
  }
}

export default PicUpload;