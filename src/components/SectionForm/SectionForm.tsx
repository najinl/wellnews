import React, {useState} from 'react';

interface SectionFormProps {
  findMatchingArticles: (findMatchingArticles: string[]) => void;
}

const SectionForm = ({ findMatchingArticles } : SectionFormProps): JSX.Element => {

const topics = ['arts', 'cars', 'entertainment', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'opinion', 'politics', 'realestate', 'sports', 'sundayreview', 'science', 'upshot', 'us', 'world'];

const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

const handleChange = (sectionTopic: string) : void => {
  if(!selectedTopics.includes(sectionTopic)) {
    setSelectedTopics([...selectedTopics, sectionTopic]);
  } else {
    const foundTopics = selectedTopics.filter(topic => {
      return topic !== sectionTopic
    })
    setSelectedTopics(foundTopics);
  }
}

const submitTopics = (event:React.MouseEvent): void => {
  event.preventDefault();
  findMatchingArticles(selectedTopics)
}

const sectionCheckboxes = topics.map(topic => {
  const key = Math.random();
  return (
    <div className='article-section' key={ key }>
      <label>{topic}</label>
      <input className="section" id={topic.toLowerCase()} type="checkbox" checked={selectedTopics.includes(topic) ? true : false} key={ key } value={topic.toLowerCase()} onChange={() => handleChange(topic)}/>
    </div>
  )
})

  return (
    <form>
    { sectionCheckboxes }
      <button onClick={e => submitTopics(e)}>
        Filter
      </button>
    </form>
  )
}

export default SectionForm;
