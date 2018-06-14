import React from 'react';

const ShopListItem = ({ data }) => {
  return (
    <div className="card  shadow-sm">
      <a href={data.url} target="_blank">
        <img className="card-img-top" src={data.image} alt={data.title} /></a>
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text">{data.content}</p>
        <p>Price: <strong>${data.price}</strong></p>
        <p>From: <a href={data.url} target="_blank">{data.from}</a></p>
        <a href={data.url} target="_blank" className="btn btn-primary">Go to shop</a>
      </div>
    </div>

  );
};

export default ShopListItem;