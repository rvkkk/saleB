import { Box, Grid, Spacer, Image, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { routes } from "../../routes";
import Container from "../Container";

export default function Category(props) {
  const c = [
    { title: "food", name: "אוכל" },
    { title: "food", name: "אספנות" },
    { title: "food", name: "תכשיטים" },
    { title: "food", name: "ציורי שמן" },
    { title: "food", name: "משחקים" },
    { title: "food", name: "ספורט" },
    { title: "food", name: "ספרים" },
    { title: "food", name: "בגדים" },
    { title: "food", name: "נעליים" },
    { title: "food", name: "תשמישי קדושה" },
    { title: "food", name: "עתיקות" },
    { title: "food", name: "ריהוט" },
    { title: "food", name: "שעונים" },
    { title: "food", name: "שבת" },
  ];
  return (
    <Container>
      <Grid my="20px"
        w={{ base: "326px", sm: "392px", md: "648px", lg: "860px", xl: "1180px", "2xl": "1300px"}}
        mx="auto"
        gridTemplateColumns={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)", xl: "repeat(6, 1fr)" }}
        flexWrap="wrap"
        rowGap={{ base: "31px", lg: "44px" }}
        columnGap={{ base: "16px", lg: "20px" }}     
        py={{ base: "20px", lg: "40px" }}
      >
        {props.categories &&
          props.categories.slice(0, 12).map((category, index) => {
            return (
              <CategoryItem
              key={index}
              index={index}
                onClick={() =>
                  (window.location.href =
                    routes.Category.path.replace(":category", "") +
                    category.title)
                }
                name={category.name}
                imgUrl={category.image}
              />
            );
          })}
      </Grid>
    </Container>
  );
}

export const CategoryItem = ({
  name = "ארכיאולוגיה",
  imgUrl = {},
  onClick,
  index
}) => {
  return (
   <Flex
      display={{base: index < 9 ? "flex" : "none", md: "flex"}}
      mx="auto"
      w={{ base: "98px", sm: "120px", md: "150px", lg: "180px", "2xl": "200px" }}
      cursor={"pointer"}
      onClick={() => onClick()}
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      gap={{base: "18px", md: "28px"}}
    >
      <Box 
      className="category_img"
      w={{ base: "90px", sm: "100px", md: "130px", lg: "150px", "2xl": "170px" }}
      h={{ base: "90px", sm:"100px", md: "130px", lg: "150px", "2xl": "170px" }}
      >
        <Image className="img" src={`data:${imgUrl.contentType};base64,${imgUrl.data}`}></Image>
      </Box>
      <Text textAlign="center">{name}</Text>
    </Flex>
  );
};
