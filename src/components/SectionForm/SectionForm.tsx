import React, {useState} from 'react';

interface SectionFormProps {
  siftArticles: (selectedSections: string[]) => void;
}

const SectionForm = ({ siftArticles} : SectionFormProps) : JSX.Element => {

const sections = ['arts', 'cars', 'entertainment', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'opinion', 'politics', 'realestate', 'sports', 'sundayreview', 'science', 'upshot', 'us', 'world'];

const [selectedSections, setSelectedSections] = useState<string[]>([]);

const handleChange = (articleSection: string) : void => {
  if(!selectedSections.includes(articleSection)) {
    setSelectedSections([...selectedSections, articleSection]);
  } else {
    const filteredSections = selectedSections.filter(currSection => {
      return currSection !== articleSection
    })
    setSelectedSections(filteredSections);
  }
  console.log(selectedSections)
}

const submitFilterSections = (event:any): void => {
  event.preventDefault();
  siftArticles(selectedSections)
}


const sectionCheckboxes = sections.map(section => {
  const key = Math.random()
  return (
    <div className='article-section'>
      <label>{section}</label>
      <input className="section" id={section.toLowerCase()} type="checkbox" checked={selectedSections.includes(section) ? true : false} key={key} value={section.toLowerCase()} onChange={() => handleChange(section)}/>
    </div>
  )
})

  return (
    <form>
    { sectionCheckboxes }
      <button onClick={e => submitFilterSections(e)}>
        Filter
      </button>
    </form>
  )
}

export default SectionForm;
