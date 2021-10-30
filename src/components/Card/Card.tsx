import React from 'react';
import './Card.css';

interface PropsCard {
  title: string
  image: string
}

const Card: React.FC<PropsCard> = ({ title, image }) => {
  return (
    <article>
      <img className="article-image" src={image} alt={title} />
      <h2>{title}</h2>
    </article>
  )
}

export default Card;
