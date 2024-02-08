import {
  Flex,
  Link,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Icon5, SearchIcon } from "../Icons";
import React, { useState, useEffect } from "react";
import { routes } from "../../routes";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function SearchComponent(props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(props.query);
  }, [props.query]);
  return (
    <Flex dir="rtl">
      <Menu>
        <MenuButton>
          <Flex
            role="menu"
            aria-label="see links to products"
            borderRadius="0px"
            borderRightRadius="12px"
            w="50px"
            h="50px"
            bg="primaryDark"
            color="white"
            fontSize="30px"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: "primaryDark" }}
            _active={{ bg: "primaryDark" }}
            _focus={{ bg: "primaryDark" }}
            gap="1"
          >
            <ChevronDownIcon />
          </Flex>
        </MenuButton>
        <MenuList
          dir="rtl"
          p="20px 10px"
          bg="white"
          fontWeight="bold"
          borderRadius="12px"
          shadow="0px 1px 54px rgba(35, 38, 59, 0.2)"
        >
          <MenuItemComponent
            path={routes.LOGIN.path}//דף מכירות פומביות
            name="מוצרי מכירה פומבית"
          />
          <MenuItemComponent path={routes.LOGIN.path} name="מוצרים רגילים" />
          <MenuItemComponent path={routes.LOGIN.path} name="לכל סוגי המוצרים" />
        </MenuList>
      </Menu>

      <Input
        placeholder="אני מחפש..."
        border="none"
        h="50px"
        borderRadius="0"
        bg="white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton
        aria-label="search"
        role="button"
        h="50px"
        minW="50px"
        borderRadius="12px"
        bgGradient="linear(to-r, #FF66A9, #F53689)"
        _hover={{ bgGradient: "linear(to-r, #F53689, #F53689)" }}
        borderRightRadius="0"
        icon={<SearchIcon />}
        onClick={() => (window.location.href = "/category?query=" + query)}
      />
    </Flex>
  );
}

const MenuItemComponent = ({ path, name }) => {
  const [active, setActive] = useState(false);

  return (
    <Link to={path} aria-label="link to products" role="link" style={{ textDecoration: "none" }}>
      <MenuItem
        borderRadius="8px"
        bg={active ? "othersLight" : "white"}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        color="naturalDark"
        h="44px"
      >
        <Text
          textColor={active ? "primary" : "naturalDark"}
          fontSize="14px"
          fontWeight="500"
        >
          {name}
        </Text>
      </MenuItem>
    </Link>
  );
};
