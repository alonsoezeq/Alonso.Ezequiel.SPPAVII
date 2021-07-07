import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div align="center" className="lds-grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;