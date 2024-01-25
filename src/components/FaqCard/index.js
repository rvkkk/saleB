import { Flex, Box, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function FaqCard({ imageUrl, text, onClick, icon }) {
  return (
    <Flex
      cursor="pointer"
      w="full"
      _hover={{ boxShadow: "4px 8px 40px rgba(13, 47, 153, 0.15)" }}
      transition="all 0.5s ease"
      h="260px"
      borderRadius="16px"
      p="4"
      py="8"
      pt="12"
      bg="white"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      onClick={onClick}
    >
      <Box h="120px">
        <Image h="120px" src={imageUrl} />
      </Box>
      <Text fontWeight="medium" color="primary" fontSize="18px">
        {text}
      </Text>
    </Flex>
  );
}
