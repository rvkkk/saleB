import { Box, Flex, Text } from "@chakra-ui/react";
import {
  RadioButtonCheckedIcon,
  RadioButtonOrderIcon,
  RadioButtonUnchecked2Icon,
} from "../Icons";
import React from "react";

export default function Timeline() {
  return (
    <Box w="full" position="relative" h="max">
      <Flex w="full" justifyContent="space-between" gap="2">
        <TimelineItem
          name="הזמנה"
          date="14.12.22"
          hour="17:32"
          complite="yes"
          num="1"
        />
        <TimelineItem
          name="נשלח מהמוכר"
          date="15.12.22"
          hour="09:32"
          complite="now"
          num="2"
        />
        <TimelineItem
          name="יוצא אל ארץ היעד"
          date="15.12.22"
          hour="10:50"
          complite="no"
          num="3"
        />
        <TimelineItem name="הגיע לארץ" date="" hour="" complite="no" num="4"/>
        <TimelineItem name='נאסף ע"י הלקוח' date="" hour="" complite="no" num="5"/>
      </Flex>
    </Box>
  );
}

const TimelineItem = ({ name, date, hour, complite, num }) => {
  return (
    <Box w="full" position="relative">
      <Flex justifyContent="center" alignItems="center">
      {complite === "yes" ? (
        <RadioButtonCheckedIcon w="28px" h="28px"/>
      ) : complite === "now" ? (
        <RadioButtonOrderIcon />
      ) : (
        <RadioButtonUnchecked2Icon />
      )}{num !== "5" && <Box h="4px" w="full" bg={complite === "yes" ? "primary" : "#D0D6DF"}></Box>}
      </Flex>
      <Box pt="10">
        <Text fontWeight="500">{name}</Text>
        <Text color="rgba(145, 146, 157, 0.6)">{date}</Text>
        <Text color="rgba(145, 146, 157, 0.6)">{hour}</Text>
      </Box>
    </Box>
  );
};
