import { truncate } from "../../common/utils/truncate-string";
import { Article } from "../model/article";

type ArticleProps = {
    article: Article;
};

export const ArticleView = ({article}: ArticleProps) => {
    return (
        <div className="article-container">
            <div className="article-title">
            {article.title}
            </div>
            {truncate(article.content, 400)}
            <div className="article-read-completely button">
                Читать полностью
            </div>
        </div>
    );
};
