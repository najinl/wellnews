import { Link } from 'react-router-dom'
import './Card.css';

interface CardProps {
  title: string
  image: string
  id: number
  sentiment: number | any
  updateUserSentiment: any
}

const Card = ({ title, image, id, sentiment, updateUserSentiment }: CardProps): JSX.Element => {
  return (

      <div className="card-container">
        <article className="news-card cy-article-card">
          <Link
            to={`/feed/${id}`}
            onClick={() => updateUserSentiment(sentiment) }
          >
            <img className="article-image cy-article-image" src={image} alt={title} />
            <h2 className="article-title cy-article-title">{title}</h2>
          </Link>
          {sentiment > 0.3 && <h3 className="article-sentiment green">{(sentiment * 10).toFixed(1)}</h3>}
          {sentiment < -0.3 && <h3 className="article-sentiment red">{(sentiment * 10).toFixed(1)}</h3>}
          {(sentiment >= -0.3 && sentiment <= 0.3) && <h3 className="article-sentiment blue">{(sentiment * 10).toFixed(1)}</h3>}
        </article>
      </div>

  )
}

export default Card;
