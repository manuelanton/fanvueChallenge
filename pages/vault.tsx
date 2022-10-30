import { ImageList, ImageListItem } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Photo } from "../types/vault";

const Vault: NextPage = () => {
  const [pictures, setPictures] = useState<Photo[]>([]);
  const [fullscreenUrl, setFullscreenUrl] = useState<string>("");

  const clickHandler = (url: string) => {
    if (fullscreenUrl != url) setFullscreenUrl(url);
    else setFullscreenUrl("");
  };

  useEffect(() => {
    const fetchPictures = async () => {
      const data = await (
        await fetch("https://jsonplaceholder.typicode.com/photos")
      ).json();

      setPictures(data);
    };

    fetchPictures();
  }, []);

  return (
    <>
      <Head>
        <title> Fanvue</title>
        <link rel="icon" href="https://www.fanvue.com/logo512.png" />
      </Head>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {pictures.map((picture) => (
          <ImageListItem
            key={picture.id}
            onClick={() => clickHandler(picture.url)}
          >
            <img
              src={`${picture.thumbnailUrl}?w=164&h=164&fit=crop&auto=format`}
              alt={picture.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      {fullscreenUrl && <img src={fullscreenUrl} />}
    </>
  );
};

export default Vault;
