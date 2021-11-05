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
    <span className="article-section">
      <input className="section" id={topic.toLowerCase()} type="checkbox" checked={selectedTopics.includes(topic) ? true : false} key={key} value={topic.toLowerCase()} onChange={() => handleChange(topic)}/>
      <label className="topic-label" onClick={() => handleChange(topic)}>{topic}</label>
    </span>
  )
})

  return (
    <div className="filter-container">
      <form className="filter-options hidden">
        <div className="checkbox-container-1 checkbox-container">
          { sectionCheckboxes[0] } { sectionCheckboxes[1] } { sectionCheckboxes[2] } { sectionCheckboxes[3] } { sectionCheckboxes[4] } { sectionCheckboxes[5] }
        </div>
        <div className="checkbox-container-2 checkbox-container">
          { sectionCheckboxes[6] } { sectionCheckboxes[7] } { sectionCheckboxes[8] } { sectionCheckboxes[9] } { sectionCheckboxes[10] } { sectionCheckboxes[11] }
        </div>
        <div className="checkbox-container-3 checkbox-container">
          { sectionCheckboxes[12] } { sectionCheckboxes[13] } { sectionCheckboxes[14] } { sectionCheckboxes[15] } { sectionCheckboxes[16] } { sectionCheckboxes[17] }
        </div>
        <button className="filter-button" onClick={e => submitTopics(e)}>
          Filter
        </button>
      </form>
    </div>
  )
}

export default SectionForm;
