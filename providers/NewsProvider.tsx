import { PropsWithChildren, createContext, useContext, useState } from "react"
import firestore from '@react-native-firebase/firestore';

type NewsType = {
  userInfo: UserInfo | null,
  setUserInfo: (user: UserInfo | null) => void
  topHeadlines: NewsItem[],
  fetchTopHeadlines: () => void,
  headlines: NewsItem[],
  fetchHeadlines: (news: string) => void,
  recommended: NewsItem[],
  fetchRecommended: (sourceID: string | undefined) => void,
  currentNews: NewsItem | undefined,
  setCurrentNews: (newsItem: NewsItem) => void,
  savedNews: NewsItem[],
  updateSavedNews: (news: NewsItem) => void,
  setSavedNews: (savedNews: NewsItem[]) => void,
  loading: boolean,
}

const NewsContext = createContext<NewsType>({
  userInfo: null,
  setUserInfo: (user: UserInfo | null) => { },
  topHeadlines: [],
  fetchTopHeadlines: () => { },
  headlines: [],
  fetchHeadlines: (news: string) => { },
  recommended: [],
  fetchRecommended: (sourceID: string | undefined) => { },
  currentNews: undefined,
  setCurrentNews: (newsItem: NewsItem) => { },
  savedNews: [],
  updateSavedNews: (news: NewsItem) => { },
  setSavedNews: (savedNews: NewsItem[]) => { },
  loading: false,
})

const NewsProvider = ({ children }: PropsWithChildren) => {
  const [topHeadlines, setTopHeadlines] = useState<NewsItem[]>([])
  const [headlines, setHeadlines] = useState<NewsItem[]>([])
  const [recommended, setRecommended] = useState<NewsItem[]>([])
  const [currentNews, setCurrentNews] = useState<NewsItem>()
  const [loading, setLoading] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [savedNews, setSavedNews] = useState<NewsItem[]>([])

  const fetchHeadlines = async (news: string) => {
    setLoading(true)
    const response = await fetch(`https://newsapi.org/v2/everything?q=${news}&apiKey=1f2170ec3cb342678e3d5c74d807c59b`)
    const data = await response.json()
    setHeadlines(data.articles)
    setLoading(false)
  }

  const fetchTopHeadlines = async () => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=1f2170ec3cb342678e3d5c74d807c59b`)
    const data = await response.json()
    setTopHeadlines(data.articles)
  }

  const fetchRecommended = async (sourceID: string | undefined) => {
    setLoading(true)
    const response = await fetch(`https://newsapi.org/v2/everything?sources=${sourceID}&from=2024-05-15&to=2024-05-15&sortBy=popularity&apiKey=1f2170ec3cb342678e3d5c74d807c59b`)
    const data = await response.json()
    setRecommended(data.articles)
    setLoading(false)
  }

  const updateSavedNews = async (news: NewsItem) => {
    const index = savedNews.findIndex((p) => p.url.toString() === news.url);
    let updatedSavedNews;
    if (index === -1) {
      updatedSavedNews = [...savedNews, news];
      setSavedNews(updatedSavedNews)
    } else {
      updatedSavedNews = savedNews.filter((p) => p.url !== news.url);
      setSavedNews(updatedSavedNews)
    }
    const userDoc = firestore().collection('Users').doc(userInfo?.email);
    await userDoc.update({ savedNews: updatedSavedNews });
  };

  return (
    <NewsContext.Provider value={{
      topHeadlines,
      fetchTopHeadlines,
      headlines,
      fetchHeadlines,
      currentNews,
      setCurrentNews,
      recommended,
      fetchRecommended,
      loading,
      userInfo,
      setUserInfo,
      savedNews,
      updateSavedNews,
      setSavedNews
    }}>
      {children}
    </NewsContext.Provider>
  )
}

export default NewsProvider;
export const useNewsProvider = () => useContext(NewsContext)