import React from 'react';
import Card from '../Card/Card';
import { Article } from '../App/App';
import './Feed.css';
import { Link } from 'react-router-dom';
import './Feed.css';

interface PropsFeed {
  articles: Article[]
}

const Feed: React.FC<PropsFeed> = ({ articles }) => {
  return (
    <Link to="/WellNewsFeed">
      <div className="articles-container">
        <section className="articles-display">
          {articles.map(article =>
            <Card
            title={article.title}
            image={article.multimedia[0].url}
            key={article.title}
            />
          )}
        </section>
      </div>
      </Link>
  )
}

export default Feed;
