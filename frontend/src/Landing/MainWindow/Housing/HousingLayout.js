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
//import './LandingScreen.css';

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

  handleReviewText = (event, newValue) => {
    this.setState({reviewText: newValue});
  }

  handleAddReview = (address) => {
    this.setState({
      selectedHouse: address
    }, () => {
      if(address != "" || this.state.reviewText != "") {
        axios.post("/WRITE-REVIEW", {
          house: address,
          review: this.state.reviewText
        }).then((response) => {
          console.log(response.data);
          this.render(); 
        }).catch((error) => {
          console.log(error);
        });
      }
      // console.log(address+this.state.reviewText)
    }
    );
  }

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
        // console.log(response.data);
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
    console.log(this.state.radioValue)
    console.log(this.props.uid)
    console.log(this.state.selectedHouse)
    axios
      .post("/ADD-HOUSE", {
        name: this.state.radioValue,
        userID: this.props.uid,
        house: this.state.selectedHouse
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
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

  minBedSlider = (event, value) => {
    this.setState({ minBed: value });
  };

  maxBedSlider = (event, value) => {
    this.setState({ maxBed: value });
  };

  minBathSlider = (event, value) => {
    this.setState({ minBath: value });
  };

  maxBathSlider = (event, value) => {
    this.setState({ maxBath: value });
  };

  minPriceSlider = (event, value) => {
    this.setState({ minPrice: value });
  };

  maxPriceSlider = (event, value) => {
    this.setState({ maxPrice: value });
  };

  minSqFtSlider = (event, value) => {
    this.setState({ minSqFt: value });
  };

  maxSqFtSlider = (event, value) => {
    this.setState({ maxSqFt: value });
  };

  handleSearch = () => {
    // console.log(this.props);
    this.handleClose();
    // Go back to first 10 or 20 houses when search is made again with new filters
    this.setState({ offset: 0 });

    // Server Call with housing filter parameters to get first 10 or 20 houses
    let that = this;
    // console.log(this.state.offset)
    axios
      .post("/GET-FILTERED-HOUSES", {
        state: "CA",
        offset: this.state.offset,
        minBedrooms: this.state.minBed,
        maxBedrooms: this.state.maxBed,
        minBathrooms: this.state.minBath,
        maxBathrooms: this.state.maxBath,
        minPrice: this.state.minPrice,
        maxPrice: this.state.maxPrice,
        minsqft: this.state.minSqFt,
        maxsqft: this.state.maxSqFt,
        houses: this.state.houses
      })
      .then(function(response) {
        // Make Cards for House Listings
        // console.log(response.data);
        let tempCard = [];

        for (let i in response.data) {
          if (!isNaN(response.data[i])) continue;
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

          for (let k in response.data[i].listOfReviews)
            reviews.push(
              <Paper key={k}>
                <MenuItem primaryText={response.data[i].listOfReviews[k]} />
              </Paper>
            );
          tempCard.push(
            <Card key={i}>
              <CardHeader
                title={response.data[i].address}
                subtitle={details}
                actAsExpander={true}
                showExpandableButton={true}
              />

              <CardActions style={{ marginTop: "-25px" }}>
                <FlatButton
                  label="Save House"
                  secondary
                  onClick={() => that.handleSave(response.data[i].address)}
                />
                <FlatButton
                  label="Go to Listing"
                  secondary
                  onClick={() => that.handleURL(response.data[i].url)}
                />
              </CardActions>

              <CardText expandable={true} style={{ marginTop: "-20px"}}>
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
                <FlatButton label="Add Review" secondary onClick={() => that.handleAddReview(response.data[i].address)}/>
              </CardActions>
            </Card>
          );
        }
        that.setState({ houseCards: tempCard });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount() {
    // Go back to first 10 or 20 houses when search is made again with new filters
    this.setState({ offset: 0 });

    // Server Call with housing filter parameters to get first 10 or 20 houses
    let that = this;
    axios
      .post("/GET-HOUSES", {
        state: "CA",
        offset: this.state.offset
      })
      .then(function(response) {
        // Make Cards for House Listings
        // console.log(response.data);
        let tempCard = [];

        for (let i in response.data) {
          if (!isNaN(response.data[i])) continue;
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

          for (let k in response.data[i].listOfReviews)
            reviews.push(
              <Paper key={k}>
                <MenuItem primaryText={response.data[i].listOfReviews[k]} />
              </Paper>
            );
          tempCard.push(
            <Card key={i}>
              <CardHeader
                title={response.data[i].address}
                subtitle={details}
                actAsExpander={true}
                showExpandableButton={true}
              />

              <CardActions style={{ marginTop: "-25px" }}>
                <FlatButton
                  label="Save House"
                  secondary
                  onClick={() => that.handleSave(response.data[i].address)}
                />
                <FlatButton
                  label="Go to Listing"
                  secondary
                  onClick={() => that.handleURL(response.data[i].url)}
                />
              </CardActions>

              <CardText expandable={true} style={{ marginTop: "-20px"}}>
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
                <FlatButton label="Add Review" secondary onClick={() => that.handleAddReview(response.data[i].address)}/>
              </CardActions>
            </Card>
          );
        }
        that.setState({ houseCards: tempCard });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Apply Filters"
        primary={true}
        onClick={this.handleSearch}
      />
    ];

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
        <RaisedButton label="Filters" onClick={this.handleOpen} />
        <Dialog
          actions={actions}
          autoScrollBodyContent
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div style={{ overflowY: "auto", overflowX: "hidden" }}>
            <p>Minimum Number of Beds:&nbsp;{this.state.minBed}</p>
            <Slider
              min={0}
              max={10}
              step={1}
              value={this.state.minBed}
              onChange={this.minBedSlider}
            />

            <p>Maximum number of Beds:&nbsp;{this.state.maxBed}</p>
            <Slider
              min={0}
              max={10}
              step={1}
              value={this.state.maxBed}
              onChange={this.maxBedSlider}
            />

            <p>Minimum Number of Baths:&nbsp;{this.state.minBath}</p>
            <Slider
              min={0}
              max={10}
              step={1}
              value={this.state.minBath}
              onChange={this.minBathSlider}
            />

            <p>Maximum number of Baths:&nbsp;{this.state.maxBath}</p>
            <Slider
              min={0}
              max={10}
              step={1}
              value={this.state.maxBath}
              onChange={this.maxBathSlider}
            />

            <p>Minimum Price:&nbsp;{this.state.minPrice}</p>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={this.state.minPrice}
              onChange={this.minPriceSlider}
            />

            <p>Maximum Price:&nbsp;{this.state.maxPrice}</p>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={this.state.maxPrice}
              onChange={this.maxPriceSlider}
            />

            <p>Minimum Square Feet:&nbsp;{this.state.minSqFt}</p>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={this.state.minSqFt}
              onChange={this.minSqFtSlider}
            />

            <p>Maximum Square Feet:&nbsp;{this.state.maxSqFt}</p>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={this.state.maxSqFt}
              onChange={this.maxSqFtSlider}
            />
          </div>
        </Dialog>

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
