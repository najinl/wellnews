<<<<<<< HEAD
export const fetchNewsData = () => {
  return (
    fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=GKUzDD1VY9ssjZ1AGusX3ci6AeoXCaSr')
    .then(response => checkResponse(response))
    .then(data=> cleanNewsData(data.results))
  )
}

const checkResponse = (response: any) => {
  if (!response.ok) {
    throw new Error(`${response.status} Error`)
  }
  return response.json()
}

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

interface Article {
  section: string
  title: string
  abstract: string
  short_url: string
  multimedia: Multimedia[]
};

const cleanNewsData = (articles: Article[]) => {
  return articles.map(({ section, title, abstract, short_url, multimedia } : Article) => {
    return ({
      section,
      title,
      abstract,
      short_url,
      multimedia: multimedia[0]
    })
  })
}
=======
export {}
>>>>>>> main
