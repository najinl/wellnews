import React from 'react';
import Feed from '../Feed/Feed';
import Form from '../Form/Form';
import './App.css';
import { CleanArticle, fetchNewsData, getSentiment } from '../../apiCalls'

interface AppState {
  articles: CleanArticle[],
  userSentiment: number | string,
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
      .then((cleanArticles): CleanArticle[] => {
        return (Promise as any).all(cleanArticles.forEach((article: any) => {
          getSentiment(article.short_url)
            .then((sentiment) => {
              article.sentiment = sentiment
            })
        }))
      })
      .then(scoredArticles => {
        console.log(scoredArticles);
        this.setState({ articles: scoredArticles })
      })
  }

  changeUserSentiment = (newSentiment: number | string) => {
    this.setState({ userSentiment: newSentiment })
    console.log('you can do things after setState!')
    this.sortBySentiment();
  }

  sortBySentiment = (): void => {
    const { userSentiment, articles } = this.state;
    const articlesCopy = articles.slice();
    let sortedArticles;
    if (userSentiment === -1) {
      sortedArticles = articlesCopy.sort((articleA, articleB) => {
        return articleB.score - articleA.score;
      })
      this.setState({ articles: sortedArticles })
    } else if (userSentiment === 1) {
      sortedArticles = articlesCopy.sort((articleA, articleB) => {
        return articleA.score - articleB.score;
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
              handleSort={ this.handleSort }
              articles={this.state.articles}
            /> :
            <Form changeUserSentiment={this.changeUserSentiment}/>}
        </div>
      </div>
    )
  }
}

export default App;
