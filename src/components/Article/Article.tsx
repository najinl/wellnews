import React from 'react';
import { Link } from 'react-router-dom'
import './Article.css';

const placeholderText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. A diam maecenas sed enim. Ipsum dolor sit amet consectetur. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Tellus integer feugiat scelerisque varius morbi. Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. Gravida neque convallis a cras semper auctor. Suspendisse in est ante in nibh mauris cursus mattis molestie."

interface ArticleProps {
  title: string
  image: string
  abstract: string
  caption: string
  selectedTopic: string
}

const Article = ({ title, image, abstract, caption, selectedTopic }: ArticleProps): JSX.Element => {

  return (
    <section className="single-article-container">
      <div className="back-button-container">
        {!selectedTopic ? <Link to="/feed" className="cy-back-link">
          ⇦ BACK
        </Link> : <Link to={`/feed/${selectedTopic}`} className="cy-back-link">
          ⇦ BACK
        </Link>}
      </div>
      <figure>
        <img src={image} alt={caption} className="single-article-image cy-single-article-image"/>
        <figcaption className="single-article-caption cy-single-article-caption">{caption}</figcaption>
      </figure>
      <h2 className="single-article-title cy-single-article-title">{title}</h2>
      <p className="cy-single-article-abstract">{abstract}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <p>{placeholderText}</p>
      <div className="back-button-container">
      {!selectedTopic ? <Link to="/feed" className="cy-back-link">
        ⇦ BACK
      </Link> : <Link to={`/feed/${selectedTopic}`} className="cy-back-link">
        ⇦ BACK
      </Link>}
      </div>
    </section>
  )
}


export default Article
