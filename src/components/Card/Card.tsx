import { Link } from 'react-router-dom'
import './Card.css';

interface CardProps {
  title: string
  image: string
  id: number
  sentiment: number
  updateUserSentiment: (userSentiment: number) => void
  // moveToHistory: (id: number) => void;
}

const Card = ({ title, image, id, sentiment, updateUserSentiment, moveToHistory }: CardProps): JSX.Element => {
  return (

      <div className="card-container">
        <article className="news-card cy-article-card">
          <Link
            to={`/feed/${id}`}
            onClick={() => updateUserSentiment(sentiment) }

          >
            <img className="article-image cy-article-image" src={image} alt={title} />
            <h2 className="article-title cy-article-title">{title}</h2>
            <p className='score'>Sentiment: { sentiment }</p>
          </Link>
        </article>
      </div>

  )
}

export default Card;
