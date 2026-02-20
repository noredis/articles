import { useCallback, useEffect, useState } from "react";
import { Article } from "../entity/model/article";
import { ArticleView } from "../entity/ui/Article";

export const ArticleList = () => {
  const [link, setLink] = useState<string|null>('http://localhost/api/articles?page=1&per_page=5');
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchData = useCallback(async () => {
    if (link != null) {
      const response = await fetch(link);
      const body = await response.json();
      setArticles([...articles, ...body.data]);
      setLink(body.links.next);
    }
  }, [link]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="article-list-container">
        {
            articles.map(article => <ArticleView key={article.id} article={article} />)
        }
        {
            link != null ? (
                <div className="upload-more button" onClick={fetchData}>
                    Загрузить ещё
                </div>
            ) : null
        }
    </div>
  );
};
