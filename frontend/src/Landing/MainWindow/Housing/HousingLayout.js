import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import {RaisedButton,FlatButton,Dialog,Slider} from 'material-ui'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
//import './LandingScreen.css';

class LandingScreen extends Component {
  constructor(props) {
    super(props)
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
      offset: 0
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  minBedSlider = (event, value) => {
    this.setState({minBed: value});
  };

  maxBedSlider = (event, value) => {
    this.setState({maxBed: value});
  };

  minBathSlider = (event, value) => {
    this.setState({minBath: value});
  };

  maxBathSlider = (event, value) => {
    this.setState({maxBath: value});
  };

  minPriceSlider = (event, value) => {
    this.setState({minPrice: value});
  };

  maxPriceSlider = (event, value) => {
    this.setState({maxPrice: value});
  };

  minSqFtSlider = (event, value) => {
    this.setState({minSqFt: value});
  };

  maxSqFtSlider = (event, value) => {
    this.setState({maxSqFt: value});
  };

  handleSearch = () => {
    console.log(this.props);
    this.handleClose();
    // Go back to first 10 or 20 houses when search is made again with new filters
    this.setState({offset: 0});

    // Server Call with housing filter parameters to get first 10 or 20 houses
    let that=this
    axios.post('/GET-FILTERED-HOUSES', {
      "state": "CA",
      "offset": this.state.offset,
      "minBedrooms": this.state.minBed,
      "maxBedrooms": this.state.maxBed,
      "minBathrooms": this.state.minBath,
      "maxBathrooms": this.state.maxBath,
      "minPrice": this.state.minPrice,
      "maxPrice": this.state.maxPrice,
      "minsqft": this.state.minSqFt,
      "maxsqft": this.state.maxSqFt,
      "houses": this.state.houses
    }).then(function (response) {
      // Make Cards for House Listings
      console.log(response.data);
      let tempCard = []


      for (let i in response.data) {
        var details, reviews;
        details = +response.data[i].bedrooms + " Bed • " + +response.data[i].bathrooms + " Bath • " + +response.data[i].sqft + " sqft • $"+ +response.data[i].price

        axios.post('/GET-REVIEWS', {
          "house": response.data[i].address
        }).then(function (reviewsResponse){
          reviews = "Reviews: " + reviewsResponse.data;
          console.log(reviewsResponse.data);
        }).catch(function (error) {
          console.log(error);
        });

        tempCard.push(
          <Card>
            <CardHeader
              title={response.data[i].address}
              subtitle={details}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              Reviews: {reviews}
              <CardActions>
                <FlatButton label="Add Review" />
              </CardActions>
            </CardText>
          </Card>
        )
      }
      that.setState({ houseCards: tempCard })

    }).catch(function (error) {
      console.log(error);
    });
  };

  componentDidMount() {
    // Go back to first 10 or 20 houses when search is made again with new filters
    this.setState({offset: 0});

    // Server Call with housing filter parameters to get first 10 or 20 houses
    let that=this
    axios.post('/GET-HOUSES', {
      "state": "CA",
      "offset": this.state.offset
    }).then(function (response) {
      // Make Cards for House Listings
      console.log(response.data);
      let tempCard = []


      for (let i in response.data) {
        var details, reviews;
        details = +response.data[i].bedrooms + " Bed • " + +response.data[i].bathrooms + " Bath • " + +response.data[i].sqft + " sqft • $"+ +response.data[i].price

        axios.post('/GET-REVIEWS', {
          "house": response.data[i].address
        }).then(function (reviewsResponse){
          reviews = "Reviews: " + reviewsResponse.data;
          console.log(reviewsResponse.data);
        }).catch(function (error) {
          console.log(error);
        });

        tempCard.push(
          <Card>
            <CardHeader
              title={response.data[i].address}
              subtitle={details}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              Reviews: {reviews}
              <CardActions>
                <FlatButton label="Add Review" />
              </CardActions>
            </CardText>
          </Card>
        )
      }
      that.setState({ houseCards: tempCard })

    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose}/>,
      <FlatButton label="Apply Filters" primary={true} onClick={this.handleSearch}/>,
    ];

    return (
      <div style={{textAlign:'left'}}>
        <RaisedButton label="Filters" onClick={this.handleOpen} />
        <Dialog actions={actions} autoScrollBodyContent modal={true} open={this.state.open} onRequestClose={this.handleClose}>
<div style={{overflowY: 'auto', overflowX:'hidden' }}>
          <p>Minimum Number of Beds:&nbsp;{this.state.minBed}</p>
          <Slider min={0} max={10} step={1} value={this.state.minBed} onChange={this.minBedSlider} />

          <p>Maximum number of Beds:&nbsp;{this.state.maxBed}</p>
          <Slider min={0} max={10} step={1} value={this.state.maxBed} onChange={this.maxBedSlider}/>

          <p>Minimum Number of Baths:&nbsp;{this.state.minBath}</p>
          <Slider min={0} max={10} step={1} value={this.state.minBath} onChange={this.minBathSlider} />

          <p>Maximum number of Baths:&nbsp;{this.state.maxBath}</p>
          <Slider min={0} max={10} step={1} value={this.state.maxBath} onChange={this.maxBathSlider}/>

          <p>Minimum Price:&nbsp;{this.state.minPrice}</p>
          <Slider min={0} max={5000} step={100} value={this.state.minPrice} onChange={this.minPriceSlider} />

          <p>Maximum Price:&nbsp;{this.state.maxPrice}</p>
          <Slider min={0} max={5000} step={100} value={this.state.maxPrice} onChange={this.maxPriceSlider}/>

          <p>Minimum Square Feet:&nbsp;{this.state.minSqFt}</p>
          <Slider min={0} max={5000} step={100} value={this.state.minSqFt} onChange={this.minSqFtSlider} />

          <p>Maximum Square Feet:&nbsp;{this.state.maxSqFt}</p>
          <Slider min={0} max={5000} step={100} value={this.state.maxSqFt} onChange={this.maxSqFtSlider}/>
          </div>
        </Dialog>

        {this.state.houseCards}

      </div>
    );
  }
}

export default LandingScreen;
