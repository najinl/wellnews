import React from 'react';
import { Link } from 'react-router-dom';
import { CleanedArticle } from '../../Models';
import Card from '../Card/Card';
import SectionForm from '../SectionForm/SectionForm';
import './Feed.css';

interface FeedProps {
  userSentiment: number | null;
  articles: CleanedArticle[];
  updateHistory: ([]) => void;
  selectedArticles: CleanedArticle[];
  findMatchingArticles: (findMatchingArticles: string[]) => void;
  updateUserSentiment: (userSentiment: number) => void;
}

const Feed = ({ userSentiment, articles, updateHistory, selectedArticles, findMatchingArticles, updateUserSentiment }: FeedProps): JSX.Element => {

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
        updateHistory={ updateHistory }
        sentiment={ article.sentiment }
        updateUserSentiment={ updateUserSentiment }
        key={ article.title }
      />
    })

    const foundArticleCards = selectedArticles.map(article => {
     return  <Card
         title={ article.title }
         image={ article.multimedia.url }
         id={ article.id }
         sentiment={ article.sentiment }
         updateHistory={ updateHistory }
         updateUserSentiment= { updateUserSentiment }
         key={ article.title }
       />
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
          <div className="all-sections">
            <SectionForm findMatchingArticles={ findMatchingArticles }/>
          </div>
            <section className="articles-display">
              { foundArticleCards.length ? foundArticleCards : articleCards }
            </section>
        </div>
      </>
    );
};

export default Feed;
