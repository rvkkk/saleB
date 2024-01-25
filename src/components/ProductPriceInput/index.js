import {
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";

export default function ProductPriceInput({ placeholder, value, onChange }) {
  return (
    <InputGroup>
      <InputLeftElement
        color="white"
        fontSize="1.8em"
        bg="primary"
        h="full"
        w="54px"
        borderRightRadius="lg"
        children={"+"}
      />
      <Input
        size="lg"
        borderColor="primary"
        borderWidth="2px"
        textAlign="center"
        value={value}
        fontSize="16px"
        borderRadius="lg"
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
      <InputRightElement
        h="full"
        fontSize="2rem"
        w="54px"
        children={<Image src={process.env.PUBLIC_URL + "/assets/Union.svg"} />}
      />
    </InputGroup>
  );
}
