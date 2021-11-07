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
      <Link className="topic" to={`/feed/${topic}`} onClick={() => assignTopic(topic)}>
        {topic}
      </Link>
    )
})

  return (
    <>
      <Header />
      <form className="cy-topic-selection">
      { sectionTopics }
      </form>
    </>
  )
}

export default TopicForm;

//
