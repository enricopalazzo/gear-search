import _ from 'lodash';
import React, { Component } from 'react';
import VideoListItem from './video_list_item';
import { Link } from 'react-router-dom';

class VideoList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //const videoItems = _.map(_.take(this.props.videos, this.props.itemsToShow), function (video) { THIS DOESN'T PASS THE PROP onVideoSelect
    const videoItems = this.props.videos.slice(0, this.props.itemsToShow).map((video) => { //THIS WORKS
      return (

        <VideoListItem
          key={video.etag}
          onVideoSelect={this.props.onVideoSelect}
          video={video} />

      );
    });
    return (
      <ul className="video-list-container">
        {videoItems}
      </ul>
    );
  };
}
export default VideoList;
