import { Flex, IconButton, Image, Text } from "@chakra-ui/react";
import React from "react";
import { TrashIcon } from "../Icons";
import QuantityInput from "../QuantityInput";

export default function NavCartListItem(props) {
  return (
    <Flex
      justifyContent="space-between"
      gap="4"
      py="23px"
      borderBottom="2px solid"
      borderColor="naturalLight"
      alignItems="center"
      overflow="hidden"
    >
      <Flex gap="4">
        <Image
          border="1px solid"
          borderRadius="12px"
          borderColor="naturalLight"
          w="80px"
          h="100px"
          src={props.images && props.images.length >= 1 ? props.images[0] : ""}
        />
        <Flex flexDir="column" pt="10px" justifyContent="space-between">
          <Flex flexDir="column" gap="2">
            <Text fontWeight="500" fontSize="16px" lineHeight="15.4px" color="naturalBlack">
              {props.title}
            </Text>
            <Text lineHeight="15.4px" fontSize="16px" color="naturalDarkest">
              ₪{props.price}
            </Text>
          </Flex>
          <QuantityInput onChange={(e) => props.onChangeAmount(e)} value={props.amount} limit={props.quantityLeft} />
        </Flex>
      </Flex>

      <IconButton
        bg="transparent"
        size="sm"
        color="naturalDarkest"
        icon={<TrashIcon />}
        onClick={() => props.onDelete()}
      />
    </Flex>
  );
}
