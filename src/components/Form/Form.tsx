import { useHistory } from 'react-router-dom';
import './Form.css';

interface FormProps {
  updateUserSentiment: (userSentiment: number) => void;
}

const Form = ({ updateUserSentiment }: FormProps): JSX.Element => {
  const history = useHistory();

  const submitUserSentiment = (userSentiment: number) => {
      updateUserSentiment(userSentiment);
      history.push("/feed");
  }

  const showSynopsis = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formSynopsis = document.getElementById('synopsisInfo') as HTMLElement;
    formSynopsis.classList.toggle('hidden');
  }

  return (
    <section className="questionnaire">
      <header className="questionnaire-header">
        <div className="blue-stripe">
          <h1 className="header-text cy-header-text">
            Well<span className="header-text-2">News</span>
          </h1>
        </div>
      </header>
      <h2 className='cy-sentiment-question'>What kind of mood are you in?</h2>
      <div className="sentiments-container">
        <button
          className="sentiment-btn cy-strongly-negative-btn"
          aria-label="strongly negative"
          title="strongly negative"
          onClick={() => submitUserSentiment(-1)}
        >
          ☹️
        </button>
        <button
          className="sentiment-btn cy-negative-btn"
          aria-label="negative"
          title="negative"
          onClick={() => submitUserSentiment(-0.5)}
        >
          🙁
        </button>
        <button
          className="sentiment-btn cy-neutral-btn"
          aria-label="neutral"
          title="neutral"
          onClick={() => submitUserSentiment(0)}
        >
          😶
        </button>
         <button
          className="sentiment-btn cy-positive-btn"
          aria-label="positive"
          title="positive"
          onClick={() => submitUserSentiment(0.5)}
        >
          🙂
        </button>
        <button
          className="sentiment-btn cy-strongly-positive-btn"
          aria-label="strongly positive"
          title="strongly positive"
          onClick={() => submitUserSentiment(1)}
        >
          😁
        </button>
      </div>
      <button className='skip-btn' onClick={ () => submitUserSentiment(0) }>
          Skip
      </button>
      <button className="view-synopsis-button cy-view-synopsis-button" name="viewSynopsisButton" onClick={ showSynopsis }>Why we ask? ▽</button>
      <article className="hidden wellnews-synopsis cy-wellnews-synopsis" id="synopsisInfo">
        <p>WellNews uses your mood to curate a list of articles with your mental health in mind.</p>
        <p>A negative mood will prioritize positive articles. <br/>A positive mood will result in a mix of positive, neutral, and negative news.</p>
        <p>If you are unsure, select a neutral mood for a mix of articles that lean towards the positive.</p>
        <p>You can change your mood preference at any time.</p>
      </article>
    </section>
  );
};

export default Form;
