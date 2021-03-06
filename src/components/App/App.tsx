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
import SavedArticles from '../SavedArticles/SavedArticles';
import './App.css';

const App = (): JSX.Element => {
  const [articles, setArticles] = useState<CleanedArticle[]>([]);
  const [unreadArticles, setUnreadArticles] = useState<
    CleanedArticle[] | undefined
  >([]);
  const [history, setHistory] = useState<CleanedArticle[]>([]);
  const [userSentiment, setUserSentiment] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('home');
  const [savedArticles, setSavedArticles] = useState<CleanedArticle[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect((): void => {
    getArticles('home')
      .then((cleanedArticles: CleanedArticle[]): void => {
        getSentimentScores(cleanedArticles)
          .then((response: number[]) => {
            const scoredArticles = cleanedArticles.map((article, i) => {
               article.sentiment = Math.round((response[i] + 1) * 5);
               return article;
            });
            setArticles(scoredArticles);
            setLoading(false);
            setError('')
          });
      })
      .catch(error => setError(error.message));
  }, []);

  useEffect((): void => {
    const sortedArticles = getSortedArticles();
    setArticles(sortedArticles);
  }, [userSentiment])

  useEffect((): void => {
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
    setLoading(true)
    setSelectedTopic(selectedTopic);
    getArticles(selectedTopic)
      .then((cleanedArticles: CleanedArticle[]): void => {
        getSentimentScores(cleanedArticles)
          .then((response: number[]) => {

            const scoredArticles = cleanedArticles.map((article, i) => {
               article.sentiment = Math.round((response[i] + 1) * 5);
               return article;
            });
            setArticles(scoredArticles)
            setLoading(false);
            setError('');
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

  const toggleSaved = (id: string): void => {
    const isSaved = savedArticles.find(savedArticle => {
      return savedArticle.id === id;
    })
    if (!isSaved) {
      const newSavedArticle = articles.find(article => {
        return article.id === id;
      })
      setSavedArticles([...savedArticles, newSavedArticle!])
    } else {
      const newSavedArticles = savedArticles.filter(savedArticle => {
        return savedArticle.id !== id;
      })
      setSavedArticles(newSavedArticles);
    }
  }

  const path = `/wellnews/feed/${selectedTopic}`

  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact path="/wellnews/">
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
                    toggleSaved={ toggleSaved }
                    savedArticles={ savedArticles}
                    assignTopic={ assignTopic }
                    loading={ loading }
                  />
                  { error && <h2>{error}</h2> }
                </>
              )
            }}
          />
          <Route exact path="/wellnews/topics">
            <TopicForm
              assignTopic={ assignTopic }
              selectedTopic={ selectedTopic }
            />
          </Route>
          <Route path="/wellnews/saved">
            <SavedArticles
              savedArticles={ savedArticles }
              storeArticle={ storeArticle }
              updateUserSentiment={ updateUserSentiment }
              toggleSaved={ toggleSaved }
              assignTopic={ assignTopic }
              selectedTopic={ selectedTopic }
            />
          </Route>
          <Route
            exact path="/wellnews/history"
            render={() => {
              return (
                <>
                  <History
                    history={ history }
                    storeArticle={ storeArticle }
                    updateUserSentiment={ updateUserSentiment }
                    toggleSaved={ toggleSaved }
                    savedArticles={ savedArticles }
                    assignTopic={ assignTopic }
                    selectedTopic={ selectedTopic }
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
