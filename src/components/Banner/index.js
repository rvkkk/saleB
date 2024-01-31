import { Box, Image } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";

export default function Banner() {
  const [index, setIndex] = useState(0);
  const images = [
    'image1.jpg',
    'image2.jpg', 
    'image3.jpg'
  ];

  const previous = () => {
    setIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  }
  
  const next = () => {  
    setIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1  
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Box
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
    </Box>
  );
}
