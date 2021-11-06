import { CleanedArticle, Multimedia } from './Models'

interface OriginalArticle {
  section: string
  title: string
  abstract: string
  short_url: string
  multimedia: Multimedia[]
  uri: string
}

interface Response {
  ok: boolean
  status: number
  json: any
}

export const getArticles = (): Promise<CleanedArticle[]> => {
  return (
    fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr')
    .then(response => checkResponse(response))
    .then(data => {
      console.log(data)
      return cleanArticles(data.results)
    })
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
  const token = '' || '488823ba0f914b1f8eddc319191cbc7a';
  if (token) { console.log('token in use; remove before pushing')}
  return fetch(`https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=${text}&token=${token}`)
    .then(response => checkResponse(response))
    .then(data => data.sentiment.score)
    .catch(err => console.log('error: ', err))
};

const cleanArticles = (articles: OriginalArticle[]): CleanedArticle[] => {
  return articles.map(({ section, title, abstract, short_url, multimedia, uri }: OriginalArticle) => {
    return ({
      topic: section,
      title,
      abstract,
      short_url,
      sentiment: 0,
      multimedia: multimedia[0],
      id: uri
    });
  });
};
