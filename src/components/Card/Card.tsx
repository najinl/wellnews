import React from 'react';
import './Card.css';

interface CardProps {
  title: string
  image: string
}

const Card = ({ title, image }: CardProps): JSX.Element => {
  return (
    <div className="card-container">
      <article className="news-card cy-article-card">
        <img className="article-image cy-article-image" src={ image } alt={ title } />
        <h2 className="article-title cy-article-title">{ title }</h2>
      </article>
    </div>
  )
}

export default Card;
