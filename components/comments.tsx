import React, { useEffect, useState } from "react";
import { Post, Comment } from "../types/feed";

const Comments = ({ comments }: { comments: Comment[] }) => {
  const [expanded, setExpanded] = useState(false);
  const clickHandler = () => {
    setExpanded(!expanded);
    console.log(expanded);
  };

  return (
    <>
      <h5 onClick={clickHandler}>comments: {comments.length}</h5>
      {expanded &&
        comments.map((comment) => {
          return (
            <div>
              <h5>{comment.name}</h5>;<p>{comment.body}</p>
            </div>
          );
        })}
    </>
  );
};

export default Comments;
