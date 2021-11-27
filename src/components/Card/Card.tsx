import '../Card/Card.css';

interface Card {
  id: string
  shortUrl: string
  title: string
  image: string
  sentiment: number
  abstract: string
  updateUserSentiment: (userSentiment: number) => void
  storeArticle: (id: string) => void
  topic: string
  toggleSaved: (id: string) => void
  isSaved: boolean
}

const Card = ({ title, image, id, shortUrl, sentiment, topic, updateUserSentiment, storeArticle, abstract, toggleSaved, isSaved }: Card): JSX.Element => {

  const handleClick = () => {
    updateUserSentiment(sentiment)
    storeArticle(id)
  }

  return (
    <article className="news-card cy-article-card">
      <a
        onClick={ handleClick }
        className="cy-article-link"
        href={ shortUrl }
        target='_blank'
      >
        <p className="topic-text">{topic.toUpperCase()}</p>
        <h2 className="article-title cy-article-title">{title}</h2>
        <img className="article-image cy-article-image" src={image} alt={title} />
      </a>
      <p className="abstract-text"> {abstract} </p>
      { isSaved &&
        <button
          className="saved"
          onClick={ () => toggleSaved(id) }
          type="button"
        >
        </button>
      }
      { !isSaved &&
        <button
          className="not-saved"
          onClick={ () => toggleSaved(id) }
          type="button"
        >
        </button>
      }
    </article>
  )
}

export default Card;
