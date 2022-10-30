import { Box } from "@mui/material";
import React, { useState } from "react";
import { Comment } from "../types/feed";

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
            <div key={comment.id}>
              <h6>
                {comment.name} <i>{comment.email}</i>
              </h6>
              <p>{comment.body}</p>
            </div>
          );
        })}
    </>
  );
};

export default Comments;
