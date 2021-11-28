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
      <div className="card-header">
        <p className="topic-text">{topic.toUpperCase()}</p>
        { isSaved ?
          <button
            className="save-button"
            onClick={ () => toggleSaved(id) }
            type="button"
            aria-label="Remove article from saved articles"
          >
            <span className="material-icons">
              bookmark
            </span>
          </button>

        : <button
            className="save-button"
            onClick={ () => toggleSaved(id) }
            type="button"
            aria-label="Save article"
          >
            <span className="material-icons">
              bookmark_border
            </span>
          </button>
        }
      </div>
      <a
        onClick={ handleClick }
        className="cy-article-link"
        href={ shortUrl }
        target='_blank'
      >
        <h2 className="article-title cy-article-title">{title}</h2>
        <img className="article-image cy-article-image" src={image} alt={title} />
      </a>
      <p className="abstract-text"> {abstract} </p>
    </article>
  )
}

export default Card;
