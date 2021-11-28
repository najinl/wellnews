import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <Link to='/'>
        <button className="check-in-btn">
          <span className="check-in-text">Check In</span>
        </button>
      </Link>
      <h1 className="header-txt cy-header-txt">
        Well<span className="header-text-2">News</span>
      </h1>
      <Link to='/search-topic'>
        <button className="list-btn" aria-label="Browse by Topic"></button>
      </Link>
    </header>
  )
}


export default Header;
