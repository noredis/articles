import { useEffect, useState } from "react";
import { Article } from "../entity/model/article";
import { NotFound } from "../common/ui/NotFound";

type ArticleDetailsProps = {
    id: string|undefined;
}

export const ArticleDetails = ({id}: ArticleDetailsProps) => {
    const [article, setArticle] = useState<Article|null>(null);
    const [notFound, setNotFound] = useState(false);

    const fetchArticle = async (id: string) => {
        await fetch(`/api/articles/${id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                setNotFound(true);
            })
            .then(body => body && setArticle(body.data));
    };
    
    useEffect(() => {
        if (id != null) {
            fetchArticle(id);
        }
    }, [id]);

    if (notFound || article == null) {
        return <NotFound content="Статьи не существует" />;
    };

    return (
        <>
            <h1>{article.title}</h1>
            <div>{article.content}</div>
        </>
    );
};
