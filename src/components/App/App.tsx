import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { getArticles, getSentiment } from '../../apiCalls';
import { CleanedArticle } from '../../Models';
import Form from '../Form/Form';
import Feed from '../Feed/Feed';
import Article from '../Article/Article';
import './App.css';

const App = (): JSX.Element => {
  const [articles, setArticles] = useState<CleanedArticle[]>([]);
  const [error, setError] = useState('');
  const [userSentiment, setUserSentiment] = useState<number | null>(null);

  useEffect((): void => {
    getArticles()
      .then((cleanedArticles: CleanedArticle[]): void => {
        getSentimentScores(cleanedArticles)
          .then((response: number[]) => {

            const scoredArticles = cleanedArticles.map((article, i) => {
               article.sentiment = response[i];
               return article;
            });
            console.log(scoredArticles);
            setArticles(scoredArticles);
          });
      })
      .catch(error => setError(error.message));
  }, []);


  const getSentimentScores = (cleanedArticles: CleanedArticle[]): Promise<number[]> => {
    return Promise.all(
      cleanedArticles.map((article: CleanedArticle) => {
        return getSentiment(article.title, article.abstract)
      })
    );
  };

  const updateUserSentiment = (userSentiment: number) => {
    setUserSentiment(userSentiment);
  }

  return (
    <div className="App">
      <div className="app-container">
        <header className="App-header">
          <h1 className="header-text cy-header-text">
            Well<span className="header-text-2">News</span>
          </h1>
        </header>
        <Router>
          <Switch>
            <Route exact path="/">
              <Form updateUserSentiment={ updateUserSentiment } />
            </Route>
            <Route
              exact path="/feed"
              render={() => {
                return (
                  <>
                    <Feed
                      userSentiment={ userSentiment }
                      articles={ articles }/>
                    { !articles.length && <h2>Loading.. </h2>}
                    { error && <h2>{error}</h2> }
                  </>
                )
              }}
            />
            <Route
              path="/feed/:id"
              render={({ match }) => {
                const id = Number(match.params.id)
                const singleArticle = articles.find(article => article.id === id)

                if (singleArticle) {
                  return (
                    <Article
                      title={ singleArticle.title }
                      image={ singleArticle.multimedia.url }
                      caption={ singleArticle.multimedia.caption }
                      abstract={ singleArticle.abstract }
                      key={ singleArticle.title }
                    />
                  )
                }
              }}
            />
          </Switch>
        </Router>

      </div>
    </div>
  )
}

export default App;
