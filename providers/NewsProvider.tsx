import { PropsWithChildren, createContext, useContext, useState } from "react"
import { TurboModuleRegistry } from "react-native"

type NewsType = {
  topHeadlines: NewsItem[],
  fetchTopHeadlines: () => void,
  headlines: NewsItem[],
  fetchHeadlines: (news: string) => void,
  recommended: NewsItem[],
  fetchRecommended: (sourceID: string) => void,
  currentNews: NewsItem | undefined,
  setCurrentNews: (newsItem: NewsItem) => void,
  loading: boolean,
}

const NewsContext = createContext<NewsType>({
  topHeadlines: [],
  fetchTopHeadlines: () => { },
  headlines: [],
  fetchHeadlines: (news: string) => { },
  recommended: [],
  fetchRecommended: (sourceID: string) => { },
  currentNews: undefined,
  setCurrentNews: (newsItem: NewsItem) => { },
  loading: false,
})

const NewsProvider = ({ children }: PropsWithChildren) => {
  const [topHeadlines, setTopHeadlines] = useState<NewsItem[]>([])
  const [headlines, setHeadlines] = useState<NewsItem[]>([])
  const [recommended, setRecommended] = useState<NewsItem[]>([])
  const [currentNews, setCurrentNews] = useState<NewsItem>()
  const [loading, setLoading] = useState<boolean>(false)

  const fetchHeadlines = async (news: string) => {
    setLoading(true)
    const response = await fetch(`https://newsapi.org/v2/everything?q=${news}&apiKey=1f2170ec3cb342678e3d5c74d807c59b`)
    const data = await response.json()
    setHeadlines(data.articles)
    setLoading(false)
  }

  const fetchTopHeadlines = async () => {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=1f2170ec3cb342678e3d5c74d807c59b')
    const data = await response.json()
    setTopHeadlines(data.articles)
  }

  const fetchRecommended = async (sourceID: string) => {
    setLoading(true)
    const response = await fetch(`https://newsapi.org/v2/everything?sources=${sourceID}&from=2024-05-15&to=2024-05-15&sortBy=popularity&apiKey=1f2170ec3cb342678e3d5c74d807c59b`)
    const data = await response.json()
    setRecommended(data.articles)
    setLoading(false)
  }

  return (
    <NewsContext.Provider value={{ topHeadlines, fetchTopHeadlines, headlines, fetchHeadlines, currentNews, setCurrentNews, recommended, fetchRecommended, loading}}>
      {children}
    </NewsContext.Provider>
  )
}

export default NewsProvider;
export const useNewsProvider = () => useContext(NewsContext)