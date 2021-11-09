import { Link } from 'react-router-dom';
import { CleanedArticle } from '../../Models';
import TopicCard from '../TopicCard/TopicCard';
import Header from '../Header/Header';

interface TopicFeed {
  unreadArticles: CleanedArticle[] | undefined;
  selectedTopic: string
  updateUserSentiment: (userSentiment: number) => void;
  storeArticle?: (id: string) => void
}

const TopicFeed = ({ unreadArticles, updateUserSentiment, selectedTopic, storeArticle }: TopicFeed): JSX.Element => {

  let articleCards: JSX.Element[] = [];

  if (unreadArticles) {
    articleCards = unreadArticles.map(article => {
      return (
        <TopicCard
          title={ article.title }
          image={ article.multimedia.url }
          id={ article.id }
          sentiment={ article.sentiment }
          updateUserSentiment={ updateUserSentiment }
          storeArticle={ storeArticle! }
          selectedTopic = { selectedTopic }
          key={ article.title }
        />
      )
    })
  }

    return (
      <>
        <Header />
        <div className="articles-container">
          <Link to='/'>
            <button className='retake-btn'>Retake Questionnaire</button>
          </Link>
          <Link to='/search-topic'>
            <button className='search-topics-btn'>Search Topics</button>
          </Link>
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

export default TopicFeed;
