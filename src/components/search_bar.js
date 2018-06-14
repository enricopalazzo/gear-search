import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
    this.keyPress = this.keyPress.bind(this);
  }
  componentWillReceiveProps (nextProps) {

    if (nextProps.searchterm) {
      this.setState({ term: nextProps.searchterm });
    }

    /* axios.get('https://search.4ray.co?q=fender%20site%3Athegearpage.net&categories=general&pageno=2&language=en&format=json')
       .then(response => this.setState({ se_results: response.data.results })) */
  }
  render() {
    var disabled = "disabled";
    return (
      <div className="search-container">
              <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} onKeyDown={this.keyPress} placeholder="What are you looking for?" className="search-box" />
        <button type="submit" className='search-button' onClick={this.props.searchStuff} disabled={!this.state.term} >
          🔎
      </button>
      </div>
    );
  }
  onInputChange(term) {
    this.setState({ term });
    this.props.setSearchTerm(term);
  }

  keyPress(e) {
    if (e.keyCode == 13) {

      this.props.searchStuff();
    }
  }
}
export default SearchBar;