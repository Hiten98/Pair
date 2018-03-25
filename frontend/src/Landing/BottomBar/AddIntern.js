import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import emailjs from 'emailjs-com'
import { FloatingActionButton, Dialog, TextField, RaisedButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Row } from 'react-bootstrap'
//import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      sopen: false,
      loc: '',
      company: '',
      intern: '',
    }
    // console.log(props)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidMount = () => {
    let that = this
    axios.post('/GET-EMPLOYEE', {
      "userID": this.props.uid
    }).then((response) => {
      // console.log(response.data)
      that.setState({
        loc: response.data.location,
        company: response.data.company,
      })
    }).catch(function (error) {
      console.log(error);
    })
  }

  handleSubmit = () => {
    if (!(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(this.state.intern)) {
      alert("Please enter a valid email")
    } else {
      axios.post('/CREATE-INTERN', {
        "username": this.state.intern,
        "location": this.state.loc,
        "company": this.state.company
      }).then((response) => {
        console.log(response.data)
        if (response.data.userID != null) {
          console.log("Success! ID CREATED:" + response.data.userID);

          let url = "http://localhost:3000/register/intern/part1/" + response.data.userID;
          emailjs.init("user_he0zBgUrFvMqcqcm0LHMN");

          emailjs.send("default_service", "welcome_to_pair", {
            toemail: this.state.intern,
            company_name: this.state.company,
            action_url: url
          }).then(
            function (response) {
              console.log("SUCCESS", response);
              this.setState({ open: false })
            },
            function (error) {
              console.log("FAILED", error);
              alert('Error, please try again')
            }
          );
        } else {
          //Create intern failed
          console.log("Failure!");
          this.setState({
            error: true
          })
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  openModal = () => {
    this.setState({ open: true })
  }

  changeEmail=(ev)=>{
    this.setState({intern:ev.target.value})
  }

  actions = [
    <RaisedButton
      label="Cancel"
      onClick={this.handleClose}
    />,
    <RaisedButton
      label="Add Intern"
      onClick={this.handleSubmit}
    />
  ]

  render() {
    return (
      <div>
        <FloatingActionButton
          onClick={this.openModal}
          style={{ position: 'absolute', bottom: '1.5vh', right: '3vw' }}
          secondary
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title='Add Intern To Your Company Location'
          modal
          actions={this.actions}
          open={this.state.open}
        >
          <Row style={{width:'40vw',marginLeft:'3vw'}}>
            <TextField
              fullWidth
              floatingLabelText="Enter Intern's Email"
              onChange={this.changeEmail}
            />
          </Row>
        </Dialog>
      </div>
    );
  }
}

export default SearchBar;