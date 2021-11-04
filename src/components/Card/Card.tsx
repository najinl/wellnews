import './Card.css';

interface CardProps {
  title: string
  image: string
  selectSingleArticle: (id: number) => void
  id: number
}

const Card = ({ title, image, id, selectSingleArticle }: CardProps): JSX.Element => {
  return (
    <div className="card-container" onClick={() => selectSingleArticle(id)}>
      <article className="news-card">
        <img className="article-image" src={image} alt={title} />
        <h2 className="article-title">{title}</h2>
      </article>
    </div>
  )
}

export default Card;

// <a href={url} target="_blank" >Read Full Article</a>
