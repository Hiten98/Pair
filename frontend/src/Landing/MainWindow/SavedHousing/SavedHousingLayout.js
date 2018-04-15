import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import axios from "axios";
import {
  RaisedButton,
  FlatButton,
  Dialog,
  Slider,
  MenuItem,
  Paper,
  RadioButton,
  RadioButtonGroup,
  TextField
} from "material-ui";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import Drawer from "material-ui/Drawer";
import ExitToApp from "material-ui/svg-icons/action/exit-to-app";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Iframe from "react-iframe";

class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minBed: 5,
      maxBed: 5,
      minBath: 5,
      maxBath: 5,
      minPrice: 2500,
      maxPrice: 2500,
      minSqFt: 2500,
      maxSqFt: 2500,
      open: false,
      houseCards: [],
      offset: 0,
      reviews: [],
      temp: false,
      openDialog: false,
      radios: [],
      radioValue: "",
      selectedHouse: "",
      reviewText: ""
    };
  }

  handleLike = (address, chatName) => {
    this.setState({ selectedHouse: address }, () => {
      axios
        .post("/LIKE-HOUSE", {
          userID: this.props.uid,
          name: chatName,
          house: address
        })
        .then(response => {
          console.log(response.data);
          this.getHousing(this.props);

        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  handleReviewText = (event, newValue) => {
    this.setState({ reviewText: newValue });
  };

  handleAddReview = address => {
    this.setState(
      {
        selectedHouse: address
      },
      () => {
        if (address != "" && this.state.reviewText != "") {
          axios
            .post("/WRITE-REVIEW", {
              house: address,
              review: this.state.reviewText
            })
            .then(response => {
              this.render();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    );
  };

  handleURL = url => {
    window.open(url, "_blank");
  };

  handleSave = address => {
    let that = this;
    this.setState({
      selectedHouse: address
    });
    axios
      .post("/GET-CHATROOM", {
        userID: this.props.uid
      })
      .then(function(response) {
        // Make Cards for House Listings
        let r = [];
        for (let ind in response.data) {
          if (response.data[ind][0] == "3") {
            r.push(
              <RadioButton
                key={ind}
                value={response.data[ind]}
                label={response.data[ind].substr(1)}
              />
            );
          }
        }
        if (r.length > 0) {
          that.setState({
            radios: r,
            openDialog: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  handleCloseDialogWithSubmit = () => {
    this.setState({ openDialog: false });
    axios
      .post("/ADD-HOUSE", {
        name: this.state.radioValue,
        userID: this.props.uid,
        house: this.state.selectedHouse
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleRadioChange = (event, value) => {
    this.setState({
      radioValue: value
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.state.currChatName != nextProps.state.currChatName)
      this.getHousing(nextProps);
  };

  getHousing = props => {
    // Go back to first 10 or 20 houses when search is made again with new filters
    this.setState({ offset: 0, houseCards: [] });

    // Server Call with housing filter parameters to get first 10 or 20 houses
    let that = this;

    axios
      .post("/GET-SAVED-HOUSES", {
        name: props.state.currChatName
      })
      .then(function(response) {
        // Make Cards for House Listings
        let tempCard = [];
        console.log("SAVED HOUSES:");
        console.log(response.data);
        if (response.data.status != false) {
          for (let i in response.data) {
            let details = "";
            let reviews = [];
            if (
              response.data[i].bedrooms > 0 &&
              response.data[i].bedrooms != null
            )
              details += response.data[i].bedrooms + " Bed • ";
            if (
              response.data[i].bathrooms > 0 &&
              response.data[i].bathrooms != null
            )
              details += response.data[i].bathrooms + " Bath • ";
            if (response.data[i].sqft > 0 && response.data[i].sqft != null)
              details += response.data[i].sqft + " sqft • ";
            if (response.data[i].price > 0 && response.data[i].price != null)
              details += "$" + response.data[i].price;

            for (let k in response.data[i].listOfReviews) {
              reviews.push(
                <Paper key={k}>
                  <MenuItem primaryText={response.data[i].listOfReviews[k]} />
                </Paper>
              );
              reviews = reviews.reverse();
            }
            let str = "";
            console.log(response.data[i]);
            if(response.data[i].likes[props.uid] == 1) {
              if (response.data[i].likes.likes <= 0) {
                str = "Dislike (0)";
              } else {
                str = "Dislike (" + response.data[i].likes.likes + ")";
              }
            } else {
              if (response.data[i].likes.likes <= 0) {
                str = "Like (0)";
              } else {
                str = "Like (" + response.data[i].likes.likes + ")";
              }
            }
            tempCard.push(
              <Card>
                <CardHeader
                  title={i}
                  subtitle={details}
                  actAsExpander={true}
                  showExpandableButton={true}
                />

                <CardActions style={{ marginTop: "-25px" }}>
                  <FlatButton
                    label={str}
                    secondary
                    onClick={() => that.handleLike(i, props.state.currChatName)}
                  />
                  <FlatButton
                    label="Go to Listing"
                    secondary
                    onClick={() => that.handleURL(response.data[i].url)}
                  />
                </CardActions>

                <CardText expandable={true} style={{ marginTop: "-20px" }}>
                  <h5>Reviews: </h5>
                  {reviews.length > 1 ? reviews : <h5>No Reviews</h5>}
                  <TextField
                    hintText="Type Review Here"
                    multiLine={true}
                    rows={2}
                    rowsMax={8}
                    fullWidth={true}
                    onChange={that.handleReviewText}
                  />
                </CardText>

                <CardActions expandable style={{ marginTop: "-20px" }}>
                  <FlatButton
                    label="Add Review"
                    secondary
                    onClick={() => that.handleAddReview(i)}
                  />
                </CardActions>
              </Card>
            );
          }
        }
        that.setState({ houseCards: tempCard });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getHousing(this.props);
  }

  render() {
    const actions2 = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleCloseDialogWithSubmit}
      />
    ];

    return (
      <div style={{ textAlign: "left" }}>
        {this.state.houseCards}

        <Dialog
          title="Choose the chat to save to..."
          actions={actions2}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDialog}
          autoScrollBodyContent={true}
        >
          <RadioButtonGroup name="shipSpeed" onChange={this.handleRadioChange}>
            {this.state.radios}
          </RadioButtonGroup>
        </Dialog>
      </div>
    );
  }
}

export default LandingScreen;
