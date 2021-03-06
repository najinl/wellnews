import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface Header {
  assignTopic: (topic: string) => void
  selectedTopic: string
}

const Header = ({ assignTopic, selectedTopic }: Header): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <Link to='/wellnews'>
        <button className="check-in-btn" aria-label="Return to check in question">
        </button>
      </Link>
      <Link
        to='/wellnews/feed/home'
        onClick={() => assignTopic('home')}>
        <h1 className="header-txt cy-header-txt">
          Well<span className="header-text-2">News</span>
        </h1>
      </Link>
      { menuOpen ?
        <Link to={`/wellnews/feed/${ selectedTopic }`} onClick={ () => setMenuOpen(false) }>
          <button className="list-btn" aria-label="Browse by Topic"></button>
        </Link>
        : <Link to='/wellnews/topics' onClick={ () => setMenuOpen(true) }>
          <button className="list-btn" aria-label="Browse by Topic"></button>
        </Link>

      }
    </header>
  )
}

export default Header;
