import { useHistory } from 'react-router-dom';
import './SentimentForm.css';

interface FormProps {
  updateUserSentiment: (userSentiment: number) => void;
}

const Form = ({ updateUserSentiment }: FormProps): JSX.Element => {
  const history = useHistory();

  const submitUserSentiment = (userSentiment: number) => {
      updateUserSentiment(userSentiment);
      history.push('/wellnews/feed/home');
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
          onClick={() => submitUserSentiment(0)}
        >
          ☹️
        </button>
        <button
          className="sentiment-btn cy-negative-btn"
          aria-label="negative"
          title="negative"
          onClick={() => submitUserSentiment(2)}
        >
          🙁
        </button>
        <button
          className="sentiment-btn cy-neutral-btn"
          aria-label="neutral"
          title="neutral"
          onClick={() => submitUserSentiment(5)}
        >
          😐
        </button>
         <button
          className="sentiment-btn cy-positive-btn"
          aria-label="positive"
          title="positive"
          onClick={() => submitUserSentiment(8)}
        >
          🙂
        </button>
        <button
          className="sentiment-btn cy-strongly-positive-btn"
          aria-label="strongly positive"
          title="strongly positive"
          onClick={() => submitUserSentiment(10)}
        >
          😁
        </button>
      </div>
      <button className='skip-btn' onClick={ () => submitUserSentiment(5) }>
          Skip
      </button>
      <button className="view-synopsis-button cy-view-synopsis-button" name="viewSynopsisButton" onClick={ showSynopsis }>Why we ask? ▽</button>
      <article className="hidden wellnews-synopsis cy-wellnews-synopsis" id="synopsisInfo">
        <p>Based on your mood and the articles you read, we dynamically sort your feed and nudge you toward sentimental balance. We don't filter your feed.</p>
        <p>If you prefer, skip the questionnare and we'll sort your feed based only on the articles you read.</p>
      </article>
    </section>
  );
};

export default Form;
