import { Box, Grid, Spacer, Text } from "@chakra-ui/react";
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
      <Grid
        w={{ base: "326px", sm: "392px", md: "648px", lg: "860px", xl: "1275px", "2xl": "1455px"}}
        mx="auto"
        gridTemplateColumns={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)", xl: "repeat(6, 1fr)" }}
        flexWrap="wrap"
        rowGap={{ base: "23px", lg: "36px" }}
        columnGap={{ base: "16px", lg: "20px", xl:"15px" }}     
        py={{ base: "20px", lg: "40px" }}
      >
        {props.categories &&
          c.slice(0, 12).map((category, index) => {
            return (
              <CategoryItem
              key={index}
                onClick={() =>
                  (window.location.href =
                    routes.Category.path.replace(":category", "") +
                    category.title)
                }
                name={category.name}
                //imgUrl={category.image}
              />
            );
          })}
      </Grid>
    </Container>
  );
}

export const CategoryItem = ({
  name = "ארכיאולוגיה",
  //imgUrl = "",
  onClick,
  index
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };
  return (
    <Box
      display={{base: index < 9 ? "block" : "none", md: "block"}}
      mx="auto"
      w={{ base: "98px", sm: "120px", md: "150px", lg: "200px", "2xl": "230px" }}
      cursor={"pointer"}
      onClick={() => onClick()}
    >
      <Box
        w={{ base: "98px", sm: "120px", md: "150px", lg: "200px", "2xl": "230px" }}
        h={{ base: "98px", sm:"120px", md: "150px", lg: "200px", "2xl": "230px" }}
        borderRadius="full"
        border="1px solid transparent"
        borderColor="naturalLight"
        //position="absolute"
        p={{ base: "3px", sm: "8px", lg: "4" }}
        //id="categorySqure"
        _hover={{ border: "none" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        
        
      >
        {isMouseOver ? (
          <Box
            w="full"
            //transform="translate(100%,0)"
            border="1px solid #0D2F99"
            borderRadius="full"
            h="full"
            transition="all .2s linear"
            //transition= "opacity .1s , border-width .4s"
            bg="disabled"
          />
        ) : (
          <Box
            boxShadow="outline 0 0 0 1px #0D2F99"
            w="full"
            border="none"
            borderRadius="full"
            h="full"
            bg="disabled"
          />
        )}
      </Box>
      <Spacer h="2" />
      <Text textAlign="center">{name}</Text>
    </Box>
  );
};

/*<Box
        w={{ base: "98px", sm: "120px", md: "150px", lg: "200px", "2xl": "230px" }}
        h={{ base: "98px", sm:"120px", md: "150px", lg: "200px", "2xl": "230px" }}
        borderRadius="full"
        border="1px solid transparent"
        borderColor="naturalLight"
        p={{ base: "3px", sm: "8px", lg: "4" }}
        //id="categorySqure"
        //_hover={{ border: "none" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        
        
      >
        {isMouseOver ? (
          <Box
            w="full"
            //transform="translate(100%,0)"
            border="1px solid #0D2F99"
            borderRadius="full"
            h="full"
            transition="all .2s linear"
            //transition= "opacity .1s , border-width .4s"
            bg="disabled"
          />
        ) : (
          <Box
            boxShadow="outline 0 0 0 1px #0D2F99"
            w="full"
            border="none"
            borderRadius="full"
            h="full"
            bg="disabled"
          />
        )}
      </Box>*/