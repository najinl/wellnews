import React from 'react';
import './App.css';

interface Article {
  abstract: string,
}

interface Articles {
  articles: Article[]
}


class App extends React.Component{
  state: Articles = {
    articles: [{abstract: 'Nalle'}]
  };

  render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header"> {this.state.articles[0].abstract}
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
