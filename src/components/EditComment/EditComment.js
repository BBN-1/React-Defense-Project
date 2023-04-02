import styles from "./EditComment.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as commentService from "../../services/commentService";
import { useNavigate } from "react-router-dom";

const EditComment = () => {
    const [commentText, setCommentText] = useState("");
    const [comment, setComment] = useState({});
    const [anonymous, setAnonymous] = useState(false);
    

    const { commentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const currentComment = await commentService.getOneComment(
                commentId
            );

            setComment(currentComment);
            setCommentText(currentComment.text);
        })();
    }, [commentId]);

    const anonymousHandler = (e) => {
        setAnonymous(e.target.checked);
    };

    const commentHandler = (e) => {
        setCommentText(e.target.value);
    };

    const enterKey = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        commentService.editComment(commentId, {
            ...comment,
            hide: anonymous,
            text: commentText,
        });
        navigate(`/catalog/${comment.quoteId}`);
    };

    return (
        <div className={styles["details-comment-form-container"]}>
            <form
                onSubmit={onSubmit}
                onKeyDown={enterKey}
                className={styles["comment-form"]}
            >
                <label className={styles["comment-label"]} htmlFor="comment">
                    Edit your comment!
                </label>
                <textarea
                    className={styles["comment-textarea"]}
                    name="comment"
                    id=""
                    cols="30"
                    rows="10"
                    onChange={commentHandler}
                    value={commentText}
                ></textarea>
                <div className={styles["anonymous-container"]}>
                    <fieldset>
                        <div>
                            <input
                                type="checkbox"
                                id="anonymous"
                                name="anonymous"
                                unchecked="true"
                                value={anonymous}
                                onChange={anonymousHandler}
                            />
                            <label htmlFor="scales">Hide username!</label>
                        </div>
                    </fieldset>
                </div>
                <button type="submit" className={styles["comment-btn"]}>
                    Send comment!
                </button>
            </form>
        </div>
    );
};

export default EditComment;
