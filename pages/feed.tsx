import type { NextPage } from "next";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Post } from "../types/feed";
import Comments from "../components/comments";

const Feed: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await (
        await fetch("https://jsonplaceholder.typicode.com/posts")
      ).json();

      return data;
    };

    const fetchComments = async (postId: number) => {
      const data = await (
        await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        )
      ).json();

      return data;
    };

    fetchPosts().then(async (posts) => {
      const postsWithComments = await Promise.all(
        posts.map(async (post: Post) => {
          const commentsData = await fetchComments(post.id);
          return { ...post, comments: [...(await commentsData)] };
        })
      );

      setPosts(postsWithComments);
    });
  }, []);

  return (
    <Box alignItems="center" justifyContent="center">
      {posts.map((post: Post) => (
        <div key={post.id}>
          <h3>
            <b>{post.title}</b>
          </h3>
          <p>{post.body}</p>
          <Comments comments={post.comments} />
        </div>
      ))}
      ;
    </Box>
  );
};

export default Feed;
