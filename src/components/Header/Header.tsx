import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <div className="header-elements-container">
        <Link to='/'>
          <button className="check-in-btn">
            <span className="check-in-text">Check In</span>
          </button>
        </Link>
        <h1 className="header-txt cy-header-txt">
          Well<span className="header-text-2">News</span>
        </h1>
        <Link to='/history'>
          <button className="history-btn">History</button>
        </Link>
        <Link to='/search-topic'>
          <button className="list-btn" aria-label="Browse by Topic"></button>
        </Link>
      </div>
    </header>
  )
}


export default Header;
