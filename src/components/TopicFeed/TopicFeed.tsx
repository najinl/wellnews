import { Link } from 'react-router-dom';
import { CleanedArticle } from '../../Models';
import TopicCard from '../TopicCard/TopicCard';
import '../Feed/Feed.css';

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
        <div className="articles-container">
          <Link to='/'>
            <button className='retake-btn'>Retake Questionnaire</button>
          </Link>
          <Link to='/search-topic'>
            <button className='search-topics-btn'>Search Topics</button>
          </Link>
            <section className="articles-display">
              { articleCards }
            </section>
        </div>
      </>
    );
};

export default TopicFeed;
