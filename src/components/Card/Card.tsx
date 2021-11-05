import { Link } from 'react-router-dom'
import './Card.css';

interface CardProps {
  title: string
  image: string
  id: number
  updateUserSentiment: (userSentiment: number) => void
}

const Card = ({ title, image, id, updateUserSentiment }: CardProps): JSX.Element => {
  return (

      <div className="card-container">
        <article className="news-card cy-article-card">
          <Link
            to={`/feed/${id}`}
            onClick={() => updateUserSentiment(id) }
          >
            <img className="article-image cy-article-image" src={image} alt={title} />
            <h2 className="article-title cy-article-title">{title}</h2>
          </Link>
        </article>
      </div>

  )
}

export default Card;

// <a href={url} target="_blank" >Read Full Article</a>
