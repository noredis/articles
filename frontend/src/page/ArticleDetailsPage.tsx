import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Article } from "../entity/model/entity/article";
import { NotFound } from "../common/ui/NotFound";
import { Comment } from "../entity/model/entity/comment";
import { CommentView } from "../entity/ui/Comment";

export const ArticleDetailsPage = () => {
    const limit = 5;
    const {id} = useParams();
    const [article, setArticle] = useState<Article|null>(null);
    const [notFound, setNotFound] = useState<boolean|null>(null);
    const [commentsLink, setCommentsLink] = useState<string|null>(`/api/articles/${id}/comments?offset=0&limit=${limit}`)
    const [comments, setComments] = useState<Comment[]>([])
    const [authorName, setAuthorName] = useState("");
    const [commentContent, setCommentContent] = useState("");
    const [commentErrors, setCommentErrors] = useState<any>({});

    const fetchArticle = async (id: string) => {
        await fetch(`/api/articles/${id}`)
            .then(res => {
                if (res.ok) {
                    setNotFound(false);
                    return res.json();
                }
                setNotFound(true);
            })
            .then(body => body && setArticle(body.data));
    };

    const fetchComments = useCallback(async () => {
        if (commentsLink != null && id != null) {
            const response = await fetch(commentsLink);
            const body = await response.json();
            setComments([...comments, ...body.data]);
            if (body.data.length == 0) {
                setCommentsLink(null);
                return;
            }
            setCommentsLink(`/api/articles/${id}/comments?offset=${comments.length + body.data.length}&limit=${limit}`);
        }
    }, [commentsLink]);

    const sendComment = async () => {
        try {
            const response = await fetch(`/api/articles/${id}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({
                    author_name: authorName,
                    content: commentContent,
                }),
            });

            if (response.ok) {
                const body = await response.json();
                setComments([body.data, ...comments])
                setCommentContent("");
                setAuthorName("");
                if (commentsLink != null) {
                    setCommentsLink(`/api/articles/${id}/comments?offset=${comments.length + 1}&limit=${limit}`);
                }
            } else if (response.status == 422) {
                const body = await response.json();
                setCommentErrors(body.errors);
            }
        } catch (e) {}
    };

    useEffect(() => {
        if (id != null) {
            fetchArticle(id);
        }
    }, [id]);

    useEffect(() => {
        if (notFound === false) {
            fetchComments();
        }
    }, [notFound]);
    
    if (notFound || article == null) {
        return <NotFound content="Статьи не существует" />;
    };

    return (
        <div className="article-details-page">
            <h1>{article.title}</h1>
            <div>{article.content}</div>
            <form className="send-comment-form">
                <div className="send-comment-author">
                    <img src={`${process.env.PUBLIC_URL}/fish.png`} className="fish-img" width={80} height={80} />
                    <input
                        type="text"
                        className="send-comment-form-author-name"
                        id="author_name"
                        placeholder="Отображаемое имя"
                        value={authorName}
                        onChange={e => setAuthorName(e.target.value)}
                    />
                    <span className="error">{commentErrors.author_name ? commentErrors.author_name[0] : ""}</span>
                </div>
                <textarea
                    className="send-comment-form-content"
                    id="content"
                    placeholder="Комментарий"
                    value={commentContent}
                    onChange={e => setCommentContent(e.target.value)}
                />
                <span className="error">{commentErrors.content ? commentErrors.content[0] : ""}</span>
                <div className="button send-comment-btn" onClick={sendComment}>Отправить</div>
            </form>
            <div className="block-title">Комментарии</div>
            <div>
                {
                    comments.map(comment => <CommentView comment={comment} />)
                }
                {
                    commentsLink != null ? (
                        <div className="upload-more button" onClick={fetchComments}>
                            Загрузить ещё
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
};
