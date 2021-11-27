import Card from '../Card/Card';
import { CleanedArticle } from '../../Models';
import '../Feed/Feed.css'

interface SavedArticlesProps {
  savedArticles: CleanedArticle[];
  updateUserSentiment: (userSentiment: number) => void;
  storeArticle: (id: string) => void;
}

const SavedArticles = ({ savedArticles, storeArticle, updateUserSentiment }: SavedArticlesProps): JSX.Element => {

  return (

  );
}

export default SavedArticles;
