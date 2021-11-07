import React from 'react';
import './Header.css';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <button className="check-in-btn">
        <span className="nav-text">Check In</span>
      </button>
      <h1 className="header-txt cy-header-txt">
        Well<span className="header-text-2">News</span>
      </h1>
      <button className="history-btn">History</button>
      <button className="list-btn"></button>
    </header>
  )
}


export default Header;
