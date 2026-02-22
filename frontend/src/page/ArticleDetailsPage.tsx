import { useParams } from "react-router-dom";
import { ArticleDetails } from "../feature/ArticleDetails";
import { CommentList } from "../feature/CommentList";

export const ArticleDetailsPage = () => {
    const {id} = useParams();

    return (
        <div className="article-details-page">
            <ArticleDetails id={id} />
            <CommentList articleId={id} />
        </div>
    );
};
