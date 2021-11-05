import { CleanedArticle } from '../../Models'
import Card from '../Card/Card';
import SectionForm from '../SectionForm/SectionForm';
import './Feed.css';

interface FeedProps {
  userSentiment: number | null;
  articles: CleanedArticle[];
  selectedArticles: CleanedArticle[];
  findMatchingArticles: (findMatchingArticles: string[]) => void;
  updateUserSentiment: (userSentiment: number) => void;
}

const Feed = ({ userSentiment, articles, selectedArticles, findMatchingArticles, updateUserSentiment }: FeedProps): JSX.Element => {

  let sortedArticles : CleanedArticle[];

  if (userSentiment && userSentiment >= -1 && userSentiment <= -0.3) {
    sortedArticles = articles.sort((articleA, articleB) => {
      return articleB.sentiment - articleA.sentiment;
    })
  } else if (userSentiment && userSentiment <= 1 && userSentiment >= 0.3) {
    sortedArticles = articles.sort((articleA, articleB) => {
      return articleA.sentiment - articleB.sentiment;
    })
  } else {
    sortedArticles = articles.sort((articleA, articleB) => 0.5 - Math.random());
  }


   const articleCards = sortedArticles.map(article => {
    console.log(article.sentiment)
    return  <Card
        title={ article.title }
        image={ article.multimedia.url }
        id={ article.id }
        sentiment={ article.sentiment }
        updateUserSentiment={ updateUserSentiment }
        key={ article.title }
      />
    })

    const foundArticleCards = selectedArticles.map(article => {
     return  <Card
         title={ article.title }
         image={ article.multimedia.url }
         id={ article.id }
         sentiment={ article.sentiment }
         updateUserSentiment= { updateUserSentiment }
         key={ article.title }
       />
     })

    return (
      <main>
        <div className="all-sections">
          <SectionForm findMatchingArticles={ findMatchingArticles }/>
        </div>
        <div className="articles-container">
          <section className="articles-display">
            { foundArticleCards.length ? foundArticleCards : articleCards }
          </section>
        </div>
      </main>
    );
};


export default Feed;
