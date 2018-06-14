import React from 'react';
/* <li className="list-group-item col-md-4" key={data.cacheId}>
   <div className="video-list media">
     <div className="media-left">
     </div>
     <div className="media-body">
       <div className="media-heading"><h6><a href={data.link} target="_blank">{data.title}</a></h6>
       <p>{data.snippet}</p>
       <p>From: {data.displayLink}</p></div>
     </div>
   </div>
 </li>*/
const GoogleListItem = ({ data }) => {
  return (
    <div className="card shadow-sm" key={data.cacheId}>
      <div className="card-body">
        <h5 className="card-title"><a href={data.link} target="_blank">{data.title}</a></h5>
        <p className="card-text">  {data.snippet}</p>
        <p>From: <a href={data.link} target="_blank">{data.displayLink}</a></p>
      </div>
    </div>

  );
};

export default GoogleListItem;