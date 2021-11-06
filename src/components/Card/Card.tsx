import { Link } from 'react-router-dom'
import './Card.css';

interface CardProps {
  title: string
  image: string
  id: string
  updateHistory: ([]) => void;
  sentiment: number
  updateUserSentiment?: (userSentiment: number) => void
}

const Card = ({ title, image, id, updateHistory, sentiment, updateUserSentiment }: CardProps): JSX.Element => {

  const storeArticle = (id: string): void => {
      let localHistory = JSON.parse(localStorage.getItem('wellnewsHistory')!);
      console.log('history before: ', localHistory)
      if (!localHistory) {
        localHistory = [id];
        localStorage.setItem('wellnewsHistory', JSON.stringify([id]));
        updateHistory(localHistory)
      } else if (!localHistory.includes(id)) {
        localHistory.push(id)
        localStorage.setItem('wellnewsHistory', JSON.stringify(localHistory))
        updateHistory(localHistory)
      }
      console.log('history after', JSON.parse(localStorage.getItem('wellnewsHistory')!))
    }

  const handleClick = () => {
    storeArticle(id)
    updateUserSentiment!(sentiment)
  }

  return (

      <div className="card-container">
        <article className="news-card cy-article-card">
          <Link
            to={`/feed/${id}`}
            onClick={ handleClick }
            className="cy-article-link"
          >
            <img className="article-image cy-article-image" src={image} alt={title} />
            <h2 className="article-title cy-article-title">{title}</h2>
          </Link>
        </article>
      </div>

  )
}

export default Card;
