import {
  PopoverCloseButton,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Button from "../Button";

export default function ProductBuyCard(props) {
  const [price, setPrice] = useState(props.value);
  return (
    <>
      <PopoverCloseButton
        right="5"
        top="5"
        bg="Lightest"
        color="naturalDarkest"
        w="35px"
        h="35px"
        size="md"
        borderRadius="12px"
      />
      <Flex
        justifyContent="center"
        flexDir="column"
        w="full"
        gap="6"
        alignItems="center"
      >
        <Text fontWeight="semibold" fontSize="22px">
          {props.title}
        </Text>
        <InputGroup
          w="200px"
          whiteSpace="normal"
          justifyContent="center"
          alignItems="center"
        >
          <InputLeftElement
            color="white"
            fontSize="1.8em"
            bg="primary"
            h="52px"
            w="54px"
            borderRightRadius="12px"
            borderLeft="none"
            children={"+"}
            onClick={() => setPrice(price + 1)}
          />
          <Input
            dir="rtl"
            h="52px"
            w="200px"
            border="1px solid"
            borderColor="primary"
            textAlign="center"
            color="primary"
            value={price ? price + " ₪" : 0 + " ₪"}
            fontSize="18px"
            borderRadius="12px"
            _hover={{ borderColor: "primary" }}
            placeholder="Enter amount"
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <InputRightElement
            h="52px"
            w="54px"
            fontSize="2em"
            bg="white"
            color="primary"
            children={<Flex w="16px" bg="primary" h="3px"></Flex>}
            borderLeftRadius="12px"
            border="1px solid"
            borderColor="primary"
            borderRight="none"
            onClick={() => price > props.value && setPrice(price - 1)}
          />
        </InputGroup>
        <Flex gap="4" justifyContent="center" alignItems="center">
          <Button
            w="96px"
            h="52px"
            flex="1"
            fontSize="18px"
            onClick={() => {
              props.addNewOffer(price);
            }}
          >
            אישור
          </Button>
          <Button.Secondary
            w="96px"
            h="52px"
            fontSize="18px"
            borderColor="primary"
            border="1px solid"
            color="primary"
            onClick={() => {setPrice(props.value); props.onClose()}}
          >
            ביטול
          </Button.Secondary>
        </Flex>
      </Flex>
    </>
  );
}
