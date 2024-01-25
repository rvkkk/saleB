import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { CircularProgress } from "@chakra-ui/react";
export default function Loader(props) {
  return (
    <Box w="100%" h="100%" p="4" bg="othersLight">
      <div
        class="center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CircularProgress isIndeterminate color="primary" />
        <Text
          fontWeight="500"
          fontSize="20"
          color="primary"
          ml="0"
          mt="5"
          dir="rtl"
        >
          טוען...
        </Text>
      </div>
    </Box>
  );
}
