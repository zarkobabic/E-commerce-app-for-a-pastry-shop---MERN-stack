import classes from './CommentContainer.module.css';
import { Link } from "react-router-dom";

function CommentContainer(props){
    return(
        <div className={"flex flex-row flex-center " + classes.commentContainer}>
            <div className={classes.commentContainerLeft}>
                <h3 className={classes.commenter}>{props.commentObj.userName}</h3>
                <br />
                <h4>{props.commentObj.commentDescription}</h4>
            </div>
            <div className={classes.commentContainerRight}>
            </div>
        </div>
    )
    
}

export default CommentContainer;