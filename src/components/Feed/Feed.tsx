import { useState, useEffect } from 'react';
import { getArticles, getSentiment } from '../../apiCalls';
import { CleanedArticle } from '../../Models'
import Card from '../Card/Card';
import Article from '../Article/Article';
import './Feed.css';

interface FeedProps {
  userSentiment: number | null;
}

const Feed = ({ userSentiment }: FeedProps): JSX.Element => {
  const [articles, setArticles] = useState<CleanedArticle[]>([]);
  const [error, setError] = useState('');
  const [singleArticle, setSingleArticle] = useState<CleanedArticle | null>(null)

  const getSentimentScores = (cleanedArticles: CleanedArticle[]): Promise<number[]> => {
    return Promise.all(
      cleanedArticles.map((article: CleanedArticle) => {
        return getSentiment(article.abstract)
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

  const selectSingleArticle = (id: number) => {
    const article = articles.find(article => article.id === id)
    if (article) {
      setSingleArticle(article)
    }
  }

  const showFeed = ():void => {
    setSingleArticle(null)
  }

  return (
    <div className="articles-container">
      <section className="articles-display">
        { error && <h2>{ error }</h2> }
        { !articles.length && <h1>Loading...</h1> }
        { !singleArticle && articles.map(article =>
          <Card
            title={ article.title }
            image={ article.multimedia.url }
            id={ article.id }
            selectSingleArticle={ selectSingleArticle }
            key={ article.title }
          />)
        }
        { singleArticle &&
          <Article
            title={ singleArticle.title }
            image={ singleArticle.multimedia.url }
            caption={ singleArticle.multimedia.caption }
            abstract={ singleArticle.abstract }
            showFeed={ showFeed }
            key={ singleArticle.title }
          />
        }
      </section>
    </div>
  );
};

export default Feed;
