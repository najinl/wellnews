import { Link } from 'react-router-dom'
import './Article.css';

const placeholderText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. A diam maecenas sed enim. Ipsum dolor sit amet consectetur. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Tellus integer feugiat scelerisque varius morbi. Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. Gravida neque convallis a cras semper auctor. Suspendisse in est ante in nibh mauris cursus mattis molestie."

interface ArticleProps {
  title: string
  image: string
  abstract: string
  caption: string
}

const Article = ({ title, image, abstract, caption }: ArticleProps): JSX.Element => {

  return (
    <section className="single-article-container">
      <div className="back-button-container">
        <Link to="/feed">
          ⇦ BACK
        </Link>
      </div>
      <figure>
        <img src={image} alt={caption} className="single-article-image"/>
        <figcaption className="single-article-caption">{caption}</figcaption>
      </figure>
      <h2 className="single-article-title">{title}</h2>
      <p>{abstract}</p>
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
        <Link to="/feed">
          ⇦ BACK
        </Link>
      </div>
      <Link to="/feed">
        BACK
      </Link>
    </section>
  )
}


export default Article
