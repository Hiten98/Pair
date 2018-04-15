import React, { Component } from "react";
import { Row } from 'react-bootstrap';
import axios from "axios";
import {
  RaisedButton,
  FlatButton,
  Dialog,
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
import FilterHouses from "./FilterHouses";
import SaveHouseDialog from "./SaveHouseDialog";
import MapButton from "./MapButton";
//import Iframe from "react-iframe";
//import './LandingScreen.css';

class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      houseCards: [],
      offset: 0,
      reviews: [],
      temp: false,
      openDialog: false,
      radios: [],
      selectedHouse: "",
      reviewText: "",
      location: '',
      desiredPrice: '',
      desiredRoommate: '',
      houseReviews: [],
      showMap: false,
      address: '',
    };
  }

  handleAddReview = (address) => {
    let that = this
    this.setState({
      selectedHouse: address
    }, () => {
      if (address != "" && this.state.reviewText != "") {
        axios.post("/WRITE-REVIEW", {
          house: address,
          review: this.state.reviewText
        }).then((response) => {
          console.log(response.data);
          if (response.data.status) {
            that.setState({ reviewText: '' }, () => that.handleExpandChange(true, address));
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  };

  handleSave = address => {
    let that = this;
    this.setState({
      selectedHouse: address
    });
    axios.post("/GET-CHATROOM", {
      userID: this.props.uid
    }).then(function (response) {
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
        that.setState({ radios: r, openDialog: true });
      }
    }).catch(function (error) {
      console.log(error);
    });
  };

  handleExpandChange = (expanded, address) => {
    if (expanded) {
      //do everything to get reviews and set it in the state variable
      let that = this;
      axios.post("/GET-REVIEWS", {
        house: address
      })
        .then(function (response) {
          // console.log(response.data);
          let tempHouseReviews = that.state.houseReviews;
          tempHouseReviews[address] = [];
          let count;
          for (let i in response.data) {
            if (i != "count")
              tempHouseReviews[address].unshift(<Paper key={i}><MenuItem primaryText={response.data[i]} /></Paper>);
            else
              tempHouseReviews[address].unshift("Number of Housing Groups Interested: " + response.data[i]);
          }
          tempHouseReviews[address].unshift(<div key='Reviews'>Reviews:</div>);
          that.setState({ houseReviews: tempHouseReviews }, that.renderReviews);

          //{reviews.length > 1 ? reviews : <h5>No Reviews</h5>}
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  renderReviews = () => {
    if (this.state.temp) {
      this.handleSearch(this.state.filters)
    } else {
      this.addHouses()
    }
  }

  componentDidMount() {
    let that = this;
    // Get Intern Location
    axios
      .post("/GET-INTERN", {
        userID: this.props.uid
      })
      .then(function (internResponse) {
        let internLocation = internResponse.data.location.split(", ");
        //console.log(internResponse.data);
        that.setState({
          location: internLocation[1],
          desiredRoommate: internResponse.data.housing.desiredRoommate,
          desiredPrice: internResponse.data.housing.desiredPrice
        }, that.addHouses);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addHouses = () => {
    let that = this;
    // Go back to first 10 or 20 houses when search is made again with new filters
    this.setState({ offset: 0, temp: false });

    // Server Call with housing filter parameters to get first 10 or 20 houses

    axios
      .post("/GET-HOUSES", {
        state: that.state.location,
        offset: this.state.offset
      })
      .then(function (response) {
        // Make Cards for House Listings
        // console.log(response.data);
        //console.log(response.data);
        let tempCard = [];
        // console.log(response.data)
        for (let i in response.data) {
          that.formatHouses(response.data[i], tempCard, i);
        }
        that.setState({ houseCards: tempCard });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleSearch = (sendBack) => {
    // console.log(this.props);
    // Go back to first 10 or 20 houses when search is made again with new filters
    this.setState({ offset: 0, temp: true, filters: sendBack });

    // Server Call with housing filter parameters to get first 10 or 20 houses
    let that = this;
    // console.log(this.state.offset)
    axios
      .post("/GET-FILTERED-HOUSES", {
        state: this.props.location,
        offset: this.state.offset,
        minBedrooms: sendBack.minBed,
        maxBedrooms: sendBack.maxBed,
        minBathrooms: sendBack.minBath,
        maxBathrooms: sendBack.maxBath,
        minPrice: sendBack.minPrice,
        maxPrice: sendBack.maxPrice,
        minsqft: sendBack.minSqFt,
        maxsqft: sendBack.maxSqFt,
      })
      .then(function (response) {
        // Make Cards for House Listings

        console.log(response.data);
        if (response.data.status === false) {
          //console.log("No houses found!")
          let tempCard = [];
          tempCard.push(
            <Paper>
              <MenuItem primaryText={"No Results Found"} />
            </Paper>
          );
          that.setState({ houseCards: tempCard });
        } else {
          let tempCard = [];

          for (let i in response.data) {
            that.formatHouses(response.data[i], tempCard, i);
          }
          that.setState({ houseCards: tempCard });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  formatHouses = (rdata, tempCard, i) => {
    let that = this
    if (!isNaN(rdata)) return;
    let details = "";
    if (
      rdata.bedrooms > 0 &&
      rdata.bedrooms != null
    )
      details += +rdata.bedrooms + " Bed • ";
    if (
      rdata.bathrooms > 0 &&
      rdata.bathrooms != null
    )
      details += +rdata.bathrooms + " Bath • ";
    if (rdata.sqft > 0 && rdata.sqft != null)
      details += +rdata.sqft + " sqft • ";
    if (rdata.price > 0 && rdata.price != null)
      details += "$" + +rdata.price;

    tempCard.push(
      <Card key={i} onExpandChange={(expanded) => that.handleExpandChange(expanded, rdata.address)}>
        <CardHeader
          title={rdata.address}
          subtitle={details}
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardActions style={{ marginTop: "-25px" }}>
          <FlatButton
            label="Save House"
            secondary
            onClick={() => that.handleSave(rdata.address)}
          />
          <FlatButton
            label="Go to Listing"
            secondary
            onClick={() => window.open(rdata.url, "_blank")}
          />
          <FlatButton
            label='Show Map'
            onClick={() => this.setState({ showMap: true, address: rdata.address })}
            secondary
          />
        </CardActions>

        <CardText expandable={true} style={{ marginTop: "-20px" }}>
          {that.state.houseReviews[rdata.address]}
          <TextField
            hintText="Type Review Here"
            multiLine={true}
            rows={2}
            rowsMax={8}
            fullWidth={true}
            onChange={(event, value) => this.setState({ reviewText: value })}
          />
        </CardText>

        <CardActions expandable style={{ marginTop: "-20px" }}>
          <FlatButton
            label="Add Review"
            secondary
            onClick={() => that.handleAddReview(rdata.address)}
          />
        </CardActions>
      </Card>
    );
  }

  render() {
    return (
      <div style={{ textAlign: "left" }}>
        <Row style={{ paddingLeft: '20px', paddingRight: '20px', marginTop: '10px' }}>
          <FilterHouses {...this.state} handleSearch={this.handleSearch} />

          {this.state.houseCards}
        </Row>

        <Dialog
          open={this.state.showMap}
          onRequestClose={() => this.setState({ showMap: false, address: '' })}
          actions={[
            <RaisedButton
              label='Close'
              onClick={() => this.setState({ showMap: false, address: '' })}
            />
          ]}
        >
          <div style={{ height: '200px' }}>
            {this.state.showMap ? <MapButton address={this.state.address} /> : null}
          </div>
        </Dialog>
        <SaveHouseDialog {...this.props} {...this.state} handleCloseDialog={() => this.setState({ openDialog: false })} />
      </div>
    );
  }
}

export default LandingScreen;
