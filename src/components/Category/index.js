import {
  Box,
  //Grid,
  Spacer,
  Image,
  Flex,
  Text,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { routes } from "../../routes";
import Container from "../Container";
import { Navigation, Pagination, Autoplay, Grid } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
/*import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Grid } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';*/
import Button from "../Button";
import { getCategories } from "../../utils/api/categories"
import 'swiper/css/grid';

export default function Category(props) {
  const [categories, setCategories] = useState([]);
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
  const swiper = useSwiper();
 
  useEffect(() => {
    console.log(swiper);
    getCategories().then((res)=> setCategories(res.categories))
  }, [])

  return (
    <Container>
      <Heading my={{base: "30px", md: "40px"}} textAlign="center" color="primaryLight">
        הקטגוריות המובילות
      </Heading>
      <Box
        w={{
          base: "326px",
          sm: "392px",
          md: "648px",
          lg: "860px",
          xl: "1200px",
          "2xl": "1300px",
        }}
        mx="auto"
        //h="500px"
      >
        <Swiper
        //height={"220px"}
        //className="categoriesS"
        dir="rtl"
          spaceBetween={16} // רווח בין פריטי הסליידר
          slidesPerView={3} 
 //slidesPerColumn={2} 
  //slidesPerGroup={2}
        //  slidesPerColumnFill="row" 
         grid={{
          rows: 3,
          fill: "row"
        }}
        loop={false}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Autoplay]}
          //slidesPerColumnFill="row"
          //grabCursor={true}
          //modules={[Grid, Pagination]}
          breakpoints={{
            // התאמת התצוגה למסכים שונים
            1280: {
              slidesPerView: 6,
              spaceBetween: 20,
              grid: {
                rows: 2,
                fill: "row"
              }
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 16,
              grid: {
                rows: 2,
                fill: "row"
              }
            },
          }}
          keyboard={{
            enabled: true,
          }}
          mousewheel={true}
          //navigation // הפעלת כפתורי הניווט
          autoplay={{ delay: 2500,  disableOnInteraction: false }}
        >
          {categories[0] && categories.map((category, index) => (
            <SwiperSlide dir="ltr" key={index}>
              <CategoryItem
                index={index}
                onClick={() => {
                  window.location.href = `${routes.Category.path.replace(
                    ":category",
                    ""
                  )}${category.title}`;
                }}
                name={category.name}
                imgUrl={category.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
     {/* <Button onClick={() => swiper.slideNext()}></Button>*/}
    </Container>
  );
}

export const CategoryItem = ({
  name = "ארכיאולוגיה",
  imgUrl = {},
  onClick,
  index,
}) => {
  return (
    <Flex
      display={{ base: index < 9 ? "flex" : "none", md: "flex" }}
      mx="auto"
      w={{
        base: "98px",
        sm: "120px",
        md: "150px",
        lg: "180px",
        "2xl": "200px",
      }}
      h={{base: "140px", sm: "150px", md: "202px", lg: "235.5px", "2xl": "255.5px"}}
      cursor={"pointer"}
      onClick={() => onClick()}
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      gap={{ base: "18px", md: "28px" }}
      //my="20px"
    >
      <Box
        className="category_img"
        w={{
          base: "90px",
          sm: "100px",
          md: "130px",
          lg: "150px",
          "2xl": "170px",
        }}
        h={{
          base: "90px",
          sm: "100px",
          md: "130px",
          lg: "150px",
          "2xl": "170px",
        }}
      >
        <Image className="img" src={imgUrl}></Image>
      </Box>
      <Text fontSize={{base: "16px", lg: "18.5px"}} textAlign="center">{name}</Text>
    </Flex>
  );
};

/*<Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        //infiniteLoop
        centerMode
        centerSlidePercentage={12}
        //autoPlay
        //stopOnHover
        emulateTouch
        interval={5000}
        swipeable
      >
        {[...Array(Math.ceil(c.length / 12))].map((_, rowIndex) => (
          <Grid
            key={rowIndex}
            templateColumns={{
              base: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              xl: "repeat(6, 2fr)",
            }}
            gap={{ base: "16px", lg: "20px" }}
            justifyContent="center"
          >
            {c.slice(rowIndex * 12, rowIndex * 12 + 10).map((category, index) => (
              <CategoryItem
                key={index}
                onClick={() =>
                  (window.location.href =
                    routes.Category.path.replace(":category", "") + category.title)
                }
                name={category.name}
                imgUrl={category.image}
              />
            ))}
          </Grid>
        ))}
      </Carousel>
    </Container>
   /* <Container>
      <Heading mt="30px" textAlign="center" color="primaryLight">הקטגוריות המובילות</Heading>
      <Grid my="20px"
        w={{ base: "326px", sm: "392px", md: "648px", lg: "860px", xl: "1180px", "2xl": "1300px"}}
        mx="auto"
        gridTemplateColumns={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)", xl: "repeat(6, 1fr)" }}
        flexWrap="wrap"
        rowGap={{ base: "31px", lg: "44px" }}
        columnGap={{ base: "16px", lg: "20px" }}     
        py={{ base: "20px", lg: "40px" }}
      >
        {props.categories[0] &&
          c.slice(0, 12).map((category, index) => {
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
        </Container>*/
      