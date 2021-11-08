import { Link } from 'react-router-dom';
import { CleanedArticle } from '../../Models';
import TopicCard from '../TopicCard/TopicCard';
import Header from '../Header/Header';

interface TopicFeed {
  userSentiment: number | null;
  selectedArticles: CleanedArticle[];
  selectedTopic: string
  updateUserSentiment: (userSentiment: number) => void;
  storeArticle?: (id: string) => void
}

const TopicFeed = ({ userSentiment, selectedArticles, updateUserSentiment, selectedTopic, storeArticle }: TopicFeed): JSX.Element => {

  let sortedArticles : CleanedArticle[];

  if (userSentiment && userSentiment >= -1 && userSentiment <= -0.3) {
    sortedArticles = selectedArticles.sort((articleA, articleB) => {
      return articleB.sentiment - articleA.sentiment;
    })
  } else if (userSentiment && userSentiment <= 1 && userSentiment >= 0.3) {
    sortedArticles = selectedArticles.sort((articleA, articleB) => {
      return articleA.sentiment - articleB.sentiment;
    })
  } else {
    sortedArticles = selectedArticles.sort((articleA, articleB) => 0.5 - Math.random());
  }

  const articleCards = sortedArticles.map(article => {
    return  <TopicCard
        title={ article.title }
        image={ article.multimedia.url }
        id={ article.id }
        sentiment={ article.sentiment }
        updateUserSentiment={ updateUserSentiment }
        storeArticle={ storeArticle! }
        selectedTopic = { selectedTopic }
        key={ article.title }
      />
    })

    return (
      <>
        <Header />
        <div className="articles-container">
          <section className="articles-display">
            { articleCards }
          </section>
        </div>
      </>
    );
};

export default TopicFeed;
