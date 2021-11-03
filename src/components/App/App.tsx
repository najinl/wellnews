import React, { useState, useEffect } from 'react';
import Feed from '../Feed/Feed';
import Form from '../Form/Form';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
// import { CleanArticle, fetchNewsData, getSentiment } from '../../apiCalls'

const App = (): JSX.Element => {

  const [ userSentiment, setUserSentiment ] = useState<number | null>(null)

  const changeUserSentiment = (newSentiment: number) => {
    setUserSentiment(newSentiment)
  }

  return (
    <div className="App">
      <div className="app-container">
        <header className="App-header">
          <h1 className="header-text">Well<span className="header-text-2">News</span></h1>
        </header>
        <Router>
          <Switch>
            <Route exact path="/">
              <Form changeUserSentiment={changeUserSentiment}/>
            </Route>
            <Route path="/feed/">
              <Feed userSentiment={ userSentiment }/>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App;
