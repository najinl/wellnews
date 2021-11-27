import Card from '../Card/Card';
import { CleanedArticle } from '../../Models';
import Header from '../Header/Header';
import '../Feed/Feed.css';

interface SavedArticlesProps {
  savedArticles: CleanedArticle[];
  updateUserSentiment: (userSentiment: number) => void;
  storeArticle: (id: string) => void;
  toggleSaved: (id: string) => void;
}

const SavedArticles = ({ savedArticles, storeArticle, updateUserSentiment, toggleSaved }: SavedArticlesProps): JSX.Element => {
  let articleCards: JSX.Element[] = [];

  if (savedArticles) {
    articleCards = savedArticles.map((article: CleanedArticle) => {
      let isSaved = false;
      if (savedArticles.find(savedArticle => savedArticle.id === article.id)) {
        isSaved = true;
      } else {
        isSaved = false;
      }

      return (
        <Card
          title={ article.title }
          image={ article.multimedia.url }
          key={ article.title }
          sentiment={ article.sentiment }
          shortUrl={ article.shortUrl }
          id={ article.id }
          topic= { article.topic }
          abstract= { article.abstract }
          storeArticle={ storeArticle }
          toggleSaved={ toggleSaved }
          updateUserSentiment={ updateUserSentiment }
          isSaved={ isSaved }
        />
      )
    })
  }

  return (
    <>
      <Header />
      <div className="articles-container">
          <section className="articles-display">
            { articleCards.length ? articleCards
              : <h3 className="no-match-message">Saved articles will appear here</h3>
            }
          </section>
      </div>
    </>
  )
}

export default SavedArticles;
