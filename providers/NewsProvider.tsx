import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NewsType = {
  topHeadlines: NewsItem[];
  fetchTopHeadlines: () => void;
  headlines: NewsItem[];
  fetchHeadlines: (news: string) => void;
  recommended: NewsItem[];
  fetchRecommended: (sourceID: string) => void;
  currentNews: NewsItem | undefined;
  setCurrentNews: (newsItem: NewsItem) => void;
  loading: boolean;
};

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
});

const NewsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [topHeadlines, setTopHeadlines] = useState<NewsItem[]>([]);
  const [headlines, setHeadlines] = useState<NewsItem[]>([]);
  const [recommended, setRecommended] = useState<NewsItem[]>([]);
  const [currentNews, setCurrentNews] = useState<NewsItem>();
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = async () => {
    try {
      const topHeadlinesData = await AsyncStorage.getItem("topHeadlines");
      const headlinesData = await AsyncStorage.getItem("headlines");
      const recommendedData = await AsyncStorage.getItem("recommended");

      if (topHeadlinesData) setTopHeadlines(JSON.parse(topHeadlinesData));
      if (headlinesData) setHeadlines(JSON.parse(headlinesData));
      if (recommendedData) setRecommended(JSON.parse(recommendedData));
    } catch (error) {
      console.error("Error loading data from AsyncStorage:", error);
    }
  };

  const saveToStorage = async () => {
    try {
      await AsyncStorage.setItem("topHeadlines", JSON.stringify(topHeadlines));
      await AsyncStorage.setItem("headlines", JSON.stringify(headlines));
      await AsyncStorage.setItem("recommended", JSON.stringify(recommended));
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };

  const fetchHeadlines = async (news: string) => {
    setLoading(true);
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${news}&apiKey=1f2170  ec3cb342678e3d5c74d807c59b`
    );
    const data = await response.json();
    setHeadlines(data.articles);
    await saveToStorage();
    await loadFromStorage();
    setLoading(false);
  };

  const fetchTopHeadlines = async () => {
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=1f  2170ec3cb342678e3d5c74d807c59b"
    );
    const data = await response.json();
    setTopHeadlines(data.articles);
    await saveToStorage();
    await loadFromStorage();
  };

  const fetchRecommended = async (sourceID: string) => {
    if (sourceID === 'clear') {
      setRecommended([])
    } else {
      const response = await fetch(`https://newsapi.org/v2/everything?sources=${sourceID}&language=${language}&apiKey=1f2170ec3cb342678e3d5c74d807c59b`)
      const data = await response.json()
      if (data.status === 'ok') {
        setRecommended(data.articles)
      } else {
        const recommended = headlines.filter((p) => p.source.id === sourceID?.toString())
        setRecommended(recommended)
      }
    }
  };

  return (
    <NewsContext.Provider
      value={{
        topHeadlines,
        fetchTopHeadlines,
        headlines,
        fetchHeadlines,
        currentNews,
        setCurrentNews,
        recommended,
        fetchRecommended,
        loading,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
export const useNewsProvider = () => useContext(NewsContext);
