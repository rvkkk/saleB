import { Flex, Text, Box } from "@chakra-ui/react";
import React from "react";
import { StarFullSmallIcon } from "../Icons";

export default function Rating({rate, dir ="rtl"}) {
  return (
    <Flex dir={dir} alignItems="center" gap="1">
      <Text fontSize="16px" fontWeight="semibold">{rate}</Text>
      <Box mb="2px"><StarFullSmallIcon/></Box>
    </Flex>
  );
}
