import {
  Box,
  Flex,
  IconButton,
  Button,
  Image,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import React, { useState } from "react";
import Container from "../Container";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { routes } from "../../routes";
import {
  IsraelIcon,
  USAIcon,
  FranceIcon,
  BrazilIcon,
  ShekelIcon,
  DolarlIcon,
  EuroIcon,
} from "../Icons";

export default function Footer() {
  const [country, setCountry] = useState("Israel");
  const [language, setLanguage] = useState("עברית");
  const [coin, setCoin] = useState("שקל");

  const link1 = [
    { name: "לבית ולמשרד", path: "" },
    { name: "מוצרי חשמל", path: "" },
    { name: "אספנות", path: "" },
    { name: "טיפוח", path: "" },
  ];
  const link2 = [
    { name: "אודות", path: routes.About.path },
    { name: "צור קשר", path: routes.ContactUs.path },
    { name: "תקנון האתר", path: routes.Regulations.path },
    { name: "מעקב הזמנות", path: "" },
  ];

  /*const breakpoints = {
    base: "0px",
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };
  
  const theme = extendTheme({ breakpoints });*/
  return (
    <Box bg="primaryDark" dir="rtl">
      <Container>
        <Flex py="10" px="3" justifyContent="space-between">
          <Flex gap="20" pr={{ base: "4.9%", md: "0" }}>
            <Flex gap="20">
              <NavLinks title="מפת האתר" links={link2} />
              <NavLinks title="קטגוריות ראשיות" links={link1} />
            </Flex>
            <Info />
          </Flex>
          <Box display={{ base: "none", md: "flex" }}>
            <Image
              w="100px"
              h="100px"
              src={process.env.PUBLIC_URL + "/assets/LOGO CUBE.png"}
            />
          </Box>
        </Flex>
        <Box
          py="4"
          px="3"
          borderTop={{ md: "0.5px solid rgba(255,255,255, 0.2)" }}
        >
          <Flex
            textColor="white"
            justifyContent="space-between"
            alignItems="center"
            display={{ base: "none", md: "flex" }}
          >
            <Flex dir="ltr" alignItems="center" gap="2">
              <Text fontSize="15px">Follow us:</Text>
              <Flex>
                <IconButton
                  w="21px"
                  bg="transparent"
                  cursor="pointer"
                  onClick=""
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  icon={<FaWhatsapp color="white" />}
                />
                <IconButton
                  w="20px"
                  bg="transparent"
                  cursor="pointer"
                  onClick=""
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  icon={<FaInstagram color="white" />}
                />
                <IconButton
                  w="12px"
                  bg="transparent"
                  cursor="pointer"
                  onClick=""
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  icon={<FaFacebookF color="white" />}
                />
                <IconButton
                  w="19px"
                  bg="transparent"
                  cursor="pointer"
                  onClick=""
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  icon={<FaTelegramPlane color="white" />}
                />
              </Flex>
            </Flex>
            <Flex dir="ltr" gap="8">
              <Image
                w="30.61px"
                src={process.env.PUBLIC_URL + "/assets/webmoney.svg"}
              />
              <Image
                w="52px"
                src={process.env.PUBLIC_URL + "/assets/ApplePay.svg"}
              />
              <Image
                w="40px"
                src={process.env.PUBLIC_URL + "/assets/Mastercard.svg"}
              />
              <Image
                w="49px"
                src={process.env.PUBLIC_URL + "/assets/visa-logo.svg"}
              />
              <Image
                w="60.34px"
                src={process.env.PUBLIC_URL + "/assets/paypal.svg"}
              />
            </Flex>
            <Text dir="ltr" fontSize="15px">
              © SaleBid SoferGroup. Safed, israel 2023
            </Text>
          </Flex>

          <Flex px="20px" flexDir="column" gap="30px" display={{ md: "none" }}>
            <Flex justifyContent="center" gap="10">
              <Menu direction="rtl">
                <MenuButton
                  as={Button}
                  borderRadius="28px"
                  border="1px solid"
                  borderColor="naturalLight"
                  bg="primaryDark"
                  _hover={{ bg: "primary" }}
                  _active={{ bg: "primary" }}
                  _focus={{ bg: "primary" }}
                  textColor="white"
                  w="100px"
                  dir="rtl"
                >
                  <Flex gap="2" alignItems="center">
                    <Text fontWeight="normal">ישראל</Text>
                    <IsraelIcon />
                  </Flex>
                </MenuButton>
                <MenuList
                  borderColor="naturalLight"
                  dir="ltr"
                  w="224px"
                  p="6px"
                  borderRadius="8px"
                >
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setCountry("Israel")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
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
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setCountry("USA")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
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
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setCountry("France")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
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
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setCountry("Brazil")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
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
              <Menu direction="rtl">
                <MenuButton
                  as={Button}
                  borderRadius="28px"
                  border="1px solid"
                  borderColor="naturalLight"
                  bg="primaryDark"
                  _hover={{ bg: "primary" }}
                  _active={{ bg: "primary" }}
                  _focus={{ bg: "primary" }}
                  textColor="white"
                  w="100px"
                  dir="rtl"
                >
                  <Flex alignItems="center" justifyContent="center">
                    <Text fontWeight="normal">עברית</Text>
                  </Flex>
                </MenuButton>
                <MenuList
                  borderColor="naturalLight"
                  dir="ltr"
                  w="106px"
                  p="6px"
                >
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setLanguage("עברית")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex color="naturalDrakest" h="44px" alignItems="center">
                      <Text fontSize="14px">עברית</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setLanguage("English")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex color="naturalDrakest" h="44px" alignItems="center">
                      <Text fontSize="14px">English</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setLanguage("español")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex color="naturalDrakest" h="44px" alignItems="center">
                      <Text fontSize="14px">español</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setLanguage("Русский")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex color="naturalDrakest" h="44px" alignItems="center">
                      <Text fontSize="14px">Русский</Text>
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu direction="rtl">
                <MenuButton
                  as={Button}
                  borderRadius="28px"
                  border="1px solid"
                  borderColor="naturalLight"
                  bg="primaryDark"
                  _hover={{ bg: "primary" }}
                  _active={{ bg: "primary" }}
                  _focus={{ bg: "primary" }}
                  textColor="white"
                  w="100px"
                  dir="rtl"
                >
                  <Flex alignItems="center" justifyContent="center">
                    <Text fontWeight="normal">שקל</Text>
                  </Flex>
                </MenuButton>
                <MenuList
                  borderColor="naturalLight"
                  dir="ltr"
                  w="106px"
                  p="6px"
                >
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setCoin("שקל")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex gap="2" h="44px" alignItems="center">
                      <ShekelIcon />
                      <Text fontSize="16px">שקל</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    color="naturalDarkest"
                    borderRadius="6px"
                    onClick={() => setCoin("USD")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex h="44px" gap="2" alignItems="center">
                      <DolarlIcon />
                      <Text fontSize="14px">USD</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setCoin("Euro")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex h="44px" gap="2" alignItems="center">
                      <EuroIcon />
                      <Text fontSize="14px">Euro</Text>
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Flex
              py="40px"
              gap={{ base: "20px", sm: "40px" }}
              justifyContent="center"
            >
              <Flex gap="3" w="230px" flexDir="column">
                <Flex dir="ltr" gap="3">
                  <Image
                    w="52px"
                    src={process.env.PUBLIC_URL + "/assets/ApplePay.svg"}
                  />
                  <Image
                    w="40px"
                    src={process.env.PUBLIC_URL + "/assets/Mastercard.svg"}
                  />
                  <Image
                    w="49px"
                    src={process.env.PUBLIC_URL + "/assets/visa-logo.svg"}
                  />
                  <Image
                    w="60.34px"
                    src={process.env.PUBLIC_URL + "/assets/paypal.svg"}
                  />
                </Flex>
                <Flex dir="ltr" justifyContent="center" alignItems="center">
                  <Box h="1px" bg="white" w="50px"></Box>
                  <IconButton
                    w="21px"
                    bg="transparent"
                    cursor="pointer"
                    onClick=""
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    icon={<FaWhatsapp color="white" />}
                  />
                  <IconButton
                    w="20px"
                    bg="transparent"
                    cursor="pointer"
                    onClick=""
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    icon={<FaInstagram color="white" />}
                  />
                  <IconButton
                    w="12px"
                    bg="transparent"
                    cursor="pointer"
                    onClick=""
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    icon={<FaFacebookF color="white" />}
                  />
                  <IconButton
                    w="19px"
                    bg="transparent"
                    cursor="pointer"
                    onClick=""
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    icon={<FaTelegramPlane color="white" />}
                  />
                  <Box h="1px" bg="white" w="50px"></Box>
                </Flex>
              </Flex>

              <Flex justifyContent="center" alignItems="center">
                <Image
                  w="75px"
                  h="75px"
                  src={process.env.PUBLIC_URL + "/assets/LOGO CUBE.png"}
                />
              </Flex>
            </Flex>
            <Flex
              justifyContent="center"
              alignItems="center"
              fontWeight="normal"
              color="white"
              dir="ltr"
              fontSize="12px"
              lineHeight="15px"
            >
              © SaleBid SoferGroup. Safed, israel 2023
            </Flex>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}

const NavLinks = ({ links = [], title }) => {
  return (
    <Flex flexDir="column" gap="4" dir="rtl">
      <Text fontSize="15px" fontWeight="medium" textColor="white">
        {title}
      </Text>
      <Flex flexDirection="column">
        {links.map((link, key) => {
          return (
            <Link
              key={key}
              textColor="rgba(255,255,255,0.6)"
              fontSize="15"
              fontWeight="light"
              href={link.path}
            >
              {link.name}
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

const Info = () => {
  return (
    <Flex
      flexDir="column"
      gap="4"
      dir="rtl"
      id="footer"
      display={{ base: "none", sm: "flex" }}
    >
      <Text fontSize="15px" fontWeight="medium" textColor="white">
        דברו איתנו
      </Text>
      <Flex
        flexDirection="column"
        textColor="rgba(255,255,255,0.6)" //white
        // maxW="170px"
        fontSize="15"
        fontWeight="light"
      >
        <Text>
          טלפון: <a href="tel:1700-505-500">1700-505-500</a>
        </Text>
        <Text>ירושלים 14, צפת ישראל</Text>
        <Text>
          שעות פעילות א-ה: <br /> 10:00 - 18:00
        </Text>
        <Text>
          מייל: <a href="mailto:salebid@salebid.com">salebid@salebid.com</a>
        </Text>
      </Flex>
    </Flex>
  );
};
