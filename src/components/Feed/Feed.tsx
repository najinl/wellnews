import React from 'react';
import Card from '../Card/Card';
import { Article } from '../App/App';
import './Feed.css';

interface PropsFeed {
  articles: Article[]
}

const Feed: React.FC<PropsFeed> = ({ articles }) => {
  return (
    <section>
      {articles.map(article =>
        <Card
        title={article.title}
        image={article.multimedia[0].url}
        key={article.title}
        />
      )}
    </section>
  )
}

export default Feed;
