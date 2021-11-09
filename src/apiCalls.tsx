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

export const getArticles = (topic = 'home'): Promise<CleanedArticle[]> => {
  return (
    fetch(`https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr`)
    .then(response => checkResponse(response))
    .then(data => cleanArticles(data.results.slice(0,3)))
  );
};

const checkResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${ response.status } Error`);
  }
  return response.json();
};

export const getSentiment = (title: string, abstract: string): Promise<number> => {
  const text = title + ' ' + abstract;
  // add your API token here; remove before merging to main
  const token = '' || '91255d6d440f4c24a1b4a5ec443588d8';
  if (token) { console.log('token in use; remove before pushing')}
  return fetch(`https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=${text}&token=${token}`)
    .then(response => checkResponse(response))
    .then(data => data.sentiment.score)
    .catch(err => console.log('error: ', err))
};

const cleanArticles = (articles: OriginalArticle[]): CleanedArticle[] => {
  return articles.map(({ section, title, abstract, short_url, multimedia, url }: OriginalArticle) => {
    return ({
      topic: section,
      title,
      abstract,
      short_url,
      sentiment: 0,
      multimedia: multimedia[0],
      id: url.slice(24, -5).replace(/\//g, '-')
    });
  });
};
