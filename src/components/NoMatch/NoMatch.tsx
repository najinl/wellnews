import { Link, useLocation } from 'react-router-dom';

const NoMatch = (): JSX.Element => {
  const location = useLocation();
  return (
    <div>
      <h3 className="cy-error-message">
        No match for <code>{location.pathname}</code>
      </h3>
      <Link to="/wellnews/feed/home" className="cy-feed-link">
        Back to Feed
      </Link>
    </div>
  );
}

export default NoMatch
