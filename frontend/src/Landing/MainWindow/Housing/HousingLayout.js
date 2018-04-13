import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import axios from "axios";
import {
  RaisedButton,
  FlatButton,
  Dialog,
  Slider,
  MenuItem,
  Paper
} from "material-ui";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
//import './LandingScreen.css';

class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minBed: 0,
      maxBed: 10,
      minBath: 0,
      maxBath: 10,
      minPrice: 0,
      maxPrice: 5000,
      minSqFt: 0,
      maxSqFt: 5000,
      open: false,
      houseCards: [],
      offset: 0,
      reviews: [],
      temp: false

    };
  }

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
          let reviews=[]
          if (
            response.data[i].bedrooms > 0 &&
            response.data[i].bedrooms != null
          )
            details += +response.data[i].bedrooms + " Bed • ";
          if (
            response.data[i].bathrooms > 0 &&
            response.data[i].bathrooms != null
          )
            details += +response.data[i].bathrooms + " Bath • ";
          if (response.data[i].sqft > 0 && response.data[i].sqft != null)
            details += +response.data[i].sqft + " sqft • ";
          if (response.data[i].price > 0 && response.data[i].price != null)
            details += "$" + +response.data[i].price;

          for(let k in response.data[i].listOfReviews)
            reviews.push(<Paper key={k}><MenuItem primaryText={response.data[i].listOfReviews[k]}/></Paper>)
          tempCard.push(
            <Card key={i}>
              <CardHeader
                title={response.data[i].address}
                subtitle={details}
                actAsExpander={true}
                showExpandableButton={true}
              />

              <CardActions style={{ marginTop: "-25px" }}>
                <FlatButton label="Save House" secondary />
                <FlatButton label="Go to Listing" secondary />
              </CardActions>

              <CardText expandable={true} style={{ marginTop: "-20px" }}>
                <h5>Reviews: </h5>
                {reviews.length > 1 ? reviews : <h5>No Reviews</h5>}
              </CardText>
              <CardActions expandable style={{ marginTop: "-20px" }}>
                <FlatButton label="Add Review" secondary />
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
          let reviews=[]
          if (
            response.data[i].bedrooms > 0 &&
            response.data[i].bedrooms != null
          )
            details += +response.data[i].bedrooms + " Bed • ";
          if (
            response.data[i].bathrooms > 0 &&
            response.data[i].bathrooms != null
          )
            details += +response.data[i].bathrooms + " Bath • ";
          if (response.data[i].sqft > 0 && response.data[i].sqft != null)
            details += +response.data[i].sqft + " sqft • ";
          if (response.data[i].price > 0 && response.data[i].price != null)
            details += "$" + +response.data[i].price;

          for(let k in response.data[i].listOfReviews)
            reviews.push(<Paper key={k}><MenuItem primaryText={response.data[i].listOfReviews[k]}/></Paper>)
          tempCard.push(
            <Card key={i}>
              <CardHeader
                title={response.data[i].address}
                subtitle={details}
                actAsExpander={true}
                showExpandableButton={true}
              />

              <CardActions style={{ marginTop: "-25px" }}>
                <FlatButton label="Save House" secondary />
                <FlatButton label="Go to Listing" secondary />
              </CardActions>

              <CardText expandable={true} style={{ marginTop: "-20px" }}>
                <h5>Reviews: </h5>
                {reviews.length > 1 ? reviews : <h5>No Reviews</h5>}
              </CardText>
              <CardActions expandable style={{ marginTop: "-20px" }}>
                <FlatButton label="Add Review" secondary />
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
      </div>
    );
  }
}

export default LandingScreen;
