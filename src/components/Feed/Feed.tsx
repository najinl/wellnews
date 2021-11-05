import { CleanedArticle } from '../../Models'
import Card from '../Card/Card';
import SectionForm from '../SectionForm/SectionForm';
import './Feed.css';

interface FeedProps {
  userSentiment: number | null;
  articles: CleanedArticle[];
  updateUserSentiment: (userSentiment: number) => void;
  filteredArticles: CleanedArticle[];
  siftArticles: (selectedSections: string[]) => void;
}

const Feed = ({ userSentiment, articles, updateUserSentiment, filteredArticles, siftArticles }: FeedProps): JSX.Element => {

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
  console.log(sortedArticles.forEach(article => console.log('article.sentiment: ', article.sentiment)))
  const articleCards = sortedArticles.map(article => {
    return  <Card
        title={ article.title }
        image={ article.multimedia.url }
        id={ article.id }
        sentiment={ article.sentiment }
        updateUserSentiment={ updateUserSentiment }
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
