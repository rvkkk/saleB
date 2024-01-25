import React, { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import Input from "../Input";

export default function FaqSearchBanner(props) {
  return (
    <Box
      h="274px"
      borderRadius="30px"
      w="90%"
      bg="cardBg"
      mx="auto"
      maxW="1808px"
      position="relative"
    >
      <Image
        position="absolute"
        maxW="1143.76px"
        h="full"
        borderRightRadius="30px"
        right="0"
        src={process.env.PUBLIC_URL + "/assets/fag_banner.png"}
      />
      <Flex
        justifyContent="center"
        alignItems="center"
        position="relative"
        w="full"
        dir="rtl"
        h="full"
      >
        <Text
          fontSize="38px"
          fontWeight="500"
          letterSpacing="0.02em"
          lineHeight="18.6px"
          textAlign="center"
          color="primary"
        >
          איך נוכל לעזור לך היום?
        </Text>
      </Flex>

      <Input
        dir="rtl"
        w="800px"
        h="64px"
        //position="absolute"
        //bottom="0px"
        placeholder="חפש שאלה...."
        borderRadius="8px"
        left="50%"
        transform="translate(-50%, -60%)"
        onChange={(e) => props.setSearch(e.target.value)}
        question={
          <IconButton
            bg="searchBg"
            textColor="white"
            h="62px"
            fontSize="21px"
            w="62px"
            mr="737px"
            transform="translate(0, -62%)"
            borderRightRadius="0px"
            borderRadius="7px"
            _hover={{ bg: "rgba(255, 18, 87, 1)" }}
            onClick={() => props.handleSearch()}
            icon={<Search2Icon />}
          />
        }
        value={props.search}
      />
    </Box>
  );
}
