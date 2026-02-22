import { useParams } from "react-router-dom";
import { ArticleDetails } from "../feature/ArticleDetails";

export const ArticleDetailsPage = () => {
    const {id} = useParams();

    return (
        <div className="article-details-page">
            <ArticleDetails id={id} />
        </div>
    );
};
