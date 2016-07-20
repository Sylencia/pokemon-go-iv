import React from 'react';
import '../assets/stylesheets/Header.scss';

const Header = () => (
  <div className="header-section columns">
    <div className="column col-sm-3"></div>
    <div className="column col-sm-6">
      <center><h1>iv.go</h1>
      A calculator for determining your Pokemon's IVs in Pokemon Go</center>
    </div>
  </div>
);

export default Header;
