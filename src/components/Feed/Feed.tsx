import { Link } from 'react-router-dom';
import { CleanedArticle } from '../../Models';
import Card from '../Card/Card';
import './Feed.css';

interface FeedProps {
  unreadArticles: CleanedArticle[] | undefined;
  updateUserSentiment: (userSentiment: number) => void;
  storeArticle: (id: string) => void;
}

const Feed = ({ unreadArticles, updateUserSentiment, storeArticle }: FeedProps): JSX.Element => {

  let articleCards: JSX.Element[] = [];

  if (unreadArticles) {
    articleCards = unreadArticles.map(article => {
      return  (
        <Card
          title={ article.title }
          image={ article.multimedia.url }
          id={ article.id }
          sentiment={ article.sentiment }
          updateUserSentiment={ updateUserSentiment }
          storeArticle={ storeArticle }
          key={ article.title }
        />
      )
    })
  } else {
    articleCards = []
  }

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
            { articleCards.length > 1 ? articleCards :
              <Link to="/search-topic">
                <button className='find-more-btn'>Find more articles by topic</button>
              </Link> }
          </section>
      </div>
    </>
  );
};

export default Feed;
