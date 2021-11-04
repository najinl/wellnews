import React from 'react';

interface ArticleSectionsProps {
  section: string;
}

const ArticleSections = ({ section }: ArticleSectionsProps): JSX.Element => {

  return (
    <div className='article-section'>
      <label>{section}</label>
      <input className="section" id={section.toLowerCase()} type="checkbox" key={section.toLowerCase()} value={section.toLowerCase()}/>
    </div>
  )
}

export default ArticleSections;
