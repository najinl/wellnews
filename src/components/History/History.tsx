import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import { CleanedArticle } from '../../Models';
import '../Feed/Feed.css'

interface HistoryProps {
  history: CleanedArticle[];
  updateUserSentiment: (userSentiment: number) => void
  storeArticle: (id: string) => void
}

const History = ({ history, storeArticle, updateUserSentiment }: HistoryProps): JSX.Element => {

  let articleCards: JSX.Element[] = [];

  if (history) {
    articleCards = history.map((article: CleanedArticle) => {
      return (
        <Card
          title={ article.title }
          image={ article.multimedia.url }
          key={ article.title }
          sentiment={ article.sentiment }
          id={ article.id }
          storeArticle={ storeArticle }
          updateUserSentiment={ updateUserSentiment }
        />
      )
    })
  }

  return (
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
          { articleCards.length ? articleCards : <h3>No history</h3> }
        </section>
    </div>
  )
}

export default History;
