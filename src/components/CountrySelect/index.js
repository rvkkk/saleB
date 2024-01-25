import {
  Box,
  Flex,
  Text,
  Button as ChakraButton,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Button from "../Button";
import { Icon5, IsraelIcon, USAIcon, FranceIcon, BrazilIcon, ShekelIcon, DolarlIcon, EuroIcon } from "../Icons";

export default function CountrySelect(props) {
  const [country, setCountry] = useState(props.website.country || "Israel");
  const [language, setLanguage] = useState(props.website.language || "עברית");
  const [coin, setCoin] = useState(props.website.coin || "שקל");

  return (
    <Flex flexDir="column" justifyContent="space-between" h="full" bg="white">
      <Box>
      <FormLabel color="naturalDarkest" fontSize="12px" fontWeight="normal" mb="0">
        שלח אל
      </FormLabel>
      <Menu direction="ltr">
        <MenuButton
          h="44px"
          w="full"
          as={ChakraButton}
          bg="white"
          borderRadius="10px"
          border="1px solid"
          borderColor="naturalLight"
          _hover={{ bg: "white", color: "primary" }}
          _active={{ bg: "white" }}
          _focus={{ bg: "white" }}
          textColor="naturalDarkest"
          p="2"
        >
          <Flex dir="ltr" justifyContent="space-between" alignItems="center" pr="2">
            <Flex gap="2" alignItems="center">
              {country === "Israel" ? <IsraelIcon /> : country === "USA" ? <USAIcon /> : country === "France" ? <FranceIcon /> : <BrazilIcon />}
              <Text fontWeight="normal">{country}</Text>
            </Flex>
            <Icon5 fill="#4F5162" />
          </Flex>
        </MenuButton>
        <MenuList borderColor="naturalLight" dir="ltr" w="224px" p="6px" borderRadius="8px">
          <MenuItem bg="white" borderRadius="6px" color="naturalDarkest" onClick={() => setCountry("Israel")} _hover={{bg: "othersLight", color: "primary"}} >
            <Flex
              color="naturalDrakest"
              gap="2"
              h="44px"
              w="full"
              alignItems="center"
            >
              <IsraelIcon />
              <Text fontSize="16px">Israel</Text>
            </Flex>
          </MenuItem>
          <MenuItem bg="white" borderRadius="6px" color="naturalDarkest" onClick={() => setCountry("USA")} _hover={{bg: "othersLight", color: "primary"}} >
            <Flex
              color="naturalDrakest"
              gap="2"
              h="44px"
              alignItems="center"
            >
              <USAIcon />
              <Text fontSize="16px">USA</Text>
            </Flex>
          </MenuItem>
          <MenuItem bg="white" borderRadius="6px" color="naturalDarkest" onClick={() => setCountry("France")} _hover={{bg: "othersLight", color: "primary"}} >
            <Flex
              color="naturalDrakest"
              gap="2"
              h="44px"
              alignItems="center"
            >
              <FranceIcon />
              <Text fontSize="16px">France</Text>
            </Flex>
          </MenuItem>
          <MenuItem bg="white" borderRadius="6px" color="naturalDarkest" onClick={() => setCountry("Brazil")} _hover={{bg: "othersLight", color: "primary"}} >
            <Flex
              color="naturalDrakest"
              gap="2"
              h="44px"
              alignItems="center"
            >
              <BrazilIcon />
              <Text fontSize="16px">Brazil</Text>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
      </Box>
      <Flex gap="3">
        <Box w="full">
        <FormLabel color="naturalDarkest" fontSize="12px" fontWeight="normal" mb="0">
          שפה
        </FormLabel>
        <Menu direction="ltr">
          <MenuButton
            h="44px"
            w="full"
            as={ChakraButton}
            bg="white"
            borderRadius="10px"
            border="1px solid"
            borderColor="naturalLight"
            _hover={{ bg: "white", color: "primary" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            textColor="naturalDarkest"
            p="2"
          >
            <Flex dir="ltr" justifyContent="space-between" px="2">
              <Text fontWeight="normal">{language}</Text>
              <Icon5 fill="#4F5162" />
            </Flex>
          </MenuButton>
          <MenuList borderColor="naturalLight" dir="ltr" w="106px" p="6px">
            <MenuItem bg="white" borderRadius="6px" color="naturalDarkest" onClick={() => setLanguage("עברית")} _hover={{bg: "othersLight", color: "primary"}} >
              <Flex
                color="naturalDrakest"
                h="44px"
                alignItems="center"
              >
                <Text fontSize="14px">עברית</Text>
              </Flex>
            </MenuItem>
            <MenuItem bg="white" borderRadius="6px" color="naturalDarkest" onClick={() => setLanguage("English")} _hover={{bg: "othersLight", color: "primary"}} >
              <Flex
                color="naturalDrakest"
                h="44px"
                alignItems="center"
              >
                <Text fontSize="14px">English</Text>
              </Flex>
            </MenuItem>
            <MenuItem  bg="white" borderRadius="6px" color="naturalDarkest" onClick={() => setLanguage("español")} _hover={{bg: "othersLight", color: "primary"}} >
              <Flex
                color="naturalDrakest"
                h="44px"
                alignItems="center"
              >
                <Text fontSize="14px">español</Text>
              </Flex>
            </MenuItem>
            <MenuItem bg="white" borderRadius="6px" color="naturalDarkest" onClick={() => setLanguage("Русский")} _hover={{bg: "othersLight", color: "primary"}} >
              <Flex
                color="naturalDrakest"
                h="44px"
                alignItems="center"
              >
                <Text fontSize="14px">Русский</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
        </Box>
        <Box w="full">
        <FormLabel color="naturalDarkest" fontSize="12px" fontWeight="normal" mb="0">
          מטבע
        </FormLabel>
        <Menu placement="bottom-start" direction="ltr" matchWidth={true}>
          <MenuButton
            h="44px"
            w="full"
            as={ChakraButton}
            bg="white"
            borderRadius="10px"
            border="1px solid"
            borderColor="naturalLight"
            _hover={{ bg: "white", color: "primary" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            textColor="naturalDarkest"
            p="2"
          >
            <Flex dir="ltr" justifyContent="space-between" px="2">
              <Text fontWeight="normal">{coin}</Text>
              <Icon5 fill="#4F5162" />
            </Flex>
          </MenuButton>
          <MenuList borderColor="naturalLight" dir="ltr" w="106px" p="6px">
            <MenuItem bg="white" borderRadius="6px" color="naturalDarkest" onClick={() => setCoin("שקל")} _hover={{bg: "othersLight", color: "primary"}} >
            <Flex
              gap="2"
              h="44px"
              alignItems="center"
            >
              <ShekelIcon />
              <Text fontSize="16px">שקל</Text>
            </Flex>
            </MenuItem>
            <MenuItem bg="white" color="naturalDarkest" borderRadius="6px" onClick={() => setCoin("USD")} _hover={{bg: "othersLight", color: "primary"}} >
              <Flex
                h="44px"
                gap="2"
                alignItems="center"
              >
                <DolarlIcon />
                <Text fontSize="14px">USD</Text>
              </Flex>
            </MenuItem>
            <MenuItem bg="white" borderRadius="6px" color="naturalDarkest" onClick={() => setCoin("Euro")} _hover={{bg: "othersLight", color: "primary"}} >
              <Flex
                h="44px"
                gap="2"
                alignItems="center"
              >
                <EuroIcon />
                <Text fontSize="14px">Euro</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
        </Box>
      </Flex>
      <Button.Secondary onClick={() => window.localStorage.setItem("website", {country, language, coin})} borderColor="primary" w="full" h="43px">
        שמור
      </Button.Secondary>
    </Flex>
  );
}
