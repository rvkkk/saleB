import { Flex, Image, Text, Box } from "@chakra-ui/react";
import React from "react";

export default function ContactCard(payload) {
  return (
    <Flex
      w="320px"
      borderRadius="16px"
      p="30px 20px"
      dir="rtl"
      h="197px"
      boxShadow="4px 8px 53px rgba(13, 47, 153, 0.09)"
      pb="20px"
      bg="white"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
        <Image src={payload.imageUrl} />
      {payload.phone && <a className="contact" color="naturalBlack" href="tel:972509409200+">{payload.phone}</a>}
      {payload.email && <a className="contact" color="naturalBlack" href="mailto:salebid@salebid.com">{payload.email}</a>}
      {payload.text && <Text color="naturalBlack" fontSize="18px" style={{direction: 'rtl'}}>
        {payload.text}
      </Text>}
    </Flex>
  );
}
