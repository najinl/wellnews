import { CleanedArticle, Multimedia } from './Models'

interface OriginalArticle {
  section: string
  title: string
  abstract: string
  short_url: string
  multimedia: Multimedia[]
  url: string
}

interface Response {
  ok: boolean
  status: number
  json: any
}

export const getArticles = (topic: string): Promise<CleanedArticle[]> => {
  return (
    fetch(`https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr`)
    .then(response => checkResponse(response))
    .then(data => {
      return cleanArticles(data.results.slice(0, 10))})
  )
};

const checkResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${ response.status } Error`);
  }
  return response.json();
};

export const getSentiment = (title: string, abstract: string): Promise<number> => {
  const text = title + ' ' + abstract;
  return fetch(`https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=${text}&token=2631fc217a884d47981ad6e975a50643`)
    .then(response => checkResponse(response))
    .then(data => data.sentiment.score)
    .catch(err => console.log('error: ', err))
};

const cleanArticles = (articles: OriginalArticle[]): CleanedArticle[] => {
  const cleanedArticles = articles.filter(({multimedia}: OriginalArticle) => {
    return Array.isArray(multimedia)
  })
  .map(({ section, title, abstract, short_url, multimedia, url }: OriginalArticle) => {
      return ({
        topic: section,
        title,
        abstract,
        shortUrl: short_url,
        sentiment: 0,
        multimedia: multimedia[0],
        id: url.slice(24, -5).replace(/\//g, '-')
      });
  });
  return cleanedArticles;
};
