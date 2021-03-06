import React, { Component } from 'react';
import axios from 'axios'
import emailjs from 'emailjs-com'
import { FloatingActionButton, Dialog, TextField, RaisedButton, Snackbar, CircularProgress, DropDownMenu, MenuItem, DatePicker } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Row } from 'react-bootstrap'
//import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      sopen: false,
      loc: 0,
      company: '',
      intern: '',
      refresh: false,
      locs: [],
      endDate: '',
      startDate:'',
    }
    // console.log(props)
  }

  handleClose = () => {
    this.setState({ open: false, loc: 0 })
  }

  componentDidMount = () => {
    let that = this
    axios.post('/GET-EMPLOYEE', {
      "userID": this.props.uid
    }).then((response) => {
      // console.log(response.data)
      that.setState({
        company: response.data.company,
      })
    }).catch(function (error) {
      console.log(error);
    })
  }

  handleSubmit = () => {
    let that = this
    if (!(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(this.state.intern)) {
      alert("Please enter a valid email")
    } else if (this.state.loc == 0) {
      alert('Please choose a valid location')
    } else if (this.state.startDate == '') {
      alert('Please add an internship start date')
    }else if (this.state.endDate == '') {
      alert('Please add an internship end date')
    } else {
      axios.post('/VERIFY-EMAIL-EXISTS', {
        "username": this.state.intern,
      }).then((response) => {
        // console.log(response.data)
        if (!response.data.status) {
          axios.post('/CREATE-INTERN', {
            "username": this.state.intern,
            "location": this.state.loc,
            "company": this.state.company,
            endDate:that.state.endDate,
            startDate:that.state.startDate,
          }).then((response) => {
            // console.log(response.data)
            if (response.data.userID != null) {
              that.setState({ refresh: true })
              // console.log("Success! ID CREATED:" + response.data.userID);

              let url = "https://pair-ab7d0.firebaseapp.com/register/intern/creation/" + response.data.userID;
              emailjs.init("user_he0zBgUrFvMqcqcm0LHMN");

              emailjs.send("default_service", "welcome_to_pair", {
                toemail: this.state.intern,
                company_name: this.state.company,
                action_url: url
              }).then(
                function (response) {
                  // console.log("SUCCESS", response);
                  that.setState({ open: false, sopen: true, refresh: false })
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
        } else {
          alert('There is already a user with this email, try a different email')
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  handleRequestClose = () => {
    this.setState({ sopen: false })
  }

  openModal = () => {
    let that = this
    this.setState({ open: true })
    axios.post('/GET-COMPANY-FROM-NAME', {
      "name": this.state.company,
    }).then((response) => {
      // console.log(response.data)
      let temp = []
      temp.push(<MenuItem value={0} key={0} primaryText='Choose a location' />)
      for (let i in response.data.locations) {
        temp.push(<MenuItem value={response.data.locations[i]} key={response.data.locations[i]} primaryText={response.data.locations[i]} />)
      }
      that.setState({ locs: temp })
    }).catch(function (error) {
      console.log(error);
    })
  }

  changeEmail = (ev) => {
    this.setState({ intern: ev.target.value })
  }

  handleChange = (ev, target, value) => {
    this.setState({ loc: value })
  }

  changeStartDate=(event, date)=>{
    this.setState({startDate:this.changeDate(date)});
  }

  changeEndDate=(event, date)=>{
    this.setState({endDate:this.changeDate(date)});
  }

  changeDate = (date) => {
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
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
          style={{ position: 'absolute', bottom: '15px', right: '40%' }}
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
          <Row style={{ width: '90%', marginLeft: '1%' }}>
            <DropDownMenu
              value={this.state.loc}
              onChange={this.handleChange}
            >
              {this.state.locs}
            </DropDownMenu>
          </Row>
          <Row style={{ width: '90%', marginLeft: '5%' }}>
            <DatePicker
              hintText="Add intern's start date"
              onChange={this.changeStartDate}
            />
          </Row>
          <Row style={{ width: '90%', marginLeft: '5%' }}>
            <DatePicker
              hintText="Add intern's end date"
              onChange={this.changeEndDate}
              minDate={new Date()}
            />
          </Row>
          <Row style={{ width: '90%', marginLeft: '5%' }}>
            <TextField
              fullWidth
              floatingLabelText="Enter Intern's Email"
              onChange={this.changeEmail}
            />
          </Row>
          {(this.state.refresh) ?
            <CircularProgress
              style={{ position: 'absolute', top: '40%', left: '45%' }}
              size={80}
              thickness={8}
              color='var(--color4)'
            /> : <div></div>}
        </Dialog>
        <Snackbar
          open={this.state.sopen}
          message="Intern added"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />

      </div>
    );
  }
}

export default SearchBar;