import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { TrashIcon } from "../components/Icons";
import Layout from "../components/Layout";
import Order from "../components/Order";
import {
  getUserOrders,
  deleteAllOrders,
  deleteOrder,
} from "../utils/api/orders";
import {
  sortOpenOrders,
  sortInProcessOrders,
  sortCloseOrders,
  lastHalfYearOrders,
} from "../utils/sort";
import Loader from "../components/Loader";

export default function UserSettingsMyOrders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
      setLoading(true);
      getUserOrders().then((res) => {
        console.log(res)
        setOrders(res.orders);
        setGallery(res.orders);
        setLoading(false);
      });
  }, []);

  const deleteAll = () => {
    setLoading(true);
    deleteAllOrders()
      .then((res) => {
        setOrders([]);
        setGallery([]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Layout withSidebar>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box py="20" ml="15%">
            <Flex alignItems="center" justifyContent="space-between">
              <Text
                fontSize="32px"
                lineHeight="20px"
                fontWeight="medium"
                color="naturalBlack"
              >
                ההזמנות שלי
              </Text>

              <Menu>
                <MenuButton
                  as={Button}
                  bg="transparent"
                  h="56px"
                  w="110px"
                  _active={{ bg: "white" }}
                  _focus={{ bg: "white" }}
                  _hover={{ bg: "white" }}
                  border="1px solid transparent"
                  borderColor="bright"
                >
                  <Flex
                    gap="4"
                    py="2"
                    alignItems="center"
                    h="full"
                    justifyContent="center"
                  >
                    <Image w="24px" src={process.env.PUBLIC_URL + "/assets/filter.svg"} />
                    <Text fontSize="18px" color="naturalDark">
                      סינון
                    </Text>
                  </Flex>
                </MenuButton>
                <MenuList
                  dir="rtl"
                  fontSize="14px"
                  border="none"
                  shadow="lg"
                  p="2"
                  py="4"
                >
                  <MenuItem
                    onClick={() => {
                      setGallery(sortCloseOrders(orders));
                      setSortBy("closeOrders");
                    }}
                    borderRadius={sortBy === "closeOrders" && "lg"}
                    bg={sortBy === "closeOrders" && "othersLight"}
                    color={sortBy === "closeOrders" && "primary"}
                    fontSize="14px"
                    lineHeight="16.5px"
                  >
                    הזמנות שהסתיימו
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setGallery(lastHalfYearOrders(orders));
                      setSortBy("lastHalfYearOrders");
                    }}
                    borderRadius={sortBy === "lastHalfYearOrders" && "lg"}
                    bg={sortBy === "lastHalfYearOrders" && "othersLight"}
                    color={sortBy === "lastHalfYearOrders" && "primary"}
                    fontSize="14px"
                    lineHeight="16.5px"
                  >
                    הזמנות מלפני חצי שנה
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setGallery(sortInProcessOrders(orders));
                      setSortBy("inProcessOrders");
                    }}
                    borderRadius={sortBy === "sortInProcessOrders" && "popular"}
                    bg={sortBy === "inProcessOrders" && "popular"}
                    color={sortBy === "inProcessOrders" && "popular"}
                    fontSize="14px"
                    lineHeight="16.5px"
                  >
                    הזמנות שבדרך
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setGallery(sortOpenOrders(orders));
                      setSortBy("openOrders");
                    }}
                    borderRadius={sortBy === "openOrders" && "lg"}
                    bg={sortBy === "openOrders" && "othersLight"}
                    color={sortBy === "openOrders" && "primary"}
                    fontSize="14px"
                    lineHeight="16.5px"
                  >
                    הזמנות פתוחות
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            {gallery.length > 0 ? (
              <>
                <Flex flexDir="column" gap="4" mt="8">
                  {gallery.map((order) => {
                    return (
                      <Order
                        data={order}
                        badge={order.status}
                        badgeColor={
                          order.status === "סגור"
                            ? "secendaryDarkest"
                            : order.status === "פתוח"
                            ? "threeDark"
                            : "naturalDarkest"
                        }
                        badgeBg={
                          order.status === "סגור"
                            ? "secendaryLightest"
                            : order.status === "פתוח"
                            ? "threeLight"
                            : "bright"
                        }
                        onDelete={() => {
                          const a = window.confirm(
                            "האם אתה בטוח שברצונך למחוק פריט זה מהרשימה?"
                          );
                          if (a) {
                            deleteOrder(order._id)
                              .then((res) => {
                                console.log(res);
                                setOrders(
                                  orders.filter((o) => o._id !== order._id)
                                );
                                window.location.reload();
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }
                        }}
                      />
                    );
                  })}
                </Flex>
                <Spacer h="20" />
                <Flex justifyContent="end">
                  <Button.TextButton
                    color="naturalBlack"
                    onClick={() => deleteAll()}
                    fontSize="16px"
                    lineHeight="18px"
                  >
                    <TrashIcon fill="#23263B" />
                    מחק הכל
                  </Button.TextButton>
                </Flex>
              </>
            ) : (
              <Flex alignItems="center" justifyContent="start">
                <Text fontSize="24px" fontWeight="light" color="naturalDarkest">
                 אין לך עדיין הזמנות
                </Text>
              </Flex>
            )}
          </Box>
        </>
      )}
    </Layout>
  );
}
