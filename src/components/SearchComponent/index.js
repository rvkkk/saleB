import { SearchIcon } from "@chakra-ui/icons";
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
import { Icon5 } from "../Icons";
import React, { useState, useEffect } from "react";
import { routes } from "../../routes";

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
            borderRadius="0px"
            borderRightRadius="8px"
            w="110px"
            h="40px"
            bg="primaryDark"
            color="white"
            fontSize="18px"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: "primaryDark" }}
            _active={{ bg: "primaryDark" }}
            _focus={{ bg: "primaryDark" }}
            gap="1"
          >
            <Text>מחלקות</Text>
            <Icon5 />
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
          <MenuItemComponent path={routes.LOGIN.path} name="יודאיקה" />
          <MenuItemComponent path={routes.LOGIN.path} name="אומנות" />
          <MenuItemComponent path={routes.LOGIN.path} name="צילום" />
          <MenuItemComponent path={routes.LOGIN.path} name="ספורט" />
          <MenuItemComponent path={routes.LOGIN.path} name="תכשיטים" />
        </MenuList>
      </Menu>

      <Input
        placeholder="אני מחפש..."
        border="none"
        borderRadius="0"
        bg="white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton
        bg="secondaryColor"
        textColor="white"
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
    <Link to={path} style={{ textDecoration: "none" }}>
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
