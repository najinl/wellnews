import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import { CleanedArticle } from '../../Models';
import '../Feed/Feed.css'

interface HistoryProps {
  history: CleanedArticle[] | any
  updateHistory: (localHistory: string[]) => void;
}

const History = ({ history, updateHistory }: HistoryProps): JSX.Element => {

  const articleCards = history.map((article: CleanedArticle) => {
    return (
      <Card
        title={ article.title }
        image={ article.multimedia.url }
        key={ article.title }
        sentiment={ article.sentiment }
        id= { article.id }
        updateHistory = { updateHistory }
      />
    )
  })

  return (
    <>
      <h1>History</h1>
      <div className="articles-container">
        <section className="articles-display">
        <div className="back-button-container">
          <Link to="/feed">
            ⇦ BACK
          </Link>
        </div>
          { articleCards }
          <div className="back-button-container">
            <Link to="/feed">
              ⇦ BACK
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default History;
