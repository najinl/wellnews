import React from 'react';
import logo from '../../logo.svg';
import './App.css';

interface Article {
  abstract: string,
};

interface Articles {
  articles: Article[]
};


class App extends React.Component{
  state: Articles = {
    articles: [{abstract: 'Nalle'}]
  };

  render() {
    return (
      <div className="App">
        <header className="App-header"> {this.state.articles[0].abstract}
          <img src={logo} className="App-logo" alt="logo" />
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
