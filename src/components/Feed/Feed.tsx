import React from 'react';
import Card from '../Card/Card';
import './Feed.css';
import { CleanArticle } from '../../apiCalls'

interface PropsFeed {
  articles: CleanArticle[]
}

const Feed: React.FC<PropsFeed> = ({ articles }) => {
  return (
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
  )
}

export default Feed;
