import type { NextPage } from "next";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Post, Comment } from "../types/feed";
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

  return posts.map((post: Post) => (
    <Box
      key={post.id}
      sx={{
        width: 300,
        height: 300,
      }}
    >
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <Comments comments={post.comments} />
    </Box>
  ));
};

export default Feed;
