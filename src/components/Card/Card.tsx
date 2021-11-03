import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

interface CardProps {
  title: string
  image: string
  url: string
}

const Card = ({ title, image }: CardProps): JSX.Element => {
  return (
    <Link to={`/feed/${title}`}>
      <div className="card-container">
        <article className="news-card">
          <img className="article-image" src={image} alt={title} />
          <h2 className="article-title">{title}</h2>
        </article>
      </div>
    </Link>
  )
}

export default Card;

// <a href={url} target="_blank" >Read Full Article</a>
