import { Flex,Image, Text } from "@chakra-ui/react";
import React from "react";

export default function SignUpLayout({ children }) {
  return (
    <Flex h="100vh" dir="rtl" position="relative">
      <Flex h="full" w="36%" maxW="620px" bg="primary">
        <Flex w="full" direction="column" mt="30%" alignItems="center">
            <Image w="100px" h="100px" src={process.env.PUBLIC_URL + "/assets/LOGO CUBE 2.png"}/>
          <Text fontSize="38px" fontWeight="semibold" textColor="#FFFFFF">ברוך הבא</Text>
        </Flex>
      </Flex>
    <Image
     position="absolute"
        maxH="540px"
          maxW="900px"
          bottom={0}
          objectFit="cover"
          src={process.env.PUBLIC_URL + "/assets/67 new 1.png"}
  />
      <Flex flex="1" h="full" justifyContent="center" alignItems="center" overflowY="auto" py="20">
        {children}
      </Flex>
    </Flex>
  );
}