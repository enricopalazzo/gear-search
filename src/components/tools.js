import _ from 'lodash';
import React, { Component } from 'react';

class Tools extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //   const SearchItems = _.map(this.props.savedsearch, 'term');
    const SearchItems = this.props.savedsearch.map((search) => {
      return (
        <li key={search.term}
          onClick={() => this.props.loadFromLocal(search)}>{search.term}</li>
      );
    });

    return (
      <div>
        <a href="#" className="btn btn-light" onClick={this.props.saveToLocal}>Save current Search 💾</a>
        <hr />
        <h5>Your saved searchs</h5>
        <ul className="saved-searchs">
          {SearchItems}
        </ul>
      </div>
    );
  }
}
export default Tools;