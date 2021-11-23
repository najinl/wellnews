import { Link } from 'react-router-dom';
import '../Card/Card.css';

interface Card {
  id: string
  shortUrl: string
  title: string
  image: string
  sentiment: number
  updateUserSentiment: (userSentiment: number) => void
  storeArticle: (id: string) => void
  topic: string
}

const Card = ({ title, image, id, shortUrl, sentiment, topic, updateUserSentiment, storeArticle }: Card): JSX.Element => {

  const handleClick = () => {
    updateUserSentiment(sentiment)
    storeArticle(id)
  }

  return (
    <div className="card-container">
      <article className="news-card cy-article-card">
        <a
          onClick={ handleClick }
          className="cy-article-link"
          href={ shortUrl }
          target='_blank'
        >
        <div className="article-image-container">
          {sentiment >= 7 && <h3 className="article-sentiment green">{sentiment}</h3>}
          {sentiment <= 3 && <h3 className="article-sentiment red">{sentiment}</h3>}
          {(sentiment >= 4 && sentiment <= 6) && <h3 className="article-sentiment blue">{sentiment}</h3>}
          <img className="article-image cy-article-image" src={image} alt={title} />
        </div>
        <div className="topic-container">
          <p className="topic-text">
            {topic}
          </p>
        </div>
        <h2 className="article-title cy-article-title">{title}</h2>
        </a>
        <div className="divider"></div>
      </article>
    </div>
  )
}

export default Card;
