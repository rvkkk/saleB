import { Box, Image, Spacer } from "@chakra-ui/react";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ImageGallery({ images = [] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box>
      <Box w={{md: "320px", lg: "400px", xl:"500px"}}>
        <Swiper
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Thumbs]}
        >
          {images.map((image, key) => {
            return (
              <SwiperSlide key={key} className="w-full">
                <Image h={{md: "320px", lg: "400px", xl:"500px"}} borderRadius="20px" w="full" src={image} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Spacer h="4" />
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {images.map((image, key) => {
            return (
              <SwiperSlide key={key}>
                <Image borderRadius="16px" w={{md: "92px", xl: "145px"}}
                 h={{md: "85px", xl: "130px"}} src={image} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
}
