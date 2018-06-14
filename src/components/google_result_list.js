import _ from 'lodash';
import React, { Component } from 'react';
import GoogleListItem from './google_result_list_item';
import { Link } from 'react-router-dom';

class GoogleList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var colClass = (this.props.isDashboard ? '' : 'card-columns');
   /* const ShowList = (props) => {
      if (this.props.isDashboard) {
        return (<div>
          {googleItem}
        </div>)
      }
      else {
        return (<div className="card-columns">
          {googleItem}
        </div>);
      }
    }*/
    const googleItem = _.map(_.take(this.props.gresults, this.props.itemsToShow), function (value, key) {
      return (<GoogleListItem
        key={value.cacheId}
        data={value} />);
    });
    return (
      <div className={colClass}>
         {googleItem}
      </div>
    );
  };
}

export default GoogleList;
