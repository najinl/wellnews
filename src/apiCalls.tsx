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
    .then(data => cleanArticles(data.results.slice(0,10)))
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
  return fetch(`https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=${text}&token=8e05e6c7e8c24d05bb09b53e7f472df2`)
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
      shortUrl: short_url,
      sentiment: 0,
      multimedia: multimedia[0],
      id: url.slice(24, -5).replace(/\//g, '-')
    });
  });
};
