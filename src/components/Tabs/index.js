import React from "react";
import {
  Tab as ChakraTab,
  Tabs as ChakraTabs,
  TabPanel as ChakraTabPanel,
  TabPanels as ChakraTabPanels,
  TabList as ChakraTabList,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import Container from "../Container";
import { CartCheckIcon } from "../Icons";
export default function Tabs({ tabs = [], tabIndex, setTabIndex }) {
  return (
    <ChakraTabs
      index={tabIndex}
      variant="unstyled"
      colorScheme="green"
    >
      <Container>
        <Box py="10" dir="rtl">
          <ChakraTabList justifyContent="center">
            {tabs.map((tab, index) => {
              return (
                <>
                  <ChakraTab
                    //onClick={() => {if(tabIndex > index) setTabIndex(index)}}
                  >
                    <TabComponent
                      active={tabIndex === index}
                      index={index}
                      activeIndex={tabIndex}
                      name={tab.name}
                      icon={tab.icon}
                      imgUrl={tab.imgUrl}
                    />
                  </ChakraTab>
                  {index !== tabs.length - 1 && (index === tabIndex || index < tabIndex ? <TabDivider bg="primaryLight"/> : <TabDivider bg="naturalLight"/>)}
                </>
              );
            })}
          </ChakraTabList>
          <ChakraTabPanels>
            {tabs.map((tab) => {
              const Component = () => tab.component;
              return (
                <ChakraTabPanel>
                  <Component />
                </ChakraTabPanel>
              );
            })}
          </ChakraTabPanels>
        </Box>
      </Container>
    </ChakraTabs>
  );
}

const TabComponent = ({ name, index, active, icon, activeIndex }) => {
  const Icon = icon;
  let checked = index < activeIndex;

  return (
    <Flex flexDir="column" alignItems="center" gap="2">
      <Flex
        w="65px"
        h="65px"
        justifyContent="center"
        alignItems="center"
        borderRadius="full"
        bg={active ? "primaryLightest" : "Lightest"}
      >
        {!checked && (
          <>{Icon && <Icon fill={active ? "#0738D2" : "#D3D4D8"} />}</>
        )}

        {checked && (
          <Flex
            justifyContent="center"
            alignItems="center"
            bg="primaryLight"
            w="full"
            h="full"
            borderRadius="full"
            color="white"
          >
            <CartCheckIcon />
          </Flex>
        )}
      </Flex>
      <Text fontSize="14px" color="naturalDarkest">
        {name}
      </Text>
    </Flex>
  );
};

const TabDivider = ({bg}) => {
  return (
    <Flex h="85px" alignItems="center" justifyContent="center">
      <Box bg={bg} w="32px" h="1px"/>
    </Flex>
  );
};
