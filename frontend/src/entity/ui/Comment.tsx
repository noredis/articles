import { formatDate } from "../../common/utils/format-date";
import { Comment } from "../model/entity/comment"

type CommentProps = {
    comment: Comment;
};

export const CommentView = ({comment}: CommentProps) => {
    return (
        <div className="comment-container">
            <img src={`${process.env.PUBLIC_URL}/fish.png`} className="fish-img" width={80} height={80} />
            <div className="comment-content-container">
                <div className="comment-author">{comment.author_name}</div>
                <div className="comment-content">{comment.content}</div>
                <div className="comment-date-creation">{formatDate(comment.created_at)}</div>
            </div>
        </div>
    );
};
