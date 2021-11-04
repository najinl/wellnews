import React from 'react';
import './Card.css';

interface PropsCard {
  title: string
  image: string
  sentiment: number
}

const Card = ({ title, image, sentiment }: PropsCard): JSX.Element => {
  return (
    <div className="card-container">
      <article className="news-card">
        <img className="article-image" src={image} alt={title} />
        <h2 className="article-title">{title}</h2>
        {sentiment > 0 && <h3 className="article-sentiment green">{(sentiment * 10).toFixed(1)}</h3>}
        {sentiment < 0 && <h3 className="article-sentiment red">{(sentiment * 10).toFixed(1)}</h3>}
        {sentiment === 0 && <h3 className="article-sentiment blue">{(sentiment * 10).toFixed(1)}</h3>}
      </article>
    </div>
  )
}

export default Card;
