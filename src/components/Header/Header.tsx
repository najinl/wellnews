import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <Link to='/'>
        <button className="check-in-btn">
          <span className="nav-text">Check In</span>
        </button>
      </Link>
      <h1 className="header-txt cy-header-txt">
        Well<span className="header-text-2">News</span>
      </h1>
      <button className="history-btn">History</button>
      <Link to='/search-topic'>
        <button className="list-btn"></button>
      </Link>
    </header>
  )
}


export default Header;
