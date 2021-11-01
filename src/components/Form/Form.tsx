import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';


interface FormProps {
  changeUserSentiment: (newSentiment: number | null) => void
}

const Form = ({ changeUserSentiment } : FormProps) : JSX.Element => {
  const assignSentiment = (sentiment:number) => {
      changeUserSentiment(sentiment);
  }

  return (
    <div className="form-container">
      <section className="questionnaire">
        <h2>how are you feeling today?</h2>
        <form className="sentiment-selection">
          <div className="sentiments-container">
            <Link to="/WellNewsFeed/FeelingGood" title="happy" onClick={() => assignSentiment(1)}>
              <button className="happy-btn" aria-label="happy" title="happy"></button>
            </Link>
            <Link to="/WellNewsFeed/FeelingNeutral" title="neutral" onClick={() => assignSentiment(0)}>
              <button className="neutral-btn" aria-label="neutral" title="neutral"></button>
            </Link>
            <Link to="/WellNewsFeed/FeelingSad" title="sad" onClick={() => assignSentiment(-1)}>
              <button className="sad-btn" aria-label="sad" title="sad"></button>
            </Link>
          </div>
          </form>
        <article className="wellnews-synopsis">
          <p>WellNews uses your mood to curate a list of articles with your mental health in mind.</p>
          <p>A negative mood will prioritize positive articles. <br/>A positive mood will result in a mix of positive, neutral, and negative news.</p>
          <p>If you are unsure, select a neutral mood for a mix of articles that lean towards the positive.</p>
          <p>You can change your mood preference at any time.</p>
        </article>
      </section>
    </div>
  )
};

// <form className="sentiment-selection">
//   <Link to="/WellNewsFeed" onClick={() => assignSentiment(1)}>
//     <button className="happy-btn" name="1"></button>
//   </Link>
//   <Link to="/WellNewsFeed" onClick={() => assignSentiment(0)}>
//     <button className="neutral-btn" name="0"></button>
//   </Link>
//   <Link to="/WellNewsFeed" onClick={() => assignSentiment(-1)}>
//     <button className="sad-btn" name="-1"></button>
//   </Link>
// </form>

export default Form;
