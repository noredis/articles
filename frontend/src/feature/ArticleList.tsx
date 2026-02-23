import { useCallback, useEffect, useState } from "react";
import { Article } from "../entity/model/entity/article";
import { ArticleView } from "../entity/ui/Article";

export const ArticleList = () => {
  const limit = 5;
  const [link, setLink] = useState<string|null>(`/api/articles?offset=0&limit=${limit}`);
  const [articles, setArticles] = useState<Article[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [articleErrors, setArticleErrors] = useState<any>({});

  const fetchData = useCallback(async () => {
    if (link != null) {
      const response = await fetch(link);
      const body = await response.json();
      setArticles([...articles, ...body.data]);
      if (body.data.length == 0) {
        setLink(null);
        return;
      }
      setLink(`/api/articles?offset=${articles.length + body.data.length}&limit=${limit}`);
    }
  }, [link]);

  const publishArticle = async () => {
    try {
      const response = await fetch(`/api/articles`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
              title: title,
              content: content,
          }),
      });

      if (response.ok) {
          const body = await response.json();
          setArticles([body.data, ...articles])
          setTitle("");
          setContent("");
          setModalIsOpen(false);
          if (link != null) {
            setLink(`/api/articles?offset=${articles.length + 1}&limit=${limit}`);
          }
      } else if (response.status == 422) {
          const body = await response.json();
          setArticleErrors(body.errors);
      }
    } catch (e) {}
  }

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
        <div className="button new-article" onClick={() => setModalIsOpen(true)}>Новая статья</div>
        {
          modalIsOpen ? (
            <form className="new-article-modal">
              <input
                placeholder="Заголовок"
                id="title"
                className="new-article-title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <span className="error">{articleErrors.title ? articleErrors.title[0] : ""}</span>
              <textarea
                placeholder="Содержимое"
                id="content"
                className="new-article-content"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
              <span className="error">{articleErrors.content ? articleErrors.content[0] : ""}</span>
              <div className="buttons">
                <div className="button new-article-btn" onClick={publishArticle}>Опубликовать</div>
                <div className="button new-article-btn close-btn" onClick={() => setModalIsOpen(false)}>Закрыть</div>
              </div>
            </form>
          ) : null
        }
    </div>
  );
};
