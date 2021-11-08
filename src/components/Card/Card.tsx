import { Link } from 'react-router-dom'
import './Card.css';

interface CardProps {
  title: string
  image: string
  id: string
  sentiment: number
  updateUserSentiment: (userSentiment: number) => void
  storeArticle: (id: string) => void
}

const Card = ({ title, image, id, sentiment, updateUserSentiment, storeArticle }: CardProps): JSX.Element => {

  const handleClick = (): void => {
    storeArticle(id)
    updateUserSentiment(sentiment)
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
