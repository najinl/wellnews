import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CleanedArticle } from '../../Models';
import Card from '../Card/Card';
import Header from '../Header/Header';
import './Feed.css';

interface FeedProps {
  unreadArticles: CleanedArticle[] | undefined;
  updateUserSentiment: (userSentiment: number) => void;
  storeArticle: (id: string) => void;
  selectedTopic: string;
  toggleSaved: (id: string) => void;
  savedArticles: CleanedArticle[];
  assignTopic: (topic: string) => void
  loading: boolean
}

const Feed = ({ unreadArticles, updateUserSentiment, storeArticle, selectedTopic, toggleSaved, savedArticles, assignTopic, loading }: FeedProps): JSX.Element => {
  const [articleNumber, setArticleNumber] = useState<number>(0)
  let articleCards: JSX.Element[] = [];

  if (unreadArticles) {
    articleCards = unreadArticles.map(article => {
      let isSaved;
      if (savedArticles.find(savedArticle => savedArticle.id === article.id)) {
        isSaved = true;
      } else {
        isSaved = false;
      }

      return  (
        <Card
          id={ article.id }
          shortUrl={ article.shortUrl }
          title={ article.title }
          image={ article.multimedia.url }
          sentiment={ article.sentiment }
          topic={ article.topic}
          abstract={ article.abstract }
          updateUserSentiment={ updateUserSentiment }
          storeArticle={ storeArticle }
          toggleSaved={ toggleSaved }
          isSaved={ isSaved }
          key={ article.title }
        />
      )
    })
  }

  const topic = selectedTopic === 'home' ? 'Top News' : selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)

  return (
    <>
      <Header assignTopic={ assignTopic }/>
      <h2>{topic}</h2>
      <section className="articles-container">
        { articleCards.length > 0 &&
          articleCards[articleNumber]
        }
        { articleCards.length === 0 && !loading &&
          <Link to="/wellnews/topics" className="find-more-btn">
            Find more articles by topic
          </Link>
        }
      </section>
      <div className="buffer"></div>
      <div className="arrow-container">
        { !!articleNumber &&
          <button
            className="backward-arrow-btn"
            onClick={() => setArticleNumber(articleNumber - 1)}
            aria-label="Previoius article"
          >
            <span className="material-icons">
              arrow_back_ios
            </span>
          </button>
        }
        { articleNumber < articleCards.length - 1 &&
          <button
          className="forward-arrow-btn"
          onClick={() => setArticleNumber(articleNumber + 1)}
          aria-label="Next article"
          >
            <span className="material-icons">
              arrow_forward_ios
            </span>
          </button>
        }
      </div>
    </>
  );
};

export default Feed;
