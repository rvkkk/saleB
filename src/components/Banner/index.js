import { Box, Image, Flex, Text, Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Container from "../Container";
import Button from "../Button";
import { routes } from "../../routes";

export default function Banner() {
  const [index, setIndex] = useState(0);
  const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
  const imageUrl = process.env.PUBLIC_URL + "/assets/בדקה ה90.jpg";

  const previous = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  /*useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);*/
  return (
    <Container>
      <Box
        display={{ base: "none", md: "block" }}
        dir="rtl"
        bgImage={`url('${imageUrl}')`}
        bgSize="cover"
        bgPosition="center"
        color="white"
        textAlign="center"
        mx="10%"
        p="8"
        my="10"
        borderRadius="3xl"
        h="440px"
      >
        <Flex h="full" alignItems="end" justifyContent="space-between" dir="ltr">
          <Flex h="full"  flexDir="column" justifyContent="space-between">
            <Box>
            <Heading textAlign="start" as="h1" size="2xl" pt="10">
              בדקה ה90
            </Heading>
            <Text fontSize="36px" my="2">
              המכירות שעומדות להסתיים
            </Text>
            </Box>
            <Button fontSize="24px" w="180px" href={routes.Category.path.replace(":category", "")}>
              המשך
            </Button>
          </Flex>
          <Image
            w="78px"
            src={process.env.PUBLIC_URL + "/assets/logocube2.svg"}
          />
        </Flex>
      </Box>
    </Container>
    /* <Box
    cursor="pointer"
      w="full"
      h={{ base: "203px", sm: "250px", md: "350px", lg: "420px" }}
    >
      <Image
        display={{ base: "none", md: "block" }}
        w="full"
        h="full"
        objectFit="cover"
        src={process.env.PUBLIC_URL + "/assets/banner1.png"}
      />
      <Image
        display={{ base: "block", md: "none" }}
        w="full"
        h="full"
        objectFit="cover"
        src={process.env.PUBLIC_URL + "/assets/splash screen.png"}
      />
    </Box>*/
  );
}
