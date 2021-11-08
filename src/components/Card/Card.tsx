import { Link } from 'react-router-dom'
import './Card.css';

interface CardProps {
  title: string
  image: string
  id: string
  sentiment: number
  topic: string
  updateUserSentiment: (userSentiment: number) => void
  storeArticle: (id: string) => void
}

const Card = ({ title, image, id, sentiment, topic, updateUserSentiment, storeArticle }: CardProps): JSX.Element => {

  const handleClick = (): void => {
    updateUserSentiment(sentiment)
    storeArticle(id)
  }
  
  return (
    <div className="article-boundary">
      <div className="card-container">
        <article className="news-card cy-article-card">
          <Link
            to={`/feed/${id}`}
            onClick={ handleClick }
            className="cy-article-link"
          >
          <div className="article-image-container">
            {sentiment >= 7 && <h3 className="article-sentiment green">{sentiment}</h3>}
            {sentiment <= 4 && <h3 className="article-sentiment red">{sentiment}</h3>}
            {(sentiment >= 5 && sentiment <= 6) && <h3 className="article-sentiment blue">{sentiment}</h3>}
            <img className="article-image cy-article-image" src={image} alt={title} />
          </div>
          <div className="topic-container">
            <div className="topic-text">
              {topic}
            </div>
          </div>
          <h2 className="article-title cy-article-title">{title}</h2>
          </Link>
          <div className="divider"></div>
        </article>
      </div>
    </div>
  )
}

export default Card;
