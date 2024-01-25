import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  Flex,
  IconButton,
  Image,
  Input,
  Spacer,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";
import Button from "../components/Button";
import {
  BoxIcon,
  CalenderIcon,
  CopyIcon,
  MapPointIcon,
  RoutingIcon,
} from "../components/Icons";
import Layout from "../components/Layout";
import Timeline from "../components/Timeline";
import TrackerInfo from "../components/TrackerInfo";
import { useEffect, useState } from "react";
/*import { getOrder } from "../utils/api/orders";
import {
  getOrderOrdersTracking,
  getOrderTracking,
} from "../utils/api/orderTrackings";*/
import { turnLettersToNumbers } from "../utils/serial";
import Loader from "../components/Loader";

export default function UserSettingsDeliveryTraker() {
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(true);
  const [orderTrackings, setOrderTrackings] = useState([]);
  const [order, setOrder] = useState({});
  const [orderNumber, setOrderNumber] = useState("");

  const getDateIn20Days = (date) => {
    const today = new Date(date);
    const futureDate = new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000);
    const months = [
      "ינואר",
      "פברואר",
      "מרץ",
      "אפריל",
      "מאי",
      "יוני",
      "יולי",
      "אוגוסט",
      "ספטמבר",
      "אוקטובר",
      "נובמבר",
      "דצמבר",
    ];
    const day = futureDate.getDate();
    const month = months[futureDate.getMonth()];
    const year = futureDate.getFullYear();
    return `${day} ${month}, ${year}`;
  };
  const findOrder = () => {
    setDataFetched(false);
    //setOrder(orders.find((o) => o._id === orderNumber));
  };

  useEffect(() => {
    setLoading(false)
    /*if (!dataFetched) {
      setLoading(true);
      getOrder(orderNumber)
        .then((res) => {
          setOrder(res.order);
          getOrderOrdersTracking(orderNumber).then((resp) => {
            console.log(resp);
            setOrderTrackings(resp.orderTrackings);
            setLoading(false);
            setDataFetched(true);
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setDataFetched(true);
        });
    }*/
  }, [dataFetched]);

  return (
    <Layout withSidebar>
      <Box py="20" dir="rtl" ml="15%">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="32px" lineHeight="20px" fontWeight="medium" color="naturalBlack">
            מעקב משלוחים
          </Text>
        </Flex>
        <Spacer h="5" />
        <Box
          h="200px"
          borderRadius="20px"
          w="full"
          bg="cardBg"
          mx="auto"
          maxW="1160px"
          position="relative"
        >
          <Image
            position="absolute"
            w="full"
            h="full"
            borderRadius="30px"
            right="0"
            src={process.env.PUBLIC_URL + "/assets/GIF.png"}
          />
          <Flex
            borderRadius="12px"
            w="400px" //522
            h="64px" //64
            position="absolute"
            bottom="0px"
            dir="rtl"
            alignItems="center"
            left="50%"
            transform="translate(-50%, 50%)"
          >
            <Input
              h="full"
              fontSize="16px"
              placeholder="הכנס מספר הזמנה"
              borderColor="rgba(13, 47, 153, 0.09)"
              borderLeftRadius="0px"
              borderRightRadius="12px"
              bg="white"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
            <IconButton
              bg="searchBg"
              textColor="white"
              h="full"
              fontSize="21px" //32px
              w="64px"
              borderLeftRadius="12px"
              borderRightRadius="0px"
              icon={<Search2Icon />}
              onClick={() => findOrder()}
            />
          </Flex>
        </Box>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Spacer h="135px" />
            <Timeline />
            {order.order && (
              <>
                <Box
                  h="121px"
                  w="full"
                  maxW="1160px"
                  bg="rgba(208, 214, 223, 0.25)"
                  borderRadius="20px"
                  p="20px 40px"
                >
                  <Flex justifyContent="space-between" gap="4">
                    <TrackerInfo title="מספר מעקב" icon={<BoxIcon />}>
                      <Button.TextButton p="0" py="0" w="max" h="max">
                        <Flex fontSize="18px" color="primary" gap="2">
                          <Text>
                            {turnLettersToNumbers(order.order.id.toString())}
                          </Text>
                          <CopyIcon />
                        </Flex>
                      </Button.TextButton>
                    </TrackerInfo>
                    <TrackerInfo title="מוצא" icon={<RoutingIcon />}>
                      <Text>{order.order.from}מחסני סייל ביד</Text>
                      <Text>{order.order.country}ישראל</Text>
                    </TrackerInfo>
                    <TrackerInfo title="יעד" icon={<MapPointIcon />}>
                      <Text>
                        {order.user.street}, {order.user.city}
                      </Text>
                      <Text>{order.user.country}</Text>
                    </TrackerInfo>
                    <TrackerInfo title="הגעה משוערת" icon={<CalenderIcon />}>
                      <Text>{getDateIn20Days(order.createdAt)}</Text>
                    </TrackerInfo>
                  </Flex>
                </Box>
                <Spacer h="20" />

                <Spacer h="20" />
                <Timeline />
                <Spacer h="20" />
                <Card
                  p="40px"
                  bg="white"
                  borderRadius="12px"
                  shadow="none"
                  border="none"
                >
                  <TableContainer>
                    <Table variant="simple" p="40px">
                      <Thead>
                        <Tr>
                          <Th
                            color="naturalDarkest"
                            fontSize="14px"
                            fontWeight="500"
                          >
                            תאריך
                          </Th>
                          <Th
                            color="naturalDarkest"
                            fontSize="14px"
                            fontWeight="500"
                          >
                            מיקום
                          </Th>
                          <Th
                            color="naturalDarkest"
                            isNumeric
                            fontSize="14px"
                            fontWeight="500"
                          >
                            מצב
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody fontSize="18px" color="naturalDark">
                        {orderTrackings ? (
                          <>
                            {orderTrackings.map((d) => {
                              return (
                                <Tr>
                                  <Td>
                                    {d.createdAt}
                                    {" - "}
                                    {d.hour}
                                  </Td>
                                  <Td>{d.place}</Td>
                                  <Td isNumeric>
                                    <Text
                                      fontWeight="500"
                                      color="naturalDarkest"
                                    >
                                      {d.status}
                                    </Text>
                                    <Text fontSize="14px">{d.description}</Text>
                                    <Text fontSize="14px">
                                      {d.deliveryNumber ? "מספר מעקב: " : ""}
                                      {d.deliveryNumber}
                                    </Text>
                                  </Td>
                                </Tr>
                              );
                            })}{" "}
                          </>
                        ) : (
                          ""
                        )}
                        <Tr>
                          <Td>14/12/22 - 17:32</Td>
                          <Td>בדרך</Td>
                          <Td isNumeric>
                            <Text fontWeight="500" color="naturalDarkest">
                              נשלח
                            </Text>
                            <Text fontSize="14px">פיקס שליחויות</Text>
                            <Text fontSize="14px">מספר מעקב: FS45439850YX</Text>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>14/12/22 - 17:32</Td>
                          <Td>אנגליה</Td>
                          <Td isNumeric>
                            <Text fontWeight="500" color="naturalDarkest">
                              מוכן
                            </Text>
                            <Text fontSize="14px">ממתין לשליחות</Text>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>14/12/22 - 17:32</Td>
                          <Td>אנגליה</Td>
                          <Td isNumeric>
                            <Text fontWeight="500" color="naturalDarkest">
                              הזמנה
                            </Text>
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Card>
              </>
            )}
          </>
        )}
      </Box>
    </Layout>
  );
}
