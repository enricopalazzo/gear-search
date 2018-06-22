import _ from 'lodash';
import React, { Component } from 'react';
import ShopListItem from './shop_list_item';
import { Link } from 'react-router-dom';

class ShopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      average_price: null,
      min_price: {},
      is_loading: true
    }
  }
  componentWillMount() {
    //  var average_price = _.sumBy(this.props.shop_results, 'price'); 
    var average_price = Math.round(_.meanBy(this.props.shop_results, 'price') * 100) / 100;
    this.setState({ average_price: average_price });
    var min_price = _.minBy(this.props.shop_results, 'price');
    this.setState({ min_price: min_price });
    if (this.props.isLoading === false) {
      this.setState({ is_loading: false });
    }
  }
  render() {
    var colClass = (this.props.isDashboard ? '' : 'card-columns');
    const shopItem = _.map(_.take(this.props.shop_results, this.props.itemsToShow), function (value, key) {
      return (
        <ShopListItem
          key={value.url}
          data={value} />
      );
    });

    return (
      <div>

            <div>        <h5>Min price:  <strong>${this.state.min_price ? this.state.min_price.price : null}</strong> |
      Average price: <strong>${this.state.average_price}</strong> </h5>
              <div className={colClass}>
                {shopItem}
              </div></div>


      </div>
    );
  }
}

export default ShopList;
