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
  saveArticle: (id: string) => void
}

const Card = ({ title, image, id, shortUrl, sentiment, topic, updateUserSentiment, storeArticle, abstract, saveArticle }: Card): JSX.Element => {

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
      <button onClick={ () => saveArticle(id) } type="button">Save Article</button>
    </article>
  )
}

export default Card;
