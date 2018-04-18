import React, { Component } from "react";
import MapButton from '../Housing/MapButton';
import axios from "axios";
import {
  RaisedButton,
  FlatButton,
  Dialog,
  MenuItem,
  Paper,
  RadioButton,
  TextField
} from "material-ui";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
//import Iframe from "react-iframe";

class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      houseCards: [],
      offset: 0,
      reviews: [],
      temp: [false, false],
      openDialog: false,
      selectedHouse: "",
      reviewText: "",
      houseReviews: [],
      showMap: false,
      address: '',
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
              this.componentDidMount()
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
      .then(function (response) {
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
      .catch(function (error) {
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

  handleExpandChange = (expanded, address) => {
    // console.log(expanded);
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
          for (let i in response.data) {
            if (i != "count")
              tempHouseReviews[address].unshift(<Paper key={i}><MenuItem primaryText={response.data[i]} /></Paper>);
            else {
              tempHouseReviews[address].unshift(<div key='Reviews'>Reviews:</div>);
              tempHouseReviews[address].unshift(<div key='count'>Number of Housing Groups Interested: {response.data[i] - 1}</div>);
            }
          }
          let tt = that.state.temp;
          tt[address] = true;
          that.setState({ houseReviews: tempHouseReviews, temp: tt }, that.getHousing(that.props));

          //{reviews.length > 1 ? reviews : <h5>No Reviews</h5>}
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      let tt = this.state.temp;
      tt[address] = false;
      this.setState({ temp: tt }, this.getHousing(this.props))
    }


  };

  handleRemoveListing = (address, chatName) => {
    console.log(address)
    console.log(chatName)
    console.log(this.props.uid)
    axios.post("/REMOVE-HOUSE", {
      house: address,
      name: chatName,
      userID: this.props.uid
    }).then((response) => {
      console.log(response.data);
      this.componentDidMount();
    }).catch((error) => {
      console.log(error)
    })
  }

  formatDetails = (data) => {
    let details = "";
    if (
      data.bedrooms > 0 &&
      data.bedrooms != null
    )
      details += data.bedrooms + " Bed • ";
    if (
      data.bathrooms > 0 &&
      data.bathrooms != null
    )
      details += data.bathrooms + " Bath • ";
    if (data.sqft > 0 && data.sqft != null)
      details += data.sqft + " sqft • ";
    if (data.price > 0 && data.price != null)
      details += "$" + data.price;
    return details
  }

  getHousing = props => {
    // Go back to first 10 or 20 houses when search is made again with new filters
    this.setState({ houseCards: [] });

    // Server Call with housing filter parameters to get first 10 or 20 houses
    let that = this;

    axios
      .post("/GET-SAVED-HOUSES", {
        name: props.state.currChatName
      })
      .then(function (response) {
        // Make Cards for House Listings
        let tempCard = [];
        // console.log("SAVED HOUSES:");
        // console.log(response.data);
        if (response.data.status != false) {
          for (let i in response.data) {
            let details = that.formatDetails(response.data[i]);

            let str = "";
            // console.log(response.data[i]);
            // console.log(i);
            if (response.data[i].likes[props.uid] == 1) {
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
              <Card key={i} onExpandChange={(expanded) => that.handleExpandChange(expanded, i)} expanded={that.state.temp[i]}>
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
                  <FlatButton
                    label="Remove Listing"
                    secondary
                    onClick={() => that.handleRemoveListing(i, props.state.currChatName)}
                  />
                  <FlatButton
                    label='Show Map'
                    onClick={() => that.setState({ showMap: true, address: i })}
                    secondary
                  />
                </CardActions>

                <CardText expandable={true} style={{ marginTop: "-20px" }}>
                  {that.state.houseReviews[i]}
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
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getHousing(this.props);
  }

  render() {
    return (
      <div style={{ textAlign: "left" }}>
        {this.state.houseCards}

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
      </div>
    );
  }
}

export default LandingScreen;
