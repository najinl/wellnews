import React from 'react';



const SectionForm = () : JSX.Element => {

const sections = ['Arts', 'Cars', 'Entertainment', 'Business', 'Fashion', 'Food', 'Health', 'Home', 'Insider', 'Opinion', 'Politics', 'Realestate', 'Sports', 'Sundayreview', 'Science', 'Upshot', 'US', 'World'];

const selectedSections : string[] = [];

const handleChange = (e: React.MouseEvent) : void => {
  // event.preventDefault();
  const section: string = e.currentTarget.value;
  selectedSections.push(section);
}

const submitFilterSections = (sections: string[]) => {
  console.log(selectedSections)
}



const sectionCheckboxes = sections.map(section => {
  return (
    <div className='article-section'>
      <label>{section}</label>
      <input className="section" id={section.toLowerCase()} type="checkbox" checked="" key={section.toLowerCase()} value={section.toLowerCase()} onChange={handleChange(e)}/>
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
