import React from 'react';
import { Link } from 'react-router-dom';
import { CleanedArticle } from '../../Models'
import Card from '../Card/Card';
import './Feed.css';

interface FeedProps {
  userSentiment: number | null;
  articles: CleanedArticle[];
}

const Feed = ({ userSentiment, articles }: FeedProps): JSX.Element => {

  let sortedArticles : CleanedArticle[];

  if (userSentiment === -1) {
    sortedArticles = articles.sort((articleA, articleB) => {
      return articleB.sentiment - articleA.sentiment;
    })
  } else if (userSentiment === 1) {
    sortedArticles = articles.sort((articleA, articleB) => {
      return articleA.sentiment - articleB.sentiment;
    })
  } else {
    sortedArticles = articles.sort((articleA, articleB) => 0.5 - Math.random());
  }


   const articleCards = sortedArticles.map(article => {
    return  <Card
        title={ article.title }
        image={ article.multimedia.url }
        id={ article.id }
        key={ article.title }
      />
    })

    return (
      <>
        <Link to='/history'>
          <button className='history-btn'>History</button>
        </Link>
        <div className="articles-container">
          <section className="articles-display">
            {articleCards}
          </section>
        </div>
      </>
    );
};

export default Feed;
