import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { getArticles, getSentiment } from '../../apiCalls';
import { CleanedArticle } from '../../Models';
import Form from '../Form/Form';
import Feed from '../Feed/Feed';
import Article from '../Article/Article';
import TopicForm from '../TopicForm/TopicForm';
import TopicFeed from '../TopicFeed/TopicFeed'
import NoMatch from '../NoMatch/NoMatch';
import './App.css';
import History from '../History/History'

const App = (): JSX.Element => {
  const [articles, setArticles] = useState<CleanedArticle[]>([]);
  const [history, setHistory] = useState<CleanedArticle[]>([])
  const [error, setError] = useState('');
  const [userSentiment, setUserSentiment] = useState<number | null>(null);
  const [selectedArticles, setSelectedArticles] = useState<CleanedArticle[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  useEffect((): void => {
    getArticles()
      .then((cleanedArticles: CleanedArticle[]): void => {
        getSentimentScores(cleanedArticles)
          .then((response: number[]) => {

            const scoredArticles = cleanedArticles.map((article, i) => {
               article.sentiment = response[i];
               return article;
            });

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

  const updateUserSentiment = (newUserSentiment: number) => {
    let averageSentiment;
    if (userSentiment) {
      averageSentiment = (userSentiment + newUserSentiment) / 2;
    }
    setUserSentiment(averageSentiment || newUserSentiment)
  }

  const assignTopic = (selectedTopic: string): void => {
    setSelectedTopic(selectedTopic);
    getArticles(selectedTopic)
      .then((cleanedArticles: CleanedArticle[]): void => {
        getSentimentScores(cleanedArticles)
          .then((response: number[]) => {

            const scoredArticles = cleanedArticles.map((article, i) => {
               article.sentiment = response[i];
               return article;
            });
            setSelectedArticles(scoredArticles);
          });
      })
      .catch(error => setError(error.message));
  }

  const updateHistory = (article: CleanedArticle): void => {
    setHistory((prevState) => {
      prevState.push(article)
      return prevState
    });
  }

  const storeArticle = (id: string): void => {
    const matchingArticle = articles.find(article => article.id === id);
    let localHistory = JSON.parse(localStorage.getItem('wellnewsHistory')!);
    if (!localHistory) {
      localHistory = [id];
      localStorage.setItem('wellnewsHistory', JSON.stringify(localHistory));
      updateHistory(matchingArticle!)
    } else if (!localHistory.includes(id)) {
      localHistory.push(id)
      localStorage.setItem('wellnewsHistory', JSON.stringify(localHistory))
      updateHistory(matchingArticle!)
    }
  }

  return (
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
                    articles={ articles }
                    updateUserSentiment={ updateUserSentiment }
                    history={ history }
                    storeArticle={ storeArticle }
                  />
                  { !articles.length && <h2>Loading.. </h2>}
                  { error && <h2>{error}</h2> }
                </>
              )
            }}
          />
          <Route
            exact path={`/feed/${selectedTopic}`}
            render={() => {
              return (
                <>
                  <TopicFeed
                    userSentiment={ userSentiment }
                    selectedArticles={ selectedArticles }
                    updateUserSentiment={ updateUserSentiment }
                    selectedTopic = { selectedTopic }
                    storeArticle={ storeArticle }
                  />
                  { !articles.length && <h2>Loading.. </h2>}
                  { error && <h2>{error}</h2> }
                </>
              )
            }}
          />
          <Route exact path="/search-topic">
            <TopicForm assignTopic={ assignTopic } />
          </Route>
          <Route
            exact path="/feed/:id"
            render={({ match }) => {
              const id = match.params.id;
              const singleArticle = articles.find(article => article.id === id)

              if (singleArticle) {
                return (
                  <Article
                    title={ singleArticle.title }
                    image={ singleArticle.multimedia.url }
                    caption={ singleArticle.multimedia.caption }
                    abstract={ singleArticle.abstract }
                    selectedTopic={ selectedTopic }
                    key={ singleArticle.title }
                  />
                )
              } else {
                return <NoMatch />
              }
            }}
          />
          <Route
            exact path={`/feed/${selectedTopic}/:id`}
            render={({ match }) => {
              const id = match.params.id
              const singleArticle = selectedArticles.find(article => article.id === id)

              if (singleArticle) {
                return (
                  <Article
                    title={ singleArticle.title }
                    image={ singleArticle.multimedia.url }
                    caption={ singleArticle.multimedia.caption }
                    abstract={ singleArticle.abstract }
                    selectedTopic= { selectedTopic }
                    key={ singleArticle.title }
                  />
                )
              } else {
                return <NoMatch />
              }
            }}
          />
          <Route
            exact path="/history"
            render={() => {
              return (
                <>
                  <History
                    history={ history }
                    storeArticle={ storeArticle }
                    updateUserSentiment={ updateUserSentiment }
                  />
                  { error && <h2>{error}</h2> }
                </>
              )
            }}
          />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
