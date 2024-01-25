import {
  Divider,
  Flex,
  Image,
  Spacer,
  Text,
  Grid,
  Box,
  GridItem,
  useRadioGroup,
  VStack,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import {
  ArrowLeftIcon,
  PayPalIcon,
  PenIcon,
  RefreshIcon,
  TrashIcon,
  VisaIcon,
} from "../Icons";
import Input from "../Input";
import DetailsHeader from "../DetailsHeader";
import DeliveryCheckbox from "../DeliveryCheckbox";
import TextArea from "../TextArea";
import { ChevronRightIcon } from "@chakra-ui/icons";
import QuantityInput from "../QuantityInput";
import { addToCart } from "../../utils/cart";
import { updateCart } from "../../utils/api/carts";
import { getUserDefaultCC } from "../../utils/api/creditCards";
import { getUserDefaultShippingAddress } from "../../utils/api/shippingAddresses";
import CustomRadio from "../CustomRadio";
import CheckBox from "../CheckBox";

export default function Tab2(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [deliveryFirstName, setDeliveryFirstName] = useState("");
  const [deliveryLastName, setDeliveryLastName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryCountry, setDeliveryCountry] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryStreet, setDeliveryStreet] = useState("");
  const [deliveryBuilding, setDeliveryBuilding] = useState("");
  const [deliveryFloor, setDeliveryFloor] = useState("");
  const [deliveryApartment, setDeliveryApartment] = useState("");
  const [deliveryZipCode, setDeliveryZipCode] = useState("");
  const [deliveryType, setDeliveryType] = useState("1");
  const [invalidFirstName, setInvalidFirstName] = useState("");
  const [invalidLastName, setInvalidLastName] = useState("");
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidDFirstName, setDInvalidFirstName] = useState("");
  const [invalidDLastName, setDInvalidLastName] = useState("");
  const [invalidDPhoneNumber, setDInvalidPhoneNumber] = useState("");
  const [invalidCountry, setInvalidCountry] = useState("");
  const [invalidCity, setInvalidCity] = useState("");
  const [invalidStreet, setInvalidStreet] = useState("");
  const [invalidBuilding, setInvalidBuilding] = useState("");
  const [invalidFloor, setInvalidFloor] = useState("");
  const [invalidApartment, setInvalidApartment] = useState("");
  const [invalidZipCode, setInvalidZipCode] = useState("");
  const [notes, setNotes] = useState("");
  const [products, setProducts] = useState(props.products);
  const [saveDeafult, setSaveDeafult] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [userAddress, setUserAdress] = useState({});
  const [userCC, setUserCC] = useState({});
  const token = window.localStorage.getItem("token");
  const discount = props.discount;

  const options = [
    {
      deliveryName: "משלוח להיום",
      deliveryDesc: "למזמינים עד השעה 16:00",
      price: "₪ 45.00",
      priceNum: 45,
      value: "1",
    },
    {
      deliveryName: "נקודת Pickup",
      deliveryDesc: "3-5 ימי עסקים",
      price: "₪ 15.00",
      priceNum: 15,
      value: "2",
    },
    {
      deliveryName: "איסוף עצמי",
      deliveryDesc: "אחרי קבלת אישור ההזמנה באימייל",
      price: "חינם",
      priceNum: 0,
      value: "3",
    },
  ];

  const handleEmailChange = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) setInvalidEmail('כתובת דוא"ל אינה תקינה');
    else setInvalidEmail("");
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    const phoneRegex = /^05\d{1}-?\d{7}$/;
    const phoneHomeRegex = /^0\d{1}-?\d{7}$/;
    if (!phoneRegex.test(phoneNumber) && !phoneHomeRegex.test(phoneNumber))
      setInvalidPhoneNumber("מספר שגוי");
    else setInvalidPhoneNumber("");
  };

  const verifyShippingDetailsAndContinueCheckout = () => {
    if (firstName === "") setInvalidFirstName("שדה חובה");
    if (lastName === "") setInvalidLastName("שדה חובה");
    if (email === "") setInvalidEmail("שדה חובה");
    if (phoneNumber === "") setInvalidPhoneNumber("שדה חובה");
    if (deliveryCountry === "") setInvalidCountry("שדה חובה");
    if (deliveryCity === "") setInvalidCity("שדה חובה");
    if (deliveryStreet === "") setInvalidStreet("שדה חובה");
    if (deliveryBuilding === "") setInvalidBuilding("שדה חובה");
    if (deliveryFloor === "") setInvalidFloor("שדה חובה");
    if (deliveryApartment === "") setInvalidApartment("שדה חובה");
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      phoneNumber !== "" &&
      deliveryCountry !== "" &&
      deliveryCity !== "" &&
      deliveryStreet !== "" &&
      deliveryBuilding !== "" &&
      deliveryFloor !== "" &&
      deliveryApartment !== "" &&
      invalidFirstName === "" &&
      invalidLastName === "" &&
      invalidEmail === "" &&
      invalidPhoneNumber === "" &&
      invalidCountry === "" &&
      invalidCity === "" &&
      invalidStreet === "" &&
      invalidBuilding === "" &&
      invalidFloor === "" &&
      invalidBuilding === "" &&
      invalidApartment === ""
    ) {
      props.setTabIndex(
        2,
        products,
        {
          name: options[deliveryType - 1]["deliveryName"],
          priceNum: options[deliveryType - 1]["priceNum"] || 0,
        },
        {
          details: {
            firstName,
            lastName,
            email,
            phoneNumber,
            companyName,
          },
          delivery: {
            deliveryFirstName,
            deliveryLastName,
            deliveryPhone,
            deliveryCountry,
            deliveryCity,
            deliveryStreet,
            deliveryBuilding,
            deliveryFloor,
            deliveryApartment,
          },
        }
      );
      return;
    } else {
    }
  };

  const removeDecimal = (num) => {
    try {
      return num.toString().split(".")[0];
    } catch (err) {
      return num;
    }
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "1",
  });

  const group = getRootProps();

  const updateAmount = (product, size, model, newAmount, amount) => {
    if (token === null)
      addToCart({ product: product, amount: newAmount - amount, size, model })
        .then((res) => {
          console.log(res);
          setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((p) => {
              if (
                p.product.id === product.id &&
                p.size === size &&
                p.model === model
              ) {
                return { ...p, amount: p.amount + newAmount - amount };
              }
              return p;
            });
            return updatedProducts;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    else
      updateCart({
        productId: product.id,
        size,
        model,
        amount: newAmount - amount,
      })
        .then((res) => {
          console.log(res);
          setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((p) => {
              if (
                p.product.id === product.id &&
                p.size === size &&
                p.model === model
              ) {
                return { ...p, amount: p.amount + newAmount - amount };
              }
              return p;
            });
            return updatedProducts;
          });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const removeProduct = (productId, size, model) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (p) =>
          !(p.product.id === productId && p.size === size && p.model === model)
      );
      return updatedProducts;
    });
  };
  useEffect(() => {
    if (token !== null) {
      getUserDefaultShippingAddress()
        .then((res) => {
          const address = res.shippingAddress;
          setDeliveryFirstName(address.name.split(" ")[0]);
          setDeliveryLastName(address.name.split(" ")[1]);
          setDeliveryPhone(address.phoneNumber);
          setDeliveryCountry(address.country);
          setDeliveryCity(address.city);
          setDeliveryStreet(address.street);
          setDeliveryBuilding(address.buildingNumber);
          setDeliveryFloor(address.floor);
          setDeliveryApartment(address.apartmentNumber);
          setDeliveryZipCode(address.zipCode);
        })
        .catch((err) => {
          console.log(err);
        });
      getUserDefaultCC()
        .then((res) => {
          setUserCC(res.cc);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const paypal = getRadioProps({ value: "paypal" });
  const visa = getRadioProps({ value: "visa" });

  const openPayPal = () => {
    // You can customize this URL based on your PayPal integration
    var paypalURL = "https://www.paypal.com"; // Replace with your actual PayPal URL
    window.location.href = paypalURL;
  };
  return (
    <Flex gap="8" dir="rtl" mt="20" mx="15%">
      <Flex flex="1" flexDir="column" gap={token ? "40px" : "30px"} w="631px">
        {token === null && (
          <Flex flexDir="column" gap="20px">
            <DetailsHeader name="פרטי חיוב" />
            <Grid gridTemplateColumns="1fr 1fr" gap="19px">
              <Input
                label="שם פרטי"
                isInvalid={invalidLastName !== ""}
                isInvalidMessage={invalidLastName}
                required
                defaultValue={firstName}
                onBlur={(e) => {
                  setFirstName(e.target.value);
                  setInvalidFirstName("");
                }}
              />
              <Input
                label="שם משפחה"
                isInvalid={invalidLastName !== ""}
                isInvalidMessage={invalidLastName}
                defaultValue={lastName}
                onBlur={(e) => {
                  setLastName(e.target.value);
                  setInvalidLastName("");
                }}
                required
              />

              <Input
                label="דוא״ל"
                isInvalid={invalidEmail !== ""}
                isInvalidMessage={invalidEmail}
                required
                defaultValue={email}
                tip='אנא הכנס כתובת דוא"ל תקינה'
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleEmailChange(e.target.value);
                }}
              />
              <Input
                label="טלפון"
                isInvalid={invalidPhoneNumber !== ""}
                isInvalidMessage={invalidPhoneNumber}
                required
                value="לורם איפסום"
                defaultValue={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  handlePhoneNumberChange(e.target.value);
                }}
              />
              <GridItem colSpan={2}>
                <Input
                  label="שם חברה"
                  hint="אופציונלי"
                  defaultValue={companyName}
                  onBlur={(e) => setCompanyName(e.target.value)}
                />
              </GridItem>
            </Grid>
          </Flex>
        )}
        <Flex flexDir="column" gap="20px">
          <Text
            fontSize="18px"
            lineHeight="20px"
            color="naturalDarkest"
            fontWeight="semibold"
          >
            שיטת שילוח
          </Text>
          <VStack w="full">
            {options.map((delivery) => {
              return (
                <DeliveryCheckbox
                  deliveryName={delivery.deliveryName}
                  deliveryDesc={delivery.deliveryDesc}
                  price={delivery.price}
                  key={delivery.value}
                  dataRadioGroup={true}
                  isChecked={deliveryType === delivery.value}
                  onChange={() => setDeliveryType(delivery.value)}
                  value={delivery.value}
                />
              );
            })}
          </VStack>
        </Flex>

        <Flex flexDir="column" gap="20px">
          <DetailsHeader name="פרטי משלוח" />

          {token === null || showDetails ? (
            <Grid gridTemplateColumns="1fr 1fr" gap="6">
              <Input
                label="שם פרטי"
                required
                defaultValue={deliveryFirstName}
                onBlur={(e) => setDeliveryFirstName(e.target.value)}
              />
              <Input
                label="שם משפחה"
                required
                defaultValue={deliveryLastName}
                onBlur={(e) => setDeliveryLastName(e.target.value)}
              />
              <Input
                label="מדינה"
                isInvalid={invalidCountry !== ""}
                isInvalidMessage={invalidCountry}
                required
                defaultValue={deliveryCountry}
                onChange={(e) => {
                  setDeliveryCountry(e.target.value);
                  setInvalidCountry("");
                }}
              />

              <Input
                label="טלפון"
                placeholder=""
                required
                defaultValue={deliveryPhone}
                onBlur={(e) => setDeliveryPhone(e.target.value)}
              />
              <Input
                label="עיר"
                required
                isInvalid={invalidCity !== ""}
                isInvalidMessage={invalidCity}
                defaultValue={deliveryCity}
                onBlur={(e) => {
                  setDeliveryCity(e.target.value);
                  setInvalidCity("");
                }}
              />
              <Input
                label="רחוב"
                isInvalid={invalidStreet !== ""}
                isInvalidMessage={invalidStreet}
                required
                defaultValue={deliveryStreet}
                onBlur={(e) => {
                  setDeliveryStreet(e.target.value);
                  setInvalidStreet("");
                }}
              />
              <GridItem colSpan={2}>
                <Grid gridTemplateColumns="1fr 1fr 1fr 1fr" gap="4">
                  <GridItem colSpan={2}>
                    <Input
                      label="מספר בניין"
                      isInvalid={invalidBuilding !== ""}
                      isInvalidMessage={invalidBuilding}
                      defaultValue={deliveryBuilding}
                      onBlur={(e) => {
                        setDeliveryBuilding(e.target.value);
                        setInvalidBuilding("");
                      }}
                      required
                    />
                  </GridItem>

                  <Input
                    label="קומה"
                    type="number"
                    isInvalid={invalidFloor !== ""}
                    isInvalidMessage={invalidFloor}
                    defaultValue={deliveryFloor}
                    onBlur={(e) => {
                      setDeliveryFloor(e.target.value);
                      setInvalidFloor("");
                    }}
                    required
                  />

                  <Input
                    label="דירה"
                    type="number"
                    isInvalid={invalidApartment !== ""}
                    isInvalidMessage={invalidApartment}
                    defaultValue={deliveryApartment}
                    onBlur={(e) => {
                      setDeliveryApartment(e.target.value);
                      setInvalidApartment("");
                    }}
                    required
                  />
                </Grid>
              </GridItem>
              <GridItem colSpan={2}>
                <TextArea
                  label="הערות למוכר"
                  placeholder="לורם איפסום"
                  value={notes}
                  onBlur={(e) => setNotes(e.target.value)}
                  required
                />
              </GridItem>
              <GridItem colSpan={2}>
                <Flex justifyContent="space-between">
                  <CheckBox
                    size="big"
                    default
                    checked={saveDeafult}
                    text="שמור את הפרטים כברירת מחדל"
                    fontSize="16px"
                    lineHeight="26px"
                    onChange={() => setSaveDeafult(!saveDeafult)}
                  ></CheckBox>
                  {showDetails && (
                    /* <Text
                    cursor="pointer"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    <PenIcon />
                  </Text>*/
                    <Text
                      fontSize="16px"
                      lineHeight="26px"
                      letterSpacing="0.005em"
                      color="primary"
                      cursor="pointer"
                      onClick={() => setShowDetails(!showDetails)}
                    >
                      הסתר
                    </Text>
                  )}
                </Flex>
              </GridItem>
            </Grid>
          ) : (
            <Box
              w="full"
              border="1px solid transparent"
              borderColor="naturalLight"
              borderRadius="12px"
              h="68px"
              px="8"
              filter="drop-shadow(4px 4px 10px rgba(79, 81, 98, 0.05))"
              py="2"
            >
              <Flex justifyContent="space-between" h="full" alignItems="center">
                <Flex alignItems="center" gap="5">
                  <Box>
                    <Text
                      fontSize="18px"
                      fontWeight="medium"
                      color="naturalBlack"
                      letterSpacing="0.005em"
                      lineHeight="130%"
                    >
                      {deliveryFirstName} {deliveryLastName}
                    </Text>
                    <Text
                      fontSize="16px"
                      color="naturalBlack"
                      letterSpacing="0.005em"
                      lineHeight="130%"
                    >
                      {deliveryStreet} {deliveryBuilding}, {deliveryCity}{" "}
                      {deliveryZipCode !== "" ? "מיקוד " + deliveryZipCode : ""}
                    </Text>
                  </Box>
                </Flex>
                <Text
                  cursor="pointer"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  <PenIcon />
                </Text>
              </Flex>
            </Box>
          )}
        </Flex>
        {token !== null && (
          <Flex flexDir="column" gap="20px">
            <DetailsHeader name="פרטי תשלום" />
            <Box mb="30px">
              <HStack {...group} w="full">
                <CustomRadio w="215px" h="76px" {...visa} value="visa">
                  <Flex
                    alignItems="center"
                    dir="rtl"
                    w="150px"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Text
                        fontSize="16px"
                        lineHeight="26px"
                        letterSpacing="0.005em"
                        color="naturalBlack"
                        fontWeight="bold"
                        dir="ltr"
                      >
                        **** {userCC.ccNumber && userCC.ccNumber.slice(-4)}
                      </Text>
                      <Flex gap="2" alignItems="center">
                        <Text
                          fontSize="16px"
                          lineHeight="26px"
                          letterSpacing="0.005em"
                          color="naturalDark"
                          fontWeight="medium"
                          onClick={() =>
                            props.setTabIndex(
                              2,
                              products,
                              {
                                name: options[deliveryType - 1]["deliveryName"],
                                priceNum:
                                  options[deliveryType - 1]["priceNum"] || 0,
                              },
                              {
                                delivery: {
                                  deliveryFirstName,
                                  deliveryLastName,
                                  deliveryPhone,
                                  deliveryCountry,
                                  deliveryCity,
                                  deliveryStreet,
                                  deliveryBuilding,
                                  deliveryFloor,
                                  deliveryApartment,
                                  deliveryZipCode,
                                },
                              },
                              userCC
                            )
                          }
                        >
                          ערוך
                        </Text>
                        <Box
                          h="1"
                          w="1"
                          borderRadius="full"
                          bg="naturalDark"
                        ></Box>
                        <Text
                          fontSize="16px"
                          lineHeight="26px"
                          letterSpacing="0.005em"
                          color="naturalDark"
                          fontWeight="medium"
                        >
                          {userCC.ccType}
                        </Text>
                      </Flex>
                    </Box>
                    <VisaIcon />
                  </Flex>
                </CustomRadio>
                <CustomRadio
                  onClick={() => openPayPal()}
                  w="215px"
                  h="76px"
                  {...paypal}
                  value="paypal"
                >
                  <PayPalIcon />
                </CustomRadio>
                <Flex
                  cursor="pointer"
                  onClick={() =>
                    props.setTabIndex(2, products, {
                      name: options[deliveryType - 1]["deliveryName"],
                      priceNum: options[deliveryType - 1]["priceNum"] || 0,
                    })
                  }
                  h="76px"
                  w="76px"
                  bg="naturalLightest"
                  borderRadius="12px"
                  fontSize="40px"
                  color="naturalDark"
                  justifyContent="center"
                  alignItems="center"
                >
                  +
                </Flex>
              </HStack>
            </Box>
          </Flex>
        )}
        <Flex h="64px" justifyContent="space-between" alignItems="center">
          <Button.TextButton
            w="max"
            onClick={() =>
              props.setTabIndex(0, products, {
                name: options[deliveryType - 1]["deliveryName"],
                priceNum: options[deliveryType - 1]["priceNum"] || 0,
              })
            }
          >
            <ChevronRightIcon />
            חזרה לעגלה
          </Button.TextButton>
          <Button
            w="max"
            h="64px"
            onClick={() => token === null ? 
              props.setTabIndex(2, products, {
                name: options[deliveryType - 1]["deliveryName"],
                priceNum: options[deliveryType - 1]["priceNum"] || 0,
              }) : props.setTabIndex(3, products, {
                name: options[deliveryType - 1]["deliveryName"],
                priceNum: options[deliveryType - 1]["priceNum"] || 0,
              },{
                delivery: {
                  deliveryFirstName,
                  deliveryLastName,
                  deliveryPhone,
                  deliveryCountry,
                  deliveryCity,
                  deliveryStreet,
                  deliveryBuilding,
                  deliveryFloor,
                  deliveryApartment,
                  deliveryZipCode,
                },
              },
              userCC)
            } //verifyShippingDetailsAndContinueCheckout()
          >
            המשך לתשלום
            <ArrowLeftIcon />
          </Button>
        </Flex>
      </Flex>
      <Flex w="425px" gap="4" flexDir="column">
        <Flex
          p="5"
          border="1px solid transparent"
          gap="6"
          flexDir="column"
          borderRadius="20px"
          borderColor="bright"
          w="full"
        >
          <Text
            fontSize="22px"
            lineHeight="20px"
            color="naturalBlack"
            fontWeight="semibold"
          >
            סיכום הזמנה{" "}
            <Text as="span" fontWeight="normal">
              ({products.length} פריטים)
            </Text>
          </Text>

          <Divider h="1px" bg="naturalLight" />
          <Box>
            {products &&
              products.map((product, index) => {
                return (
                  <Flex
                    key={index}
                    mb={products.length - 1 > index ? "20px" : "0"}
                    gap="20px"
                  >
                    <Image
                      w="87px"
                      h="106px"
                      border="1px solid transparent"
                      borderRadius="12px"
                      src={
                        product && product.product.images.length >= 1
                          ? product.product.images[0]
                          : "https://via.placeholder.com/150"
                      }
                      borderColor="naturalLight"
                    />
                    <Flex justifyContent="space-between" w="full">
                      <Flex
                        flexDir="column"
                        p="1"
                        justifyContent="space-between"
                      >
                        <Flex flexDir="column" gap="2">
                          <Text
                            fontWeight="500"
                            lineHeight="15.4px"
                            color="naturalBlack"
                          >
                            {product.product.title}
                          </Text>
                          <Text color="naturalDarkest" lineHeight="15.4px">
                            {" "}
                            ₪
                            {product.product.price &&
                              removeDecimal(
                                (product.product.price *
                                  (100 - product.product.discount)) /
                                  100
                              )}
                          </Text>
                        </Flex>

                        <QuantityInput
                          value={product.amount}
                          limit={product.product.quantityLeft}
                          onChange={(amount) =>
                            updateAmount(
                              product.product,
                              product.size,
                              product.model,
                              amount,
                              product.amount
                            )
                          }
                        />
                      </Flex>
                      <Flex alignItems="center">
                        <IconButton
                          onClick={() =>
                            removeProduct(
                              product.product.id,
                              product.size,
                              product.model
                            )
                          }
                          icon={<TrashIcon />}
                          bg="transparent"
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                );
              })}

            {/* <IconButton icon={<TrashIcon />} bg="transparent" /> */}

            {/* <Spacer h="8" /> */}
            {/* <Flex justifyContent="end" alignItems="center" gap="2">
                 <RefreshIcon />
                <Text>עדכן סל קניות</Text>
              </Flex> */}
          </Box>
          <Divider h="1px" bg="naturalLight" />
          <Flex flexDir="column" gap="2">
            <Flex fontSize="16px" justifyContent="space-between">
              <Text> סכום ביניים </Text>
              <Text>
                ₪
                {(products.length >= 1 &&
                  Math.round(
                    products.reduce(
                      (a, b) =>
                        parseFloat(a) +
                        parseFloat(
                          ((b.product.price * (100 - b.product.discount)) /
                            100) *
                            b.amount
                        ),
                      0
                    ) * 100
                  ) / 100) ||
                  "0"}
              </Text>
            </Flex>
            <Flex fontSize="16px" justifyContent="space-between">
              <Text>משלוח</Text>
              <Text>₪{options[deliveryType - 1]["priceNum"] || 0} </Text>
            </Flex>
            <Flex fontSize="16px" justifyContent="space-between">
              <Text>עמלה</Text>
              <Text>₪3.25</Text>
            </Flex>
            <Flex fontSize="16px" justifyContent="space-between">
              <Text>הנחה קופון</Text>
              <Text dir="ltr" color="otherError">
                ₪{discount}
              </Text>
            </Flex>
            <Divider h="1px" bg="naturalLight" />
            <Spacer h="12px" />
            <Flex justifyContent="space-between" alignItems="center">
              <Flex flexDir="column">
                <Text fontWeight="medium" fontSize="16px" color="naturalBlack">
                  סך הכל
                </Text>
                <Text fontSize="14px" lineHeight="22px" color="naturalDark">
                  כולל 3.25₪ עמלה
                </Text>
              </Flex>

              <Text
                fontWeight="medium"
                fontSize="24px"
                color="primary"
                lineHeight="18px"
              >
                ₪
                {(products.length >= 1 &&
                  Math.round(
                    3.25 +
                      (options[deliveryType - 1]["priceNum"] || 0) +
                      products.reduce(
                        (a, b) =>
                          parseFloat(a) +
                          parseFloat(
                            ((b.product.price * (100 - b.product.discount)) /
                              100) *
                              b.amount
                          ),
                        0
                      )
                  )) ||
                  "0"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          p="5"
          border="1px solid transparent"
          borderRadius="16px"
          borderColor="bright"
          w="full"
          flexDir="column"
          gap="30px"
        >
          <Flex gap="4" alignItems="center" justifyContent="center">
            <Text fontSize="14px" color="naturalDark">
              האתר מאובטח ומוגן ע״י
            </Text>
            <Image
              w="20"
              src={process.env.PUBLIC_URL + "/assets/Norton Icon.png"}
            />
            <Image w="20" src={process.env.PUBLIC_URL + "/assets/logo1.png"} />
          </Flex>

          <Flex gap="4" alignItems="center" justifyContent="center">
            <Image
              w="14"
              src={process.env.PUBLIC_URL + "/assets/International3.png"}
            />
            <Image
              w="8"
              src={process.env.PUBLIC_URL + "/assets/International.png"}
            />
            <Image
              w="8"
              src={process.env.PUBLIC_URL + "/assets/International2.png"}
            />
            <Image
              w="10"
              src={process.env.PUBLIC_URL + "/assets/Mastercard.svg"}
            />
            <Image
              w="10"
              src={process.env.PUBLIC_URL + "/assets/International4.png"}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
