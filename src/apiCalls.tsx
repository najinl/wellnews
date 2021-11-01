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
  sentiment?: string | number
}

interface Response {
  ok: boolean
  status: number
  json: any
}

export const fetchNewsData = () => {
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

export const getSentiment = (url: string) => {
  return fetch(`https://api.dandelion.eu/datatxt/sent/v1/?lang=en&url=${url}&token=8e05e6c7e8c24d05bb09b53e7f472df2`)
    .then(res => res.json())
    .then(data => data.sentiment.score)
    .then(sentiment => console.log(sentiment))
    .catch(err => console.log('error: ', err))
}

const cleanNewsData = (articles: OriginalArticle[]): CleanArticle[] => {
  return articles.map(({ section, title, abstract, short_url, multimedia } : OriginalArticle) => {
    return ({
      section,
      title,
      abstract,
      short_url,
      sentiment: '',
      multimedia: multimedia[0]
    })
  })
}
