import React from 'react';
import Feed from '../Feed/Feed';
import Form from '../Form/Form';
import './App.css';
import { CleanArticle, fetchNewsData, getSentiment } from '../../apiCalls'

interface AppState {
  articles: CleanArticle[],
  userSentiment: number | string
}

interface AppProps {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      articles: [],
      userSentiment: ''
    }
  }

  componentDidMount = (): void => {
    fetchNewsData()
      .then((cleanArticles): any => {
        this.getSentimentScores(cleanArticles)
          .then(response => {

            const scoredArticles = cleanArticles.map((article, i) => {
               article.sentiment = response[i] || 0
               return article;
            })

            this.setState({ articles: scoredArticles })
          })
      })
  }

  getSentimentScores = (cleanArticles: CleanArticle[]): Promise<any> => {
    return (Promise as any).all(
      cleanArticles.map((article: CleanArticle, i: number) => {
        return getSentiment(article.abstract)
      })
    )
  }

  changeUserSentiment = (newSentiment: number) => {
    this.setState({ userSentiment: newSentiment })
    this.sortBySentiment(newSentiment)
  }

  sortBySentiment = (newSentiment: number): void => {
    const { articles } = this.state;
    const articlesCopy = articles.slice();
    let sortedArticles: CleanArticle[];

    if (newSentiment === -1) {
      sortedArticles = articlesCopy.sort((articleA, articleB) => {
        return articleB.sentiment - articleA.sentiment;
      })

      this.setState({ articles: sortedArticles })

    } else if (newSentiment === 1) {
      sortedArticles = articlesCopy.sort((articleA, articleB) => {
        return articleA.sentiment - articleB.sentiment;
      })

      this.setState({ articles: sortedArticles })
    }
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <div className="app-container">
          <header className="App-header">
            <h1 className="header-text">WellNews</h1>
          </header>
          {this.state.userSentiment ?
            <Feed
              articles={this.state.articles}
            /> :
            <Form changeUserSentiment={this.changeUserSentiment}/>}
        </div>
      </div>
    )
  }
}

export default App;
