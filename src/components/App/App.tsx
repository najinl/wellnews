import React from 'react';
import Feed from '../Feed/Feed';
import './App.css';

interface Multimedia {
    url: string
    caption: string
}

export interface Article {
  title: string
  abstract: string
  multimedia: Multimedia[]
}

interface State {
  articles: Article[]
}

interface Props {}

const articles: Article[] = [
  {
    title: "Sean Penn the Focus of N.L.R.B. Amid Comments on Hours and Food at Vaccine Site",
    abstract: "Two online commenters complained of working 18-hour days and not getting food from Krispy Kreme or Subway. Penn saw “narcissism” and “betrayal.”",
    multimedia: [
      {
        url: "https://static01.nyt.com/images/2021/10/28/arts/28penn-item-option-3/merlin_182386914_d104bcd8-d7d9-4268-a037-9d1e34332e64-superJumbo.jpg",
        caption: "From left, Sean Penn, Mayor Eric Garcetti and Gov. Gavin Newsom at the vaccination site at Dodger Stadium in Los Angeles, that Penn and his group CORE helped run. Penn faces an N.L.R.B. complaint."
      }
    ]
  },
  {
    title: "A Gold Star Spouse Finds Love Again",
    abstract: "Curtis Owen offered Navy cryptologist Emily Feeks a fresh start after she lost her husband of 18 months, a Navy SEAL, in a helicopter crash.",
    multimedia: [
      {
        url: "https://static01.nyt.com/images/2021/10/31/fashion/00MINI-FeeksOwen/00MINI-FeeksOwen-superJumbo.jpg",
        caption: "asdf"
      }
    ]
  },
  {
    title: "‘Speer Goes to Hollywood’ Review: Expert Rebranding",
    abstract: "A high-ranking Nazi leader attempts to whitewash his legacy in this disturbing, if single-note, documentary by Vanessa Lapa.",
    multimedia: [
      {
        url: "https://static01.nyt.com/images/2021/10/28/arts/28speer-goes-to-hollywood/merlin_196604673_8b18c65b-46a0-4400-a147-86096b59cefd-superJumbo.jpg",
        caption: "Albert Speer, in 1940, in a scene from the documentary “Speer Goes to Hollywood.”"
      }
    ]
  }
]

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      articles: articles
    }
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <h1>WellNews</h1>
        </header>
        <Feed articles={this.state.articles} />
      </div>
    )
  }
}

export default App;
