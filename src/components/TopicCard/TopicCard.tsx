import { Link } from 'react-router-dom';
import '../Card/Card.css';

interface TopicCard {
  title: string
  image: string
  id: string
  sentiment: number
  updateUserSentiment: (userSentiment: number) => void
  selectedTopic: string
  updateHistory: (localHistory: string[]) => void;
}

const TopicCard = ({ title, image, id, sentiment, updateUserSentiment, selectedTopic }: TopicCard): JSX.Element => {
  return (

      <div className="card-container">
        <article className="news-card cy-article-card">
          <Link
            to={`/feed/${selectedTopic}/${id}`}
            onClick={() => updateUserSentiment(sentiment) }
            className="cy-article-link"
          >
            <img className="article-image cy-article-image" src={image} alt={title} />
            <h2 className="article-title cy-article-title">{title}</h2>
          </Link>
        </article>
      </div>

  )
}

export default TopicCard;
