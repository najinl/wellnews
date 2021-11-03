import React, { useState, useEffect } from 'react';
import Feed from '../Feed/Feed';
import Form from '../Form/Form';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { CleanArticle, fetchNewsData, getSentiment } from '../../apiCalls'


const App = (): JSX.Element => {

  const [ userSentiment, setUserSentiment ] = useState<number | null>(null)
  const [ error, setError ] = useState('')

  useEffect((): void => {
    fetchNewsData()
      .then((cleanArticles: CleanArticle[]): void => {
        getSentimentScores(cleanArticles)
          .then((response: number[]) => {

            const scoredArticles = cleanArticles.map((article, i) => {
               article.sentiment = response[i] || 0
               return article;
            })

            setArticles(scoredArticles)
          })
      })
      .catch(error => setError(error.message))
  }, [])

  const getSentimentScores = (cleanArticles: CleanArticle[]): Promise<number[]> => {
    return Promise.all(
      cleanArticles.map((article: CleanArticle) => {
        return getSentiment(article.abstract)
      })
    )
  }

  useEffect((): void => {
    sortBySentiment(userSentiment)
  }, [ userSentiment ])

  const changeUserSentiment = (newSentiment: number) => {
    setUserSentiment(newSentiment)
  }

  const sortBySentiment = (newSentiment: number|null): void => {
    let sortedArticles : CleanArticle[] = [];

    if (newSentiment === -1) {
      sortedArticles = articles.sort((articleA, articleB) => {
        return articleB.sentiment - articleA.sentiment;
      })
    } else if (newSentiment === 1) {
      sortedArticles = articles.sort((articleA, articleB) => {
        return articleA.sentiment - articleB.sentiment;
      })
    } else {
      sortedArticles = articles.sort((a, b) => 0.5 - Math.random());
    }

    setArticles(sortedArticles)
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
              <Feed articles={articles}/>
            </Route>
          </Switch>
        </Router>
        {error && <h2>{error}</h2>}
      </div>
    </div>
  )
}

export default App;
