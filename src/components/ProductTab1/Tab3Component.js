import { Box, Divider, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";

export default function Tab3Component({ shippingCost, deliveryTime}) {
  return (
    <Box w={{base: "100%", md: "60%"}} dir="rtl">
      <Box pb="4" w={{base: "100%", md: "90%"}}>
        <Text fontSize={{base: "14px", md: "16px"}} lineHeight={{base: "18px", md: "22px"}}>
          המוצרים נשלחים על ידי קמעונאי SaleBid הפרטיים, הממוקמים ברחבי העולם.
          זמני האספקה ומחירי המשלוח משתנים בהתאם למיקום הקמעונאי, למדינת היעד ולשיטת המשלוח שנבחרה.
          <Text as="span" textColor="primary">
            &nbsp; הצג את פרטי המשלוח המלאים &nbsp;
          </Text>
        </Text>
      </Box>
      <Divider h="2px" bg="Gray30" />
      <Flex flexDir="column" py="4" gap="14px">
        <Text fontSize={{base: "16px", md: "20px"}} lineHeight="22px" fontWeight="medium">
          שילוח תוך {deliveryTime} ימים
        </Text>
        <UnorderedList>
          <ListItem fontSize={{base: "14px", md: "16px"}} lineHeight={{base: "18px", md: "22px"}}>
            עלות המשלוח: {shippingCost}
          </ListItem>
        </UnorderedList>
        <Text fontSize={{base: "14px", md: "16px"}} lineHeight={{base: "18px", md: "22px"}}>נשלח מבריטניה</Text>
      </Flex>

      <Divider h="2px" bg="Gray30" />

      <Box py="4">
        <Text fontSize={{base: "14px", md: "16px"}} lineHeight={{base: "18px", md: "22px"}}>
          אנו עושים כמיטב יכולתנו להבטיח שהמוצרים שאתם מזמינים יישלחו אליכם
          במלואם ובהתאם למפרט שלכם. עם זאת, אם תקבלו הזמנה חלקית, או פריטים
          שונים מאלו שהזמנתם, או שיש סיבה אחרת לכך שאינכם מרוצים מההזמנה,
          באפשרותכם להחזיר את ההזמנה, או כל אחד מהמוצרים הכלולים בהזמנה, ולקבל
          החזר מלא עבור הפריטים.  
          <Text as="span" color="primary">&nbsp; הצג מדיניות ההחזרים המלאה &nbsp;</Text>
        </Text>
      </Box>
    </Box>
  );
}
