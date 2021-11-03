import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import './Feed.css';
import { CleanArticle, fetchNewsData, getSentiment } from '../../apiCalls'

interface PropsFeed {
  userSentiment: number | null
}

const Feed = ({ userSentiment }: PropsFeed): JSX.Element => {

  const [ articles, setArticles ] = useState<CleanArticle[]>([])
  const [ error, setError ] = useState('')

  const getSentimentScores = (cleanArticles: CleanArticle[]): Promise<number[]> => {
    return Promise.all(
      cleanArticles.map((article: CleanArticle) => {
        return getSentiment(article.abstract)
      })
    )
  }

  useEffect((): void => {
    fetchNewsData()
      .then((cleanArticles: CleanArticle[]): void => {
        getSentimentScores(cleanArticles)
          .then((response: number[]) => {

            const scoredArticles = cleanArticles.map((article, i) => {
               article.sentiment = response[i] || 0
               return article;
            })
            sortBySentiment(userSentiment, scoredArticles)
          })
      })
      .catch(error => setError(error.message))
  }, [])

  const sortBySentiment = (newSentiment: number|null, scoredArticles: CleanArticle []): void => {
    let sortedArticles : CleanArticle[] = [];

    if (newSentiment === -1) {
      sortedArticles = scoredArticles.sort((articleA, articleB) => {
        return articleB.sentiment - articleA.sentiment;
      })
    } else if (newSentiment === 1) {
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
      { !articles.length && <h1>Loading</h1> }
        {articles.map(article =>
          <Card
          title={article.title}
          image={article.multimedia.url}
          key={article.title}
          />
        )}
        {error && <h2>{error}</h2>}
      </section>
    </div>
  )
}

export default Feed;
