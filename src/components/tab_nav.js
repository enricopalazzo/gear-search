import React, { Component } from 'react';
import { RoutedTabs, NavTab } from 'react-router-tabs';

class TabNav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="react-router-tabs">
        <NavTab to="/dashboard" className="tab">🏠</NavTab>
        <NavTab to="/videos/" className="tab" disabled={!this.props.results.videos[1]}>Videos ▶</NavTab>
        <NavTab to="/shop" className="tab" disabled={!this.props.results.shop_results}>Shop 🛒</NavTab>
        <NavTab to="/ontheweb" className="tab" disabled={!this.props.results.se_results}>WWW 🌐</NavTab>
      </div>
    );
  }
}
export default TabNav;
