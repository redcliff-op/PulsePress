interface NewsItem{
  id: number,
  sourceId: string,
  sourceName: string,
  urlToImage: string,
  title: string,
  content: string,
  author: string,
  description: string,
  publishedAt: string,
  url: string,
}

type UserInfo = {
  id: string,
  name: string | null,
  email: string,
  photo: string | null,
  familyName: string | null,
  givenName: string | null,
}