import { Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { StarFullSmallIcon, StarShopIcon } from "../Icons";

export default function ProductBanner() {
  return (
    <>
      <Flex
        display={{ base: "none", md: "flex" }}
        mx="10%"
        dir="rtl"
        justifyContent="space-between"
        gap={{md: "5", lg: "10"}}
        bg="grayGreen"
        p="4"
        borderRadius="16px"
      >
        <Flex alignItems="center" gap="8">
          <Image w="45px" src="/assets/user.png" />
          <Text fontWeight="semibold" fontSize="18px" color="primary">
            All_Store59
          </Text>
        </Flex>

        <Flex alignItems="center" gap="4" color="naturalDark" fontSize="20px">
        <Flex alignItems="center" gap="2px">
              <StarFullSmallIcon />
              <Text>4.8</Text>
          </Flex>
          <Divider w="4px" h="4px" bg="naturalDark" borderRadius="full" />
          <Flex gap="2">
            <Text>+2.9k</Text>
            <Text>מכירות</Text>
          </Flex>
          <Divider w="4px" h="4px" bg="naturalDark" borderRadius="full" />
          <Flex gap="2">
            <Text>97%</Text>
            <Text>משוב חיובי</Text>
          </Flex>
          <Divider
            display={{ md: "none", lg: "block" }}
            w="4px"
            h="4px"
            bg="naturalDark"
            borderRadius="full"
          />
          <Flex
            display={{ md: "none", lg: "flex" }}
            alignItems="center"
            gap="2"
          >
            <Image w="18.16" src={process.env.PUBLIC_URL + "/assets/comment-icon.png"} />
            <Text>צור קשר</Text>
          </Flex>
        </Flex>

        <Button
          display={{ md: "none", xl: "flex" }}
          variant="outline"
          gap="3"
          borderColor="primary"
          color="primary"
        >
          <Image w="24px" src={process.env.PUBLIC_URL + "/assets/Shop.png"} /> לחנות המוכר
        </Button>
      </Flex>

      <Flex display={{ base: "flex", md: "none" }} dir="rtl" gap="2">
        <Image w="40px" h="40px" src="/assets/user.png" />
        <Flex flexDir="column" py="3px">
          <Text fontSize="12px" color="naturalDark">
            All_Store59
          </Text>
          <Flex
            alignItems="center"
            gap="6px"
            color="naturalDark"
            fontSize="11px"
            lineHeight="16px"
          >
            <Flex alignItems="center" gap="2px">
              <StarShopIcon />
              <Text>4.8</Text>
            </Flex>
            <Divider w="4px" h="4px" bg="naturalDark" borderRadius="full" />
            <Flex gap="2px">
              <Text>+2.9k</Text>
              <Text>מכירות</Text>
            </Flex>
            <Divider w="4px" h="4px" bg="naturalDark" borderRadius="full" />
            <Flex gap="2px">
              <Text>97%</Text>
              <Text>משוב חיובי</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
