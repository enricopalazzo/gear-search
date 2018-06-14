import React, { Component } from 'react';

class Tools extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //   const SearchItems = _.map(this.props.savedsearch, 'term');
    const SearchItems = (props) => {
      if (this.props.savedsearch!==null) {
        this.props.savedsearch.map((search) => {
          return (
            <li key={search.term}
              onClick={() => this.props.loadFromLocal(search)}>{search.term}</li>
          );
        });
      }
      else {
        return (<li>No searchs saved yet</li>);
      }
    }

    return (
      <div>
        <a href="#" className="btn btn-warning" onClick={this.props.saveToLocal}> Save current search 💾 </a>
        <hr />
        <h5>Your saved searchs</h5>
        <ul>
          <SearchItems />
        </ul>
      </div>
    );
  }
}
export default Tools;