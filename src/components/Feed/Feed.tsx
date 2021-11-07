import React from 'react';
import { Link } from 'react-router-dom';
import { CleanedArticle } from '../../Models';
import Card from '../Card/Card';
import './Feed.css';

interface FeedProps {
  userSentiment: number | null;
  articles: CleanedArticle[];
  updateHistory: (localHistory: string[]) => void;
  updateUserSentiment: (userSentiment: number) => void;
  history: string[]
}

const Feed = ({ userSentiment, articles, updateHistory, history, updateUserSentiment }: FeedProps): JSX.Element => {

  const unreadArticles = articles.filter(article => {
    return !history.includes(article.id)
  })

  let sortedArticles : CleanedArticle[];

  if (userSentiment && userSentiment >= -1 && userSentiment <= -0.3) {
    sortedArticles = unreadArticles.sort((articleA, articleB) => {
      return articleB.sentiment - articleA.sentiment;
    })
  } else if (userSentiment && userSentiment <= 1 && userSentiment >= 0.3) {
    sortedArticles = unreadArticles.sort((articleA, articleB) => {
      return articleA.sentiment - articleB.sentiment;
    })
  } else {
    sortedArticles = unreadArticles.sort((articleA, articleB) => 0.5 - Math.random());
  }

  const articleCards = sortedArticles.map(article => {
    return  (
      <Card
        title={ article.title }
        image={ article.multimedia.url }
        id={ article.id }
        updateHistory={ updateHistory }
        sentiment={ article.sentiment }
        updateUserSentiment={ updateUserSentiment }
        key={ article.title }
      />
    )
  })

  return (
    <>
      <div className="articles-container">
        <Link to='/history'>
          <button className='history-btn'>History</button>
        </Link>
        <Link to='/'>
          <button className='retake-btn'>Retake Questionnaire</button>
        </Link>
        <Link to='/search-topic'>
          <button className='search-topics-btn'>Search Topics</button>
        </Link>
          <section className="articles-display">
            { articleCards.length ? articleCards : <h3>No more articles</h3> }
          </section>
      </div>
    </>
  );
};

export default Feed;
