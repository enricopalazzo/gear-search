import React from 'react';

const VideoListItem = ({video, onVideoSelect}) =>
{
 const imageUrl = video.snippet.thumbnails.default.url;
 return (
 <li onClick={()=> onVideoSelect(video)} className="list-group-item  shadow-sm">
    <div className="video-list media">
      <div className="media-left">
      <img className="media-object" src={imageUrl} />
      </div>
      <div className="media-body">
        <div className="media-heading"><h6>{video.snippet.title}</h6></div>
      </div>
    </div>
  </li>
  );
};

export default VideoListItem;