export interface CleanedArticle {
  topic: string
  title: string
  abstract: string
  short_url: string
  multimedia: Multimedia
  sentiment: number
  id: number
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
