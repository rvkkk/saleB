import { Box, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import Button from "../Button";
import { TrashIcon, VisaIcon, MasterCardIcon, MasterCard2Icon, AmericanExpressIcon, DinersIcon } from "../Icons";

export default function WalletCard(props) {
  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      w="327px"
      h="182px"
      borderRadius="12px"
      py="4"
      pt="8"
      px="6"
      bg="othersLight"
    >
      <Flex justifyContent="space-between" fontSize="16px" lineHeight="20px">
        <Box>
          <Text fontWeight="medium" color="primary">
            {props.ccNumber.slice(-4)} **** **** ****
          </Text>
          <Text color="naturalDarkest">תוקף: {props.ccExp}</Text>
        </Box>
        {props.ccType === "ויזה" ? <VisaIcon w="48px"/> : props.ccType === "מאסטרכארד" ? <MasterCard2Icon w="48px"/> : props.ccType === "ישראכארט" ? <MasterCardIcon w="48px"/> : props.ccType === "דיינרס" ? <DinersIcon w="48px"/> : <AmericanExpressIcon w="48px"/>}
      </Flex>
      <Spacer h="4" />
      <Flex gap="2" alignItems="center">
        <Button.TextButton fontSize="16px" lineHeight="20px" onClick={() => props.onChangeD()}>
          ערוך
        </Button.TextButton>
       { /*<Button.TextButton fontSize="16px" onClick={() => props.onDelete()}>
          מחק
  </Button.TextButton>*/}
        <IconButton
          w="24px"
          minW="24px"
          h="24px"
          mt="2px"
          borderRadius="6px"
          p="0"
          bg="white"
          onClick={() => props.onDelete()}
          icon={<TrashIcon width="18px" height="18px" fill="#0738D2" />}
        />
      </Flex>
    </Flex>
  );
}
