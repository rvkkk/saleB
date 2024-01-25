import { useState } from "react";
import {
  Box,
  Grid,
  Spacer,
  Flex,
  Text,
  Image,
  Heading,
  Input,
  Button,
} from "@chakra-ui/react";
import Button2 from "../components/Button";
import React from "react";
import Container from "../components/Container";
import ArticleCard from "../components/ArticleCard";
import Layout from "../components/Layout";
import { routes } from "../routes";
import { searchArticles, getArticles } from "../utils/api/articles";
import { addToMailingList } from "../utils/api/mailingList";
import Loader from "../components/Loader";
import { EmailIcon } from "@chakra-ui/icons";

export default function About() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const createNewMailingList = () => {
    if (email !== "") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (emailRegex.test(email)) {
        setError("");
        addToMailingList(email)
          .then((res) => setEmail(""))
          .catch((err) => console.log(err));
      } else setError("אנא הכנס כתובת מייל תקינה");
    }
   else setError("אנא הכנס כתובת מייל תקינה");
  };

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box dir="rtl" bg="white" py="10">
            <Container>
              <Flex
                w="full"
                alignItems="center"
                gap="10"
                justifyContent="center"
              >
                <Box flex="1">
                  <Image w="full" src={process.env.PUBLIC_URL + "/assets/man-stats.png"} />
                </Box>
                <Box flex="1">
                  <Flex flexDir="column" gap="4" width="58%">
                    <Text color="primary" fontSize="14px" fontWeight="bold">
                      {" "}
                      הבידול שלנו{" "}
                    </Text>
                    <Text color="primaryDark" fontSize="36px" fontWeight="bold">
                      שוק עולמי מקוון המאפשר מסחר מקומי ובינלאומי
                    </Text>
                    <Text color="naturalDarkest" fontSize="18px">
                      שוק המסחר לעסקים קטנים עד גדולים המציע מיליוני פריטים
                      ומכירות פומביות שוק המסחר לעסקים קטנים עד גדולים המציע
                      מיליוני פריטים ומכירות פומביות
                    </Text>
                    <Flex alignItems="center" gap="5">
                      <Button2 w="120px" href={routes.CreateProduct.path}>
                        בוא נתחיל
                      </Button2>
                      <Button
                        w="200px"
                        display="flex"
                        gap="6"
                        p="20px 40px"
                        minH="52px"
                        borderRadius="12px"
                        borderColor="primary"
                        variant="outline"
                        bg="white"
                        textColor="primary"
                        onClick={() =>
                          (window.location.href = "/article/howToStartASale")
                        }
                      >
                        איך לפתוח מכירה
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Box bg="aboutColor">
            <Spacer h="100px" />
            <Box mx="10%">
              <Heading dir="rtl" fontSize="32px" fontWeight="medium">
                עיין במאמרי עזרה
              </Heading>
              <br />
              <Grid gridTemplateColumns="1fr 1fr 1fr" gap="4" dir="rtl">
                <ArticleCard
                  text="חשבון"
                  imageUrl={process.env.PUBLIC_URL + "/assets/19.png"}
                  onClick={() =>
                    (window.location.href = "/article/6549020abdebf997ba25fb4d")
                  }
                ></ArticleCard>
                <ArticleCard
                  text="מכירות"
                  imageUrl={process.env.PUBLIC_URL + "/assets/12.png"}
                  onClick={() => (window.location.href = "/article/sales")}
                ></ArticleCard>
                <ArticleCard
                  text="קנייה"
                  imageUrl={process.env.PUBLIC_URL + "/assets/2.png"}
                  onClick={() => (window.location.href = "/article/buy")}
                ></ArticleCard>
                <ArticleCard
                  text="עמלות וחיובים"
                  imageUrl={process.env.PUBLIC_URL + "/assets/35.png"}
                  onClick={() => (window.location.href = "/article/")}
                ></ArticleCard>
                <ArticleCard
                  text="משלוחים"
                  imageUrl={process.env.PUBLIC_URL + "/assets/11.png"}
                  onClick={() => (window.location.href = "/article/shipping")}
                ></ArticleCard>
                <ArticleCard
                  text="החזרות"
                  imageUrl={process.env.PUBLIC_URL + "/assets/49.png"}
                  onClick={() => (window.location.href = "/article/returns")}
                ></ArticleCard>
              </Grid>
            </Box>
            <Spacer h="100px" />
          </Box>
          <Box py="10" bg="aboutColor2">
            <Flex
              flexDir="column"
              alignItems="center"
              textAlign="center"
              gap="10"
              py="10"
              bg="primary"
              w="820px"
              mx="auto"
              borderRadius="3xl"
            >
              <Flex flexDir="column">
                <Heading fontSize="44px" color="white">
                  !להישאר מעודכן
                </Heading>
                <Text color="white" fontSize="22px">
                  קבל חדשות על מבצעים, קופונים ומתנות מפנקות, ישר לתיבת המייל
                  שלך
                </Text>
              </Flex>
              <Flex w="70%" alignItems="center" flexDir="column" gap="2">
                <Flex
                  dir="rtl"
                  w="100%"
                  alignItems="center"
                  bg="white"
                  p="2"
                  borderRadius="2xl"
                >
                  <Input
                    color="naturalDarkest"
                    border="none"
                    _active={{ border: "none" }}
                    _focus={{ border: "none", ring: "none" }}
                    placeholder="כתובת המייל שלכם"
                    type="email"
                    value={email}
                    onBlur={(e) => setEmail(e.target.value)}
                  />
                  <Box
                  cursor="pointer"
                    bg="primary"
                    h="full"
                    p="1"
                    px="3"
                    borderRadius="xl"
                    color="white"
                    fontSize="20px"
                    onClick={() => createNewMailingList()}
                  >
                    <EmailIcon />
                  </Box>
                </Flex>
                <Text color="white" fontSize="14px" fontWeight="light">
                  {error}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </>
      )}
    </Layout>
  );
}
