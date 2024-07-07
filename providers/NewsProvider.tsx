import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";
import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'
import schema from '../model/schema'
import migrations from '../model/migrations'
import { Headlines, TopHeadlines } from '../model/Model'

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
    TopHeadlines
  ],
})

const NewsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [topHeadlines, setTopHeadlines] = useState<NewsItem[]>([]);
  const [headlines, setHeadlines] = useState<NewsItem[]>([]);
  const [recommended, setRecommended] = useState<NewsItem[]>([]);
  const [currentNews, setCurrentNews] = useState<NewsItem>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadHeadlinesFromDB();
    loadTopHeadlinesFromDB();
  }, []);

  const clearTable = async (table: any) => {
    const allRecords = await table.query().fetch();
    await database.write(async () => {
      await database.batch(...allRecords.map(record => record.prepareDestroyPermanently()));
    });
  };

  const saveHeadlinesToDB = async (articles: NewsItem[], table: any) => {
    await clearTable(table);
    await database.write(async () => {
      const records = articles.map(article => table.prepareCreate(record => {
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

  const fetchHeadlines = async (news: string) => {
    setLoading(true);
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${news}&apiKey=1f2170ec3cb34 2678e3d5c74d807c59b`
    );
    const data = await response.json();
    if (data.status === 'ok') {
      await saveHeadlinesToDB(data.articles, database.collections.get('headlines'))
      await loadHeadlinesFromDB()
    }
    setLoading(false);
  };

  const fetchTopHeadlines = async () => {
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=1f2170ec3c b342678e3d5c74d807c59b"
    );
    const data = await response.json();
    if (data.status === 'ok') {
      await saveHeadlinesToDB(data.articles, database.collections.get('top_headlines'));
      await loadTopHeadlinesFromDB()
    }
  };

  const fetchRecommended = async (sourceID: string) => {
    setLoading(true);
    const response = await fetch(
      `https://newsapi.org/v2/everything?sources=${sourceID}&from=2024-05-15&to=2024-05-15&sortBy=popularity&apiKey=1f2170ec3cb342678e3d5c74d807c59b`
    );
    const data = await response.json();
    setRecommended(data.articles);
    setLoading(false);
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
