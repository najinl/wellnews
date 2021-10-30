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

interface CleanArticle {
  section: string
  title: string
  abstract: string
  short_url: string
  multimedia: Multimedia
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

const cleanNewsData = (articles: OriginalArticle[]): CleanArticle[] => {
  return articles.map(({ section, title, abstract, short_url, multimedia } : OriginalArticle) => {
    return ({
      section,
      title,
      abstract,
      short_url,
      multimedia: multimedia[0]
    })
  })
}
