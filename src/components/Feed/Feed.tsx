import React, { useState, useEffect } from 'react';
import { getArticles, getSentiment } from '../../apiCalls';
import { CleanedArticle } from '../../Models'
import Card from '../Card/Card';
import './Feed.css';

interface FeedProps {
  userSentiment: number | null;
}

const Feed = ({ userSentiment }: FeedProps): JSX.Element => {
  const [articles, setArticles] = useState<CleanedArticle[]>([]);
  const [error, setError] = useState('');

  const getSentimentScores = (cleanedArticles: CleanedArticle[]): Promise<number[]> => {
    return Promise.all(
      cleanedArticles.map((article: CleanedArticle) => {
        return getSentiment(article.title, article.abstract)
        // .catch(error => {
        //     console.log('getArticles error message: ', error.message)
        //     setError(error.message)
        //   });
      })
    );
  };

  useEffect((): void => {
    getArticles()
      .then((cleanedArticles: CleanedArticle[]): void => {
        getSentimentScores(cleanedArticles)
          .then((response: number[]) => {
            const scoredArticles = cleanedArticles.map((article, i) => {
               article.sentiment = response[i] || 0;
               return article;
            });
            sortByUserSentiment(userSentiment, scoredArticles);
          });
      })
      .catch(error => setError(error.message));
      // .catch(error => {
      //     console.log('getArticles error message: ', error.message)
      //     setError(error.message)
      //   });
  }, []);

  const sortByUserSentiment = (userSentiment: number|null, scoredArticles: CleanedArticle []): void => {
    let sortedArticles : CleanedArticle[] = [];

    if (userSentiment === -1) {
      sortedArticles = scoredArticles.sort((articleA, articleB) => {
        return articleB.sentiment - articleA.sentiment;
      })
    } else if (userSentiment === 1) {
      sortedArticles = scoredArticles.sort((articleA, articleB) => {
        return articleA.sentiment - articleB.sentiment;
      })
    } else {
      sortedArticles = scoredArticles.sort((articleA, articleB) => 0.5 - Math.random());
    }

    setArticles(sortedArticles)
  }

  return (
    <div className="articles-container">
      <section className="articles-display">
        { error && <h2>{ error }</h2> }
        { !articles.length && <h1>Loading...</h1> }
        { articles.map(article =>
          <Card
            title={ article.title }
            image={ article.multimedia.url }
            key={ article.title }
          />
        )}
      </section>
    </div>
  );
};

export default Feed;
