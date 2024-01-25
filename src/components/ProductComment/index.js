import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Rating from "../Rating";

export default function ProductComment({
  name,
  commentDetails,
  comment,
  commentText,
  images = [],
  rating,
}) {

  return (
    <Flex
      flexDirection="column"
      gap="4"
      px="2"
      pt="8"
      pb="4"
      borderBottom="2px solid transparent"
      borderColor="Gray30"
    >
      <Flex justifyContent="space-between">
        <Flex alignItems="center" gap="2">
          <Image src={process.env.PUBLIC_URL + "/assets/user.png"} />
          <Box>
            <Text fontWeight="semibold">{name}</Text>
            <Text fontSize="14px" color="naturalDark">
              {commentDetails}
            </Text>
          </Box>
        </Flex>

        <Rating dir="ltr" rate={rating} />
      </Flex>

      <Box>
        <Text fontWeight="semibold" color="naturalDarkest">
          {comment}
        </Text>
        <Text fontSize="14px" color="naturalDark">
          {commentText}
        </Text>
      </Box>
      {images.length > 0 && (
        <Flex gap="2">
          {images.map((image) => {
            if (
              image ===
              "blob:http://localhost:9000/844849a7-4ad8-4588-8a72-798384cea17d"
            ) {
              const urlObject = new URL(image);
              const afterSlash = urlObject.pathname;
              console.log(afterSlash);
              return (
                <Image
                  borderRadius="6px"
                  w="56px"
                  h="70px"
                  objectFit="cover"
                  src={afterSlash}
                />
              );
            }
            return (
              <Image
                borderRadius="6px"
                w="56px"
                h="70px"
                objectFit="cover"
                src={image}
              />
            );
          })}
        </Flex>
      )}
    </Flex>
  );
}

/*const ImageComponent = () => {
        const imageRef = useRef("http://localhost:9000/844849a7-4ad8-4588-8");

  useEffect(() => {
    const exportImageToBase64 = () => {
      // משתמשים בקומפוננטה useRef כדי להשיג את הרפרנס של התמונה
      const imageElement = imageRef.current;

      // יצירת Canvas
      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      const context = canvas.getContext('2d');
      context.drawImage(imageElement, 0, 0);

      // המרת התמונה לבסיס 64 בפורמט PNG
      const imageDataURL = canvas.toDataURL('image/png');

      // הצגת התמונה בבסיס 64 בקונסול
      console.log(imageDataURL);
    };

    // קריאה לפונקציה ברגע שהתמונה נטענה
    imageRef.current.addEventListener('load', exportImageToBase64);

    // ניקיון ברגע שהקומפוננטה נסגרת
   /* return () => {
      imageRef.current.removeEventListener('load', exportImageToBase64);
    };
  }, []); // [] כדי לוודא שהקוד יופעל רק פעם אחת לאחר הרנדר הראשון
  return (
    <>
      <Image
        ref={imageRef}
        src="blob:http://localhost:9000/844849a7-4ad8-4588-8"
        alt="Your Image"
      />
    </>
  );
};*/