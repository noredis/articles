import { Comment } from "../entity/model/entity/comment";
import { CommentView } from "../entity/ui/Comment";
import { useComments } from "../entity/model/use-case/use-comments";
import { useEffect, useState } from "react";

type CommentListProps = {
    articleId: string|undefined;
};

export const CommentList = ({articleId}: CommentListProps) => {
    const [page, setPage] = useState(1);
    const [comments, setComments] = useState<Comment[]>([]);
    const {data: res, isFetching, isSuccess} = useComments(articleId, page);

    useEffect(() => {
        if (isSuccess && res.data) {
            setComments(prev => [...prev, ...res.data]);
        }
    }, [res]);

    if (isFetching || !isSuccess) {
        return null;
    }

    return (
        <>
            <div className="block-title">Комментарии</div>
            <div>
                {
                    comments.map(comment => <CommentView comment={comment} />)
                }
                {
                    res.links?.next != null ? (
                        <div className="upload-more button" onClick={() => {setPage(p => p + 1)}}>
                            Загрузить ещё
                        </div>
                    ) : null
                }
            </div>
        </>
    );
};
