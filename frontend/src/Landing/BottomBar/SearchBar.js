import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import { AutoComplete } from 'material-ui';
//import './SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props)
  }

  menuProps={
    onChange:this.changeClick
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default SearchBar;