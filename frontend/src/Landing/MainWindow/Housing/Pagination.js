import React, { Component } from 'react';
import FlatPagination from 'material-ui-flat-pagination'
//import './Pagination.css';

class Pagination extends Component {
  render() {
    return (
      <FlatPagination
        offset={this.props.offset}
        total={this.props.numPages/20}
        limit={1}
        onClick={(e, offset)=>this.props.changePage(offset)}
      />
    );
  }
}

export default Pagination;
