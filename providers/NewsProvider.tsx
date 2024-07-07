import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";
import { Database, Q } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'
import schema from '../model/schema'
import migrations from '../model/migrations'
import { Headlines, TopHeadlines, Saved } from '../model/Model'

type NewsType = {
  topHeadlines: NewsItem[];
  fetchTopHeadlines: (lang?: string, ctr?: string) => void;
  headlines: NewsItem[];
  fetchHeadlines: (news: string, lang?: string) => void;
  recommended: NewsItem[];
  fetchRecommended: (sourceID: string) => void;
  savedNews: NewsItem[],
  handleSaveNote: (newsItem: NewsItem) => Promise<void>,
  fetchAllHeadlines: (category: string, lang?: string, ctr?: string) => void,
  currentNews: NewsItem | undefined;
  setCurrentNews: (newsItem: NewsItem) => void;
  loading: boolean;
  language: string,
  setLanguage: (language: string) => void,
  country: string,
  setCountry: (country: string) => void
};

const NewsContext = createContext<NewsType>({
  topHeadlines: [],
  fetchTopHeadlines: (lang?: string, ctr?: string) => { },
  headlines: [],
  fetchHeadlines: (news: string, lang?: string) => { },
  recommended: [],
  fetchRecommended: (sourceID: string) => { },
  currentNews: undefined,
  savedNews: [],
  handleSaveNote: async (newsItem: NewsItem) => { },
  setCurrentNews: (newsItem: NewsItem) => { },
  fetchAllHeadlines: (category: string, lang?: string, ctr?: string) => { },
  loading: false,
  language: "",
  setLanguage: (language: string) => { },
  country: "",
  setCountry: (country: string) => { }
});

const adapter = new LokiJSAdapter({
  schema,
  migrations,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  onQuotaExceededError: (error) => {
  },
  onSetUpError: (error) => {
  },
  extraIncrementalIDBOptions: {
    onDidOverwrite: () => {
    },
    onversionchange: () => {
    },
  }
})

const database = new Database({
  adapter,
  modelClasses: [
    Headlines,
    TopHeadlines,
    Saved
  ],
})

const NewsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [topHeadlines, setTopHeadlines] = useState<NewsItem[]>([]);
  const [headlines, setHeadlines] = useState<NewsItem[]>([]);
  const [recommended, setRecommended] = useState<NewsItem[]>([]);
  const [savedNews, setSavedNews] = useState<NewsItem[]>([])
  const [currentNews, setCurrentNews] = useState<NewsItem>();
  const [loading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en")
  const [country, setCountry] = useState<string>("in")

  useEffect(() => {
    loadHeadlinesFromDB();
    loadTopHeadlinesFromDB();
    loadSavedFromDB()
  }, []);

  const clearTable = async (table: any) => {
    const allRecords = await table.query().fetch();
    await database.write(async () => {
      await database.batch(...allRecords.map((record:any) => record.prepareDestroyPermanently()));
    });
  };

  const saveHeadlinesToDB = async (articles: NewsItem[], table: any) => {
    await clearTable(table);
    await database.write(async () => {
      const records = articles.map(article => table.prepareCreate((record:any) => {
        record.sourceId = article.source.id;
        record.sourceName = article.source.name;
        record.urlToImage = article.urlToImage;
        record.title = article.title;
        record.content = article.content;
        record.author = article.author;
        record.description = article.description;
        record.publishedAt = article.publishedAt;
        record.url = article.url;
      }));
      await database.batch(...records);
    });
  };

  const loadHeadlinesFromDB = async () => {
    const allHeadlines = await database.collections.get('headlines').query().fetch();
    const formattedHeadlines = allHeadlines.map((record: any) => ({
      source: { id: record.sourceId, name: record.sourceName },
      urlToImage: record.urlToImage,
      title: record.title,
      content: record.content,
      author: record.author,
      description: record.description,
      publishedAt: record.publishedAt,
      url: record.url,
    }));
    setHeadlines(formattedHeadlines);
  };

  const loadTopHeadlinesFromDB = async () => {
    const allTopHeadlines = await database.collections.get('top_headlines').query().fetch();
    const formattedTopHeadlines = allTopHeadlines.map((record: any) => ({
      source: { id: record.sourceId, name: record.sourceName },
      urlToImage: record.urlToImage,
      title: record.title,
      content: record.content,
      author: record.author,
      description: record.description,
      publishedAt: record.publishedAt,
      url: record.url,
    }));
    setTopHeadlines(formattedTopHeadlines);
  };

  const loadSavedFromDB = async () => {
    const allHeadlines = await database.collections.get('saved').query().fetch();
    const formattedHeadlines = allHeadlines.map((record: any) => ({
      source: { id: record.sourceId, name: record.sourceName },
      urlToImage: record.urlToImage,
      title: record.title,
      content: record.content,
      author: record.author,
      description: record.description,
      publishedAt: record.publishedAt,
      url: record.url,
    }));
    setSavedNews(formattedHeadlines);
  };

  const handleSaveNote = async (newsItem: NewsItem) => {
    const savedCollection = database.collections.get('saved');
  
    const existingArticle = await savedCollection.query(Q.where('url', newsItem.url)).fetch();
  
    await database.write(async () => {
      if (existingArticle.length > 0) {
        await existingArticle[0].markAsDeleted();
        await existingArticle[0].destroyPermanently();
        setSavedNews(savedNews.filter(article => article.url !== newsItem.url));
      } else {
        await savedCollection.create(record => {
          record.sourceId = newsItem.source.id;
          record.sourceName = newsItem.source.name;
          record.urlToImage = newsItem.urlToImage;
          record.title = newsItem.title;
          record.content = newsItem.content;
          record.author = newsItem.author;
          record.description = newsItem.description;
          record.publishedAt = newsItem.publishedAt;
          record.url = newsItem.url;
        });
        setSavedNews([...savedNews, newsItem]);
      }
    });
  };

  const fetchAllHeadlines = async (category: string, lang: string | undefined = language, ctr: string | undefined = country) => {
    await fetchTopHeadlines(lang, ctr)
    await fetchHeadlines(category, lang)
  }

  const fetchHeadlines = async (news: string, lang: string | undefined = language) => {
    setLoading(true);
    const response = await fetch(`https://newsapi.org/v2/everything?q=${news}&language=${lang}&apiKey=1f2170ec3cb342678e3d5c74d807c59b`)
    const data = await response.json();
    if (data.status === 'ok') {
      await saveHeadlinesToDB(data.articles, database.collections.get('headlines'))
      await loadHeadlinesFromDB()
    }
    setLoading(false);
  };

  const fetchTopHeadlines = async (lang: string | undefined = language, ctr: string | undefined = country) => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${ctr}&language=${lang}&apiKey=1f2170ec3cb342678e3d5c74d807c59b`)
    const data = await response.json();
    if (data.status === 'ok') {
      await saveHeadlinesToDB(data.articles, database.collections.get('top_headlines'));
      await loadTopHeadlinesFromDB()
    }
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
        const recommended = headlines.filter((p) => p.source.id.toString() === sourceID?.toString())
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
        language,
        setLanguage,
        country,
        setCountry,
        fetchAllHeadlines,
        savedNews,
        handleSaveNote
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
export const useNewsProvider = () => useContext(NewsContext);
