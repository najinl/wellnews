import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getArticles, getSentiment } from '../../apiCalls';
import { CleanedArticle } from '../../Models';
import Feed from '../Feed/Feed';
import Header from '../Header/Header';
import History from '../History/History'
import NoMatch from '../NoMatch/NoMatch';
import SentimentForm from '../SentimentForm/SentimentForm';
import TopicForm from '../TopicForm/TopicForm';
import './App.css';

const App = (): JSX.Element => {
  const [articles, setArticles] = useState<CleanedArticle[]>([]);
  const [unreadArticles, setUnreadArticles] = useState<
    CleanedArticle[] | undefined
  >([]);
  const [history, setHistory] = useState<CleanedArticle[]>([]);
  const [userSentiment, setUserSentiment] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('home');
  const [error, setError] = useState('');

  useEffect((): void => {
    console.log('useEffect onLoad')
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
    console.log('useEffect userSentiment')
    const sortedArticles = getSortedArticles();
    setArticles(sortedArticles);
  }, [userSentiment])

  useEffect((): void => {
    console.log('useEffect articles')
    updateHistory();
    const unreadArticles = getUnreadArticles();
    setUnreadArticles(unreadArticles);
  }, [articles])

  const getSortedArticles = (): CleanedArticle[] => {
    let sortedArticles;
    if (userSentiment! >= 0 && userSentiment! <= 3) {
      sortedArticles = articles.slice().sort((articleA, articleB) => {
        return articleB.sentiment - articleA.sentiment;
      })
    } else if (userSentiment! <= 10 && userSentiment! >= 7) {
      sortedArticles = articles.slice().sort((articleA, articleB) => {
        return articleA.sentiment - articleB.sentiment;
      })
    } else {
      sortedArticles = articles.slice().sort(() => 0.5 - Math.random());
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
    if (userSentiment === null) {
      return setUserSentiment(newUserSentiment)
    }
    setUserSentiment((userSentiment + newUserSentiment) / 2);
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

  const getLocalHistory = (): string[] => {
    return JSON.parse(localStorage.getItem('wellnewsHistory')!);
  }

  const updateHistory = (): void => {
    const localHistory = getLocalHistory();
    if (localHistory && localHistory.length) {
      const newHistory = articles.filter((article) => {
        return localHistory.includes(article.id)
      })
      setHistory(newHistory)
    }
  }

  const storeArticle = (id: string): void => {
    const matchingArticle = articles.find(article => article.id === id);
    const localHistory = getLocalHistory();
    if (!localHistory) {
      localStorage.setItem('wellnewsHistory', JSON.stringify([id]));
      return setHistory([matchingArticle!]);
    } else if (!localHistory.includes(id)) {
      localHistory.push(id)
      localStorage.setItem('wellnewsHistory', JSON.stringify(localHistory))
      setHistory([...history, matchingArticle!]);
    }
  }

  const path = `/feed/${selectedTopic}`

  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact path="/">
            <SentimentForm updateUserSentiment={ updateUserSentiment } />
          </Route>
          <Route
            path={path}
            render={() => {
              return (
                <>
                  <Feed
                    unreadArticles={ unreadArticles }
                    selectedTopic={ selectedTopic }
                    updateUserSentiment={ updateUserSentiment }
                    storeArticle={ storeArticle }
                  />
                  { !articles.length &&
                    <h2 className="loading-text">Loading... </h2>
                  }
                  { error && <h2>{error}</h2> }
                </>
              )
            }}
          />
          <Route exact path="/search-topic">
            <TopicForm assignTopic={ assignTopic } />
          </Route>
          <Route
            exact path="/history"
            render={() => {
              return (
                <>
                  <Header />
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
