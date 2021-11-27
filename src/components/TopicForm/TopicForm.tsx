import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './TopicForm.css'
interface TopicFormProps {
  assignTopic: (selectedTopic: string) => void
}

const TopicForm = ({ assignTopic }: TopicFormProps): JSX.Element => {

const availableTopics = ['arts', 'automobiles', 'books', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world'];

const sectionTopics = availableTopics.map(topic => {
    return (
      <Link
        className="topic"
        to={`/feed/${topic}`}
        key={ topic }
        onClick={() => assignTopic(topic)}>
        {topic.charAt(0).toUpperCase() + topic.slice(1)}
      </Link>
    )
})

  return (
    <>
      <Header />
      <h3 className="browse-topics">Browse articles by topic:</h3>
      <form className="cy-topic-selection">
        { sectionTopics }
      </form>
    </>
  )
}

export default TopicForm;
