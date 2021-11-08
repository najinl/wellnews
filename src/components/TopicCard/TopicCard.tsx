import { Link } from 'react-router-dom';
import '../Card/Card.css';

interface TopicCard {
  title: string
  image: string
  id: string
  sentiment: number
  updateUserSentiment: (userSentiment: number) => void
  selectedTopic: string
  storeArticle: (id: string) => void
}

const TopicCard = ({ title, image, id, sentiment, updateUserSentiment, selectedTopic, storeArticle }: TopicCard): JSX.Element => {
  console.log(sentiment);
  const handleClick = () => {
    updateUserSentiment!(sentiment)
    storeArticle(id)
  }

  return (

      <div className="card-container">
        <article className="news-card cy-article-card">
          <Link
            to={`/feed/${selectedTopic}/${id}`}
            onClick={ handleClick }
            className="cy-article-link"
          >
            <img className="article-image cy-article-image" src={image} alt={title} />
            <h2 className="article-title cy-article-title">{title}</h2>
          </Link>
          <div className="divider"></div>
        </article>
      </div>

  )
}

export default TopicCard;
