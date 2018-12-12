import React, { Component } from 'react';

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }
  render() {
 
    return (
  <div style={{padding:'15px'}}><h2>Search For your Gear ⚙</h2></div>
    );
  }
}
export default ProductPage;