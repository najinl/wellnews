import { CleanedArticle } from '../../Models'
import Card from '../Card/Card';
import SectionForm from '../SectionForm/SectionForm';
import './Feed.css';

interface FeedProps {
  userSentiment: number | null;
  articles: CleanedArticle[];
  filteredArticles: CleanedArticle[];
  siftArticles: (selectedSections: string[]) => void;
}

const Feed = ({ userSentiment, articles, filteredArticles, siftArticles }: FeedProps): JSX.Element => {

  let sortedArticles : CleanedArticle[];

  if (userSentiment === -1) {
    sortedArticles = articles.sort((articleA, articleB) => {
      return articleB.sentiment - articleA.sentiment;
    })
  } else if (userSentiment === 1) {
    sortedArticles = articles.sort((articleA, articleB) => {
      return articleA.sentiment - articleB.sentiment;
    })
  } else {
    sortedArticles = articles.sort((articleA, articleB) => 0.5 - Math.random());
  }


   const articleCards = sortedArticles.map(article => {
    return  <Card
        title={ article.title }
        image={ article.multimedia.url }
        id={ article.id }
        key={ article.title }
      />
    })

    const filteredArticleCards = filteredArticles.map(article => {
     return  <Card
         title={ article.title }
         image={ article.multimedia.url }
         id={ article.id }
         key={ article.title }
       />
     })

    return (
      <div className="articles-container">
      <div className="all-sections">
        <SectionForm siftArticles={ siftArticles }/>
      </div>
        <section className="articles-display">
          {filteredArticles.length ? filteredArticleCards : articleCards}
        </section>
      </div>
    );
};


export default Feed;
