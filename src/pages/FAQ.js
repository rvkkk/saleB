import { useState, useEffect } from "react";
import { Box, Flex, Grid, Spacer, Heading } from "@chakra-ui/react";
import React from "react";
import Container from "../components/Container";
import FaqQuestion from "../components/FaqQuestion";
import FaqSearchBanner from "../components/FaqSearchBanner";
import Layout from "../components/Layout";
import { routes } from "../routes";
import { searchArticles, getArticles } from "../utils/api/articles";
import Loader from "../components/Loader";
import FaqCard from "../components/FaqCard";

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    searchArticles(search)
      .then((res) => {
        setArticles(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const breadcrumb = [
    { name: "דף הבית", href: routes.HOME.path },
    { name: "עזרה", href: routes.About.path },
    { name: "שירות לקוחות", href: routes.FAQ.path },
  ];

  useEffect(() => {
    if (articles.length <= 0) {
      setLoading(true);
      getArticles()
        .then((res) => {
          setArticles(res.articles.slice(0, 6));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, []);

  return (
    <Layout breadcrumb={breadcrumb}>
      <FaqSearchBanner
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
      />
      <Spacer h="135px" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Flex justifyContent="center">
              <Grid w="1280px" gridTemplateColumns="1fr 1fr" gap="30px" dir="rtl">
                {articles &&
                  articles.length >= 1 &&
                  articles.map((article, index) => {
                    return (
                      <FaqQuestion
                        key={index}
                        title={article.title}
                        desc={"מאמר פופלרי"} //article.description}
                        onClick={() =>
                          (window.location.href =
                            routes.Article.path.replace(":id", "") + article._id.toString())
                        }
                      />
                    );
                  })}
                <br />
                <br />
              </Grid>
            </Flex>
            </Container>
          <Flex bg="#F7F8FA" py="130px" justifyContent="center">
            <Box w="1280px">
              <Heading dir="rtl" fontSize="24">עיין במאמרי עזרה</Heading>
              <br/>
              <Grid gridTemplateColumns="1fr 1fr 1fr" gap="4" dir="rtl">
                <FaqCard
                  text="חשבון"
                  imageUrl={process.env.PUBLIC_URL + "/assets/19.png"}
                  onClick={() => (window.location.href = "/article/account")}
                ></FaqCard>
                <FaqCard
                  text="מכירות"
                  imageUrl={process.env.PUBLIC_URL + "/assets/12.png"}
                  onClick={() => (window.location.href = "/article/sales")}
                ></FaqCard>
                <FaqCard
                  text="קנייה"
                  imageUrl={process.env.PUBLIC_URL + "/assets/2.png"}
                  onClick={() => (window.location.href = "/article/buy")}
                ></FaqCard>
                <FaqCard
                  text="עמלות וחיובים"
                  imageUrl={process.env.PUBLIC_URL + "/assets/35.png"}
                  onClick={() => (window.location.href = "/article/")}
                ></FaqCard>
                <FaqCard
                  text="משלוחים"
                  imageUrl={process.env.PUBLIC_URL + "/assets/11.png"}
                  onClick={() => (window.location.href = "/article/shipping")}
                ></FaqCard>
                <FaqCard
                  text="החזרות"
                  imageUrl={process.env.PUBLIC_URL + "/assets/49.png"}
                  onClick={() => (window.location.href = "/article/returns")}
                ></FaqCard>
              </Grid>
            </Box>
          </Flex>
        </>
      )}
    </Layout>
  );
}
