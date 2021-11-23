import { Link } from 'react-router-dom';
import { CleanedArticle } from '../../Models';
import Card from '../Card/Card';
import Header from '../Header/Header';
import './Feed.css';

interface FeedProps {
  unreadArticles: CleanedArticle[] | undefined;
  updateUserSentiment: (userSentiment: number) => void;
  storeArticle: (id: string) => void;
  selectedTopic?: string;
}

const Feed = ({ unreadArticles, updateUserSentiment, storeArticle, selectedTopic }: FeedProps): JSX.Element => {

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
          selectedTopic={ selectedTopic}
          updateUserSentiment={ updateUserSentiment }
          storeArticle={ storeArticle }
          key={ article.title }
        />
      )
    })
  }

  return (
    <>
      <Header />
      <div className="articles-container">
        <section className="articles-display">
          { articleCards.length > 0 ? articleCards :
            <Link to="/search-topic">
              <button className='find-more-btn'>Find more articles by topic</button>
            </Link> }
        </section>
      </div>
    </>
  );
};

export default Feed;
