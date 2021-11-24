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
}

const Feed = ({ unreadArticles, updateUserSentiment, storeArticle, selectedTopic }: FeedProps): JSX.Element => {
  const [articleNumber, setArticleNumber] = useState<number>(0)
  let articleCards: JSX.Element[] = [];

  if (unreadArticles) {
    articleCards = unreadArticles.map(article => {
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
          key={ article.title }
        />
      )
    })
  }

  const topic = selectedTopic === 'home' ? 'Top News' : selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)

  return (
    <>
      <Header />
      <h2>{topic}</h2>
      <section className="articles-container">
        <button
          className="arrow-button"
          disabled={ articleNumber ? false : true }
          onClick={() => setArticleNumber(articleNumber - 1)}
          aria-label="Previoius article"
        >
          <span className="material-icons">
            arrow_back_ios
          </span>
        </button>

        { articleCards.length > 0 ? articleCards[articleNumber] :
          <Link to="/search-topic">
            <button className='find-more-btn'>Find more articles by topic</button>
          </Link> }

        <button
          disabled={ articleNumber < articleCards.length - 1 ? false : true }
          className="arrow-button"
          onClick={() => setArticleNumber(articleNumber + 1)}
          aria-label="Next article"
        >
          <span className="material-icons">
            arrow_forward_ios
          </span>
        </button>
      </section>
    </>
  );
};

export default Feed;
