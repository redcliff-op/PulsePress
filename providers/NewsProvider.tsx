import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore';
import * as SQLite from 'expo-sqlite'

type NewsType = {
  userInfo: UserInfo | null,
  setUserInfo: (user: UserInfo | null) => void,
  language: string,
  setLanguage: (language: string) => void,
  country: string,
  setCountry: (country: string) => void
  topHeadlines: NewsItem[],
  fetchTopHeadlines: (lang?: string, ctr?: string) => void,
  headlines: NewsItem[],
  fetchHeadlines: (news: string, lang?: string) => void,
  recommended: NewsItem[],
  fetchRecommended: (sourceID: string | undefined) => void,
  fetchAllHeadlines: (category: string, lang?: string, ctr?: string) => void,
  currentNews: NewsItem | undefined,
  setCurrentNews: (newsItem: NewsItem) => void,
  savedNews: NewsItem[],
  updateSavedNews: (news: NewsItem) => void,
  setSavedNews: (savedNews: NewsItem[]) => void,
  loading: boolean,
  setLoading: (loading: boolean) => void
}

const NewsContext = createContext<NewsType>({
  userInfo: null,
  setUserInfo: (user: UserInfo | null) => { },
  language: "",
  setLanguage: (language: string) => { },
  country: "",
  setCountry: (country: string) => { },
  topHeadlines: [],
  fetchTopHeadlines: (lang?: string, ctr?: string) => { },
  headlines: [],
  fetchHeadlines: (news: string, lang?: string) => { },
  recommended: [],
  fetchRecommended: (sourceID: string | undefined) => { },
  fetchAllHeadlines: (category: string, lang?: string, ctr?: string) => { },
  currentNews: undefined,
  setCurrentNews: (newsItem: NewsItem) => { },
  savedNews: [],
  updateSavedNews: (news: NewsItem) => { },
  setSavedNews: (savedNews: NewsItem[]) => { },
  loading: false,
  setLoading: (loading: boolean) => { }
})

const NewsProvider = ({ children }: PropsWithChildren) => {
  const [topHeadlines, setTopHeadlines] = useState<NewsItem[]>([])
  const [headlines, setHeadlines] = useState<NewsItem[]>([])
  const [recommended, setRecommended] = useState<NewsItem[]>([])
  const [currentNews, setCurrentNews] = useState<NewsItem>()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [savedNews, setSavedNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>("")
  const [country, setCountry] = useState<string>("")

  const db = SQLite.openDatabaseSync('News.db');

  useEffect(() => {
    initLocalDB()
  }, [])

  const fetchAllHeadlines = async (category: string, lang: string | undefined = language, ctr: string | undefined = country) => {
    await fetchTopHeadlines(lang, ctr)
    await fetchHeadlines(category, lang)
  }

  const fetchHeadlines = async (news: string, lang: string | undefined = language) => {
    await updateHeadlinesFromLocal()
    const response = await fetch(`https://newsapi.org/v2/everything?q=${news}&language=${lang}&apiKey=1f2170ec3cb342678e3d5c74d807c59b`)
    const data = await response.json()
    if (data.status === 'ok') {
      await db.execAsync(`delete from headlines`);
      await db.execAsync(`begin transaction`);
      data.articles.forEach((headline: { source: { id: any; name: any; }; urlToImage: any; title: any; content: any; author: any; description: any; publishedAt: any; url: any; }) => {
        db.runAsync('insert into headlines (sourceId, sourceName, urlToImage, title, content, author, description, publishedAt, url) values (?,?,?,?,?,?,?,?,?)',
          [
            headline.source.id,
            headline.source.name,
            headline.urlToImage,
            headline.title,
            headline.content,
            headline.author,
            headline.description,
            headline.publishedAt,
            headline.url,
          ]);
      });
      await db.execAsync(`commit`);
      await updateHeadlinesFromLocal()
    }
    setLoading(false)
  }

  const fetchTopHeadlines = async (lang: string | undefined = language, ctr: string | undefined = country) => {
    await updateTopHeadlinesFromLocal()
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${ctr}&language=${lang}&apiKey=1f2170ec3cb342678e3d5c74d807c59b`)
    const data = await response.json()
    if (data.status === 'ok') {
      await db.execAsync(`delete from topHeadlines`);
      await db.execAsync(`begin transaction`);
      data.articles.forEach((headline: { source: { id: any; name: any; }; urlToImage: any; title: any; content: any; author: any; description: any; publishedAt: any; url: any; }) => {
        db.runAsync('insert into topHeadlines (sourceId, sourceName, urlToImage, title, content, author, description, publishedAt, url) values (?,?,?,?,?,?,?,?,?)',
          [
            headline.source.id,
            headline.source.name,
            headline.urlToImage,
            headline.title,
            headline.content,
            headline.author,
            headline.description,
            headline.publishedAt,
            headline.url,
          ]);
      });
      await db.execAsync(`commit`);
      await updateTopHeadlinesFromLocal()
    }
  }

  const fetchRecommended = async (sourceID: string | undefined) => {
    if (sourceID === 'clear') {
      setRecommended([])
    } else {
      const response = await fetch(`https://newsapi.org/v2/everything?sources=${sourceID}&language=${language}&apiKey=1f2170ec3cb342678e3d5c74d807c59b`)
      const data = await response.json()
      if (data.status === 'ok') {
        setRecommended(data.articles)
      } else {
        const recommended = headlines.filter((p) => p.sourceId === sourceID?.toString())
        setRecommended(recommended)
      }
    }

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

  const initLocalDB = async () => {
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS headlines (
        id INTEGER PRIMARY KEY,
        sourceId TEXT,
        sourceName TEXT,
        urlToImage TEXT,
        title TEXT,
        content TEXT,
        author TEXT,
        description TEXT,
        publishedAt TEXT,
        url TEXT
      );`
    )
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS topHeadlines (
        id INTEGER PRIMARY KEY,
        sourceId TEXT,
        sourceName TEXT,
        urlToImage TEXT,
        title TEXT,
        content TEXT,
        author TEXT,
        description TEXT,
        publishedAt TEXT,
        url TEXT
      );`
    )
  };

  const updateHeadlinesFromLocal = async () => {
    const headlines: NewsItem[] = await db.getAllAsync('select * from headlines')
    setHeadlines(headlines)
  }

  const updateTopHeadlinesFromLocal = async () => {
    const topHeadlines: NewsItem[] = await db.getAllAsync('select * from topHeadlines')
    setTopHeadlines(topHeadlines)
  }

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
      userInfo,
      setUserInfo,
      savedNews,
      updateSavedNews,
      setSavedNews,
      loading,
      setLoading,
      language,
      setLanguage,
      country,
      setCountry,
      fetchAllHeadlines
    }}>
      {children}
    </NewsContext.Provider>
  )
}

export default NewsProvider;
export const useNewsProvider = () => useContext(NewsContext)