import React, {useState} from 'react';
import { Link } from 'react-router-dom';

interface TopicFormProps {
  assignTopic: (selectedTopic: string) => void
}

const TopicForm = ({ assignTopic }: TopicFormProps): JSX.Element => {

const availableTopics = ['arts', 'automobiles', 'books', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world'];

const sectionCheckboxes = availableTopics.map(topic => {
  const key = Math.random();
    return (
      <Link to={`/feed/${topic}`} onClick={() => assignTopic(topic)}>
        {topic}
      </Link>
    )
})

  return (
    <form>
    { sectionCheckboxes }
    </form>
  )
}

export default TopicForm;
