import React from 'react';
import './Card.css';

interface PropsCard {
  title: string
  image: string
}

const Card: React.FC<PropsCard> = ({ title, image }) => {
  return (
    <div className="card-container">
      <article className="news-card">
        <img className="article-image" src={image} alt={title} />
        <h2 className="article-title">{title}</h2>
      </article>
    </div>
  )
}

export default Card;
