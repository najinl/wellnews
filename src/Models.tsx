export interface CleanedArticle {
  topic: string
  title: string
  abstract: string
  shortUrl: string
  multimedia: Multimedia
  sentiment: number
  id: string
};

export interface Multimedia {
  url: string
  format: string
  height: number
  width: number
  type: string
  subtype: string
  caption: string
  copyright: string
};
