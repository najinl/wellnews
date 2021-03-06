import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './TopicForm.css';

interface TopicFormProps {
  assignTopic: (selectedTopic: string) => void
  selectedTopic: string;
}

const TopicForm = ({ assignTopic, selectedTopic }: TopicFormProps): JSX.Element => {

const availableTopics = ['arts', 'automobiles', 'books', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world'];

const sectionTopics = availableTopics.map(topic => {
    return (
      <Link
        className="topic"
        to={`/wellnews/feed/${topic}`}
        key={ topic }
        onClick={() => assignTopic(topic)}>
        {topic.charAt(0).toUpperCase() + topic.slice(1)}
      </Link>
    )
})

  return (
    <>
      <Header assignTopic={ assignTopic } selectedTopic={ selectedTopic } />
      <Link to="/wellnews/saved">
        <button className="saved-btn" type="button" aria-label="Saved articles">
          <span className="material-icons">
            bookmark
          </span>
          Saved Articles
        </button>
      </Link>
      <Link to='/wellnews/history'>
        <button className="history-btn" type="button" aria-label="History">
        <span className="material-icons">
          history
        </span>
          History
        </button>
      </Link>
      <form className="cy-topic-selection">
        { sectionTopics }
      </form>
    </>
  )
}

export default TopicForm;
