import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface Header {
  assignTopic: (topic: string) => void
}

const Header = ({ assignTopic }: Header): JSX.Element => {
  return (
    <header className="header">
      <Link to='/'>
        <button className="check-in-btn" aria-label="Return to check in question">
        </button>
      </Link>
      <Link
        to={'/feed/home'}
        onClick={() => assignTopic('home')}>
        <h1 className="header-txt cy-header-txt">
          Well<span className="header-text-2">News</span>
        </h1>
      </Link>
      <Link to='/search-topic'>
        <button className="list-btn" aria-label="Browse by Topic"></button>
      </Link>
    </header>
  )
}


export default Header;
