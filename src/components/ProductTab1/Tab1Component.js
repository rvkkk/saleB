import {
  Box,
  Text,
  ListItem,
  UnorderedList,
  Flex,
  Image,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { routes } from "../../routes";

export default function Tab1Component() {
  return (
    <Flex flexDir="column" gap="4" pb="4">
      <Box>
        <Text fontSize={{base: "16px", md: "20px"}} fontWeight="medium" lineHeight="22px" color="naturalBlack">
          תיאור המוצר:
        </Text>
        <UnorderedList fontSize={{base: "14px", md: "16px"}} lineHeight={{base: "20px", md: "26px"}}>
          <ListItem>תצוגה: צג FHD IPS בגודל 14.0 אינץ'</ListItem>
          <ListItem>מעבד: Intel® Core™ i7-1165G7 Quad Core</ListItem>
          <ListItem>זיכרון: 8GB DDR4-3200 SDRAM (1x8GB)</ListItem>
          <ListItem>אחסון: 1TB M.2 SSD PCIe NVMe</ListItem>
          <ListItem>מערכת הפעלה: Windows 10 Pro</ListItem>
        </UnorderedList>
      </Box>
      <Box>
        <Text fontSize={{base: "16px", md: "20px"}} fontWeight="medium" lineHeight="22px" color="naturalBlack">
          מידות ומשקל:
        </Text>
        <UnorderedList fontSize={{base: "14px", md: "16px"}} lineHeight="18px">
          <ListItem>משקל: 1.36 ק"ג</ListItem>
          <ListItem>מידות: 321.30x216.20x17.90. ס"מ</ListItem>
        </UnorderedList>
      </Box>

      <Flex gap="8" fontSize={{base: "14px", md: "16px"}} lineHeight={{base: "20px", md: "18px"}}>
        <Flex gap="2">
          <Text>מותג:</Text>
          <Text color="primary">Jewwwl</Text>
        </Flex>
        <Flex gap="2">
          <Text>קטגוריה:</Text>
          <Text color="primary">תכשיטי יהלומים</Text>
        </Flex>
      </Flex>
      <Flex display={{base: "flex", md: "none"}} alignItems="center" gap="1">
        <Text color="naturalDark" fontSize="14px" lineHeight="22px">
          נתקלתם בבעיה עם מוצר זה?
        </Text>
        <Flex gap="1" w="max" alignItems="center">
          <Image src={process.env.PUBLIC_URL + "/assets/flag.png"} />
          <Link
            fontSize="14px"
            lineHeight="22px"
            href={routes.ContactUs.path}
            textColor="primary"
          >
            דווחו לנו
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
