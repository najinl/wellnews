import React from 'react';
import Card from '../Card/Card';
import { CleanedArticle } from '../../Models';
import '../Feed/Feed.css'

interface HistoryProps {
  history: CleanedArticle[]
  moveToHistory: (id: number) => void;
}

const History = ({ history, moveToHistory }: HistoryProps): JSX.Element => {

  const articleCards = history.map(article => {
    return (
      <Card
        title={ article.title }
        image={ article.multimedia.url }
        id={ article.id }
        moveToHistory={ moveToHistory }
        key={ article.title }
      />
    )
  })

  return (
    <>
      <h1>History</h1>
      <div className="articles-container">
        <section className="articles-display">
          { articleCards }
        </section>
      </div>
    </>
  )
}

export default History;
