import React, { useState, useEffect } from "react";
import { getArticle } from "../utils/api/articles";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import {
  Box,
  Spacer,
  Text,
  Heading,
} from "@chakra-ui/react";

export default function Article() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    setLoading(true);
    let id = window.location.href.split("/").pop().split("/")[0]
    getArticle(id)
      .then((res) => {
        setTitle(res.article.title);
        setDescription(res.article.description);
        setContent(res.article.content);
        setIcon(res.article.content);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box justifyContent="center" dir="rtl" bg="white" py="10">
            <Heading color="primary">{title}</Heading>
            <Spacer h="10"></Spacer>
            <Text color="primaryDark" fontSize="25px" fontWeight="medium">
              {description}
            </Text>
            <Spacer h="15"></Spacer>
            <Text color="naturalDarkest" fontSize="16px">
              {content}
            </Text>
          </Box>
        </>
      )}
    </Layout>
  );
}
