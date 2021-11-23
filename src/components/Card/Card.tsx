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
    storeArticle(id)
    updateUserSentiment(sentiment)
  }

  const displayEmoji = (): string => {
    if (sentiment >= 9) {
      return "😁"
    } else if (sentiment >= 7) {
      return "🙂"
    } else if (sentiment >= 4) {
      return "😶"
    } else if (sentiment >= 2) {
      return "🙁"
    } else {
      return "☹️"
    }
  }

  const emoji = displayEmoji()

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
              <img className="article-image cy-article-image" src={image} alt={title} />
            </div>
            <div className="topic-container">
              <p className="topic-text">
                {topic}
              </p>
              <h3 className="article-sentiment">{`${emoji} ${sentiment}`}</h3>
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
