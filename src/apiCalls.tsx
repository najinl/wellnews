interface Multimedia {
  url: string
  format: string
  height: number
  width: number
  type: string
  subtype: string
  caption: string
  copyright: string
}

interface OriginalArticle {
  section: string
  title: string
  abstract: string
  short_url: string
  multimedia: Multimedia[]
}

export interface CleanArticle {
  section: string
  title: string
  abstract: string
  short_url: string
  multimedia: Multimedia
  sentiment: number
}

interface Response {
  ok: boolean
  status: number
  json: any
}

export const fetchNewsData = (): Promise<CleanArticle[]> => {
  return (
    fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr')
    .then(response => checkResponse(response))
    .then(data => cleanNewsData(data.results))
  )
}

const checkResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} Error`)
  }
  return response.json()
}

export const getSentiment = (abstract: string): Promise<number> => {
  return fetch(`https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=${abstract}&token=91255d6d440f4c24a1b4a5ec443588d8`)
    .then(response => checkResponse(response))
    .then(data => data.sentiment.score)
    .catch(err => console.log('error: ', err))
}

const cleanNewsData = (articles: OriginalArticle[]): CleanArticle[] => {
  return articles.map(({ section, title, abstract, short_url, multimedia }: OriginalArticle) => {
    return ({
      section,
      title,
      abstract,
      short_url,
      sentiment: 0,
      multimedia: multimedia[0]
    })
  })
}
