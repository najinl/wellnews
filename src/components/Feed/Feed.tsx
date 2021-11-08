import { Link } from 'react-router-dom';
import { CleanedArticle } from '../../Models';
import Card from '../Card/Card';
import Header from '../Header/Header';
import './Feed.css';

interface FeedProps {
  userSentiment: number | null;
  articles: CleanedArticle[];
  updateUserSentiment: (userSentiment: number) => void;
  history: string[]
  storeArticle: (id: string) => void
}

const Feed = ({ userSentiment, articles, history, updateUserSentiment, storeArticle }: FeedProps): JSX.Element => {

  const unreadArticles = articles.filter(article => {
    return !history.includes(article.id)
  })

  let sortedArticles : CleanedArticle[];

  if (userSentiment && userSentiment >= -1 && userSentiment <= -0.3) {
    sortedArticles = unreadArticles.sort((articleA, articleB) => {
      return articleB.sentiment - articleA.sentiment;
    })
  } else if (userSentiment && userSentiment <= 1 && userSentiment >= 0.3) {
    sortedArticles = unreadArticles.sort((articleA, articleB) => {
      return articleA.sentiment - articleB.sentiment;
    })
  } else {
    sortedArticles = unreadArticles.sort((articleA, articleB) => 0.5 - Math.random());
  }

  const articleCards = sortedArticles.map(article => {
    return  (
      <Card
        title={ article.title }
        image={ article.multimedia.url }
        id={ article.id }
        sentiment={ article.sentiment }
        topic={ article.topic }
        updateUserSentiment={ updateUserSentiment }
        storeArticle={ storeArticle }
        key={ article.title }
      />
    )
  })
    return (
      <>
        <Header />
        <div className="articles-container">
          <section className="articles-display">
            { articleCards.length ? articleCards :
              <Link to="/search-topic">
                <button className='find-more-btn'>Find more articles by topic</button>
              </Link> }
          </section>
        </div>
      </>
    );
};

export default Feed;
