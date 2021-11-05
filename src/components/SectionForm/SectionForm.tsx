import React, {useState} from 'react';



const SectionForm = () : JSX.Element => {

const sections = ['Arts', 'Cars', 'Entertainment', 'Business', 'Fashion', 'Food', 'Health', 'Home', 'Insider', 'Opinion', 'Politics', 'Realestate', 'Sports', 'Sundayreview', 'Science', 'Upshot', 'US', 'World'];

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

const submitFilterSections = (): void => {
  console.log(selectedSections)
}


const sectionCheckboxes = sections.map(section => {
  return (
    <div className='article-section'>
      <label>{section}</label>
      <input className="section" id={section.toLowerCase()} type="checkbox" checked={selectedSections.includes(section) ? true : false} key={section.toLowerCase()} value={section.toLowerCase()} onChange={() => handleChange(section)}/>
    </div>
  )
})

  return (
    <form>
    { sectionCheckboxes }
      <button onClick={submitFilterSections}>
        Filter
      </button>
    </form>
  )
}

export default SectionForm;
