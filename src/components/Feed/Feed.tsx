import React from 'react';
import { Link } from 'react-router-dom';
import { CleanedArticle } from '../../Models';
import Card from '../Card/Card';
import './Feed.css';

interface FeedProps {
  userSentiment: number | null;
  articles: CleanedArticle[];
  updateUserSentiment: (userSentiment: number) => void;
}

const Feed = ({ userSentiment, articles, updateUserSentiment }: FeedProps): JSX.Element => {

  let sortedArticles : CleanedArticle[];

  if (userSentiment && userSentiment >= -1 && userSentiment <= -0.3) {
    sortedArticles = articles.sort((articleA, articleB) => {
      return articleB.sentiment - articleA.sentiment;
    })
  } else if (userSentiment && userSentiment <= 1 && userSentiment >= 0.3) {
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
        sentiment={ article.sentiment }
        topic={ article.topic }
        updateUserSentiment={ updateUserSentiment }
        key={ article.title }
      />
    })

    return (
      <>
        <div className="articles-container">
          <div className="feed-button-container">
            <Link to='/'>
              <button className='retake-btn'>Retake Questionnaire</button>
            </Link>
            <Link to='/search-topic'>
              <button className='search-topics-btn'>Search Topics</button>
            </Link>
            </div>
            <section className="articles-display">
              { articleCards }
            </section>
        </div>
      </>
    );
};


export default Feed;
