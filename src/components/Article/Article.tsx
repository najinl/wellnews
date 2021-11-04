import './Article.css'

interface ArticleProps {
  title: string
  image: string
  abstract: string
  caption: string
  showFeed: () => void
}

const Article = ({ title, image, abstract, caption, showFeed }: ArticleProps): JSX.Element => {

  return (
    <section >
      <button onClick={showFeed}>
        BACK
      </button>
      <h2>{title}</h2>
      <img src={image} alt={caption} className="article-image"/>
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
    </section>
  )
}


const placeholderText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ut porttitor leo a diam sollicitudin tempor id eu. In arcu cursus euismod quis viverra nibh cras pulvinar mattis. A diam maecenas sed enim. Ipsum dolor sit amet consectetur. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Tellus integer feugiat scelerisque varius morbi. Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. Gravida neque convallis a cras semper auctor. Suspendisse in est ante in nibh mauris cursus mattis molestie."

export default Article
