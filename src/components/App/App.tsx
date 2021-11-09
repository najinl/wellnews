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
  const [unreadArticles, setUnreadArticles] = useState<CleanedArticle[] | undefined>([])
  const [history, setHistory] = useState<CleanedArticle[]>([]);
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
               article.sentiment = Math.round((response[i] + 1) * 5);
               return article;
            });
            setArticles(scoredArticles);
          });
      })
      .catch(error => setError(error.message));
  }, []);

  useEffect((): void => {
    const sortedArticles = getSortedArticles();
    setArticles(sortedArticles);
  }, [userSentiment])

  useEffect((): void => {
    const unreadArticles = getUnreadArticles();
    console.log('unreadArticles: ', unreadArticles)
    setUnreadArticles(unreadArticles);
  }, [articles, history])

  const getSortedArticles = (): CleanedArticle[] => {
    let sortedArticles;
    if (userSentiment && userSentiment >= -1 && userSentiment <= -0.3) {
      sortedArticles = articles.sort((articleA, articleB) => {
        return articleB.sentiment - articleA.sentiment;
      })
    } else if (userSentiment && userSentiment <= 1 && userSentiment >= 0.3) {
      sortedArticles = articles.sort((articleA, articleB) => {
        return articleA.sentiment - articleB.sentiment;
      })
    } else {
      sortedArticles = articles.sort((articleA, articleB) => 0.5 - Math.random());
    }
    return sortedArticles;
  }

  const getUnreadArticles = (): CleanedArticle[] | undefined => {
    if (history.length) {
      return articles.filter(article => {
        return !history.find(historyArticle => historyArticle.id === article.id)
      })
    }
    return articles;
  }

  const getSentimentScores = (cleanedArticles: CleanedArticle[]): Promise<number[]> => {
    return Promise.all(
      cleanedArticles.map((article: CleanedArticle) => {
        return getSentiment(article.title, article.abstract)
      })
    );
  };

  const updateUserSentiment = (newUserSentiment: number) => {
    let averageSentiment;
    if (userSentiment && userSentiment >= 0) {
      averageSentiment = (userSentiment + newUserSentiment) / 2;
    }
    setUserSentiment(averageSentiment || newUserSentiment);
  }

  const assignTopic = (selectedTopic: string): void => {
    setSelectedTopic(selectedTopic);
    getArticles(selectedTopic)
      .then((cleanedArticles: CleanedArticle[]): void => {
        getSentimentScores(cleanedArticles)
          .then((response: number[]) => {

            const scoredArticles = cleanedArticles.map((article, i) => {
               article.sentiment = Math.round((response[i] + 1) * 5);
               return article;
            });
            setArticles(scoredArticles);
          });
      })
      .catch(error => setError(error.message));
  }

  const storeArticle = (id: string): void => {
    const matchingArticle = articles.find(article => article.id === id);
    const localHistory = JSON.parse(localStorage.getItem('wellnewsHistory')!);
    if (!localHistory) {
      localStorage.setItem('wellnewsHistory', JSON.stringify([id]));
      return setHistory([matchingArticle!]);
    } else if (!localHistory.includes(id)) {
      localHistory.push(id)
      localStorage.setItem('wellnewsHistory', JSON.stringify(localHistory))
      setHistory([...history, matchingArticle!]);
    }
  }

  return (
    <div className="app-container">
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
                    unreadArticles={ unreadArticles }
                    updateUserSentiment={ updateUserSentiment }
                    storeArticle={ storeArticle }
                  />
                  { articles.length === 0 &&
                    <h2 className="loading-text">Loading... </h2>
                  }
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
                    unreadArticles={ unreadArticles }
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
              const singleArticle = articles.find(article => article.id === id)

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
