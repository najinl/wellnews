import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Form from '../Form/Form';
import Feed from '../Feed/Feed';
import './App.css';

const App = (): JSX.Element => {
  const [ userSentiment, setUserSentiment ] = useState<number | null>(null);

  const updateUserSentiment = (newSentiment: number) => {
    setUserSentiment(newSentiment);
  }

  return (
    <div className="App">
      <div className="app-container">
        <header className="App-header">
          <h1 className="header-text">
            Well<span className="header-text-2">News</span>
          </h1>
        </header>
        <Router>
          <Switch>
            <Route exact path="/">
              <Form updateUserSentiment={ updateUserSentiment } />
            </Route>
            <Route path="/feed/">
              <Feed userSentiment={ userSentiment } />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App;
