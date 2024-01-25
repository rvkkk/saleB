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
  Img,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import {
  ArrowLeftIcon,
  PayPalIcon,
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
import CustomRadio from "../CustomRadio";
import CardPayment from "../CardPayment";
import {
  getUserCCs,
  addCC,
  updateCC,
  deleteCC,
} from "../../utils/api/creditCards";
import Checkbox from "../CheckBox";
import { addToCart } from "../../utils/cart";
import { updateCart } from "../../utils/api/carts";

export default function Tab3(props) {
  const currentYear = new Date().getFullYear();

  const [ccNumber, setCCNumber] = useState("");
  const [ccMonth, setCCMonth] = useState(1);
  const [ccYear, setCCYear] = useState(currentYear);
  const [ccCVV, setCCCVV] = useState("");
  const [ccType, setCCtype] = useState("");
  const [ccId, setCcId] = useState("0");
  const [holderName, setHolderName] = useState("");
  const [defaultCC, setDefaultCC] = useState(true);
  const [invalidNumber, setInvalidNumber] = useState("");
  const [invalidName, setInvalidName] = useState("");
  const [invalidCvv, setInvalidCvv] = useState("");
  const [products, setProducts] = useState(props.products);
  const [saveDeafult, setSaveDeafult] = useState(true);
  const token = window.localStorage.getItem("token");
  const discount = props.discount;
  const delivery = props.delivery;
  const userCC = props.userCC;

  useEffect(() => {
    if (userCC.ccNumber) {
      setCCNumber(userCC.ccNumber);
      setCCMonth(userCC.ccExp.split("/")[0]);
      setCCYear(userCC.ccExp.split("/")[1]);
      setCCCVV(userCC.ccCVV);
      setHolderName(userCC.ccName);
    }
  });
  const validateCreditCardNumber = (cardNumber) => {
    // הסרת רווחים מהמספר
    cardNumber = cardNumber.replace(/\s/g, "");

    // בדיקת תקינות מספר
    if (!/^\d+$/.test(cardNumber)) {
      return setInvalidNumber(true); //"המספר יכול לכלול רק ספרות";
    }

    // הגדרת התבנית לכל סוג של כרטיס אשראי
    const patterns = {
      ישראכארט: /^\d{8,9}$/,
      מאסטרכארד: /^(51|52|53|54|55)\d{14}$/,
      ויזה: /^4\d{15}$/,
      דיינרס: /^(30|36|38)\d{12}$/,
      "אמריקן אקספרס": /^(27|37)\d{13}$/,
    };

    // בדיקה לפי כל סוג של כרטיס
    for (const [cardType, pattern] of Object.entries(patterns)) {
      if (pattern.test(cardNumber)) {
        if (cardType === "ישראכארט") {
          const isValidLuhn = isValidIsracartNumber(cardNumber);
          if (isValidLuhn) {
            setCCtype(cardType);
            setInvalidNumber("");
          } else setInvalidNumber("מספר כרטיס שגוי");
        } else {
          const isValidLuhn = isValidCreditCardNumber(cardNumber);
          if (isValidLuhn) {
            setCCtype(cardType);
            setInvalidNumber(false);
          } else setInvalidNumber(true);
        }
        return;
      }
    }
    return setInvalidNumber(true);
  };
  function isValidCreditCardNumber(creditCardNumber) {
    const isNumeric = /^[0-9]+$/.test(creditCardNumber);
    if (!isNumeric) {
      return false;
    }

    // בדיקת תקינות לפי Luhn algorithm
    let sum = 0;
    let shouldDouble = false;
    for (let i = creditCardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(creditCardNumber.charAt(i), 10);
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }

  function isValidIsracartNumber(cardNumber) {
    const isNumeric = /^[0-9]+$/.test(cardNumber);
    if (!isNumeric) {
      return false;
    }

    // בדיקת אורך המספר והוספת אפסים לצד שמאל אם נדרש
    if (cardNumber.length === 8) {
      cardNumber = "0" + cardNumber;
    } else if (cardNumber.length !== 9) {
      return false;
    }

    // יצירת משקלים
    const weights = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    const sum = cardNumber.split("").reduce((acc, digit, index) => {
      return acc + parseInt(digit, 10) * weights[index];
    }, 0);

    return sum % 11 === 0;
  }

  const checkCCAndMakeAnOrder = () => {
    if (ccNumber === "") setInvalidNumber("שדה חובה");
    if (holderName === "") setInvalidName("שדה חובה");
    if (ccCVV === "") setInvalidCvv("שדה חובה");
    if (
      ccNumber !== "" &&
      holderName !== "" &&
      ccCVV !== "" &&
      invalidNumber === "" &&
      invalidCvv === "" &&
      invalidName === ""
    )
      props.setTabIndex(4, products, {
        ccNumber,
        ccExp: `${ccMonth}/${ccYear}`,
        ccCVV,
        holderName,
      });
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "1",
  });

  const group = getRootProps();
  const paypal = getRadioProps({ value: "paypal" });
  const visa = getRadioProps({ value: "visa" });

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
  const removeDecimal = (num) => {
    try {
      return num.toString().split(".")[0];
    } catch (err) {
      return num;
    }
  };

  return (
    <Flex gap="8" dir="rtl" mt="20" mx="15%">
      <Box flex="2">
        <Flex w="90%" flexDir="column" gap="20px">
          <DetailsHeader name="אמצעי תשלום" />
          <Box mb="30px">
            <HStack {...group} w="full">
              <CustomRadio checked {...visa} value="visa">
                <VisaIcon />
              </CustomRadio>
              <CustomRadio {...paypal} value="paypal">
                <PayPalIcon />
              </CustomRadio>
            </HStack>
          </Box>

          <DetailsHeader name="פרטי אשראי" />
          <Flex flexDir="column" gap="4">
            <Input
              label="מספר כרטיס"
              isInvalid={invalidNumber !== ""}
              isInvalidMessage={invalidNumber}
              required
              type="tel"
              rightElement={
                <Img
                  data-v-100a690b=""
                  src="https://vaadharabanim.co.il/img/icons/credit-card/cardExample.png"
                />
              }
              maxLength={19}
              value={ccNumber}
              placeHolder="4580 4580 4580 4580"
              onChange={(e) => {
                setCCNumber(
                  e.target.value.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
                );
                validateCreditCardNumber(e.target.value);
              }}
            />
            <CardPayment
              ccMonth={ccMonth}
              setCCMonth={(value) => setCCMonth(value)}
              ccYear={ccYear}
              setCCYear={(value) => setCCYear(value)}
              invalidCvv={invalidCvv}
              ccCVV={ccCVV}
              setCCCVV={(value) => {
                setCCCVV(value);
                setInvalidCvv(false);
              }}
            />
            <Input
              label="שם בעל הכרטיס"
              isInvalid={invalidName !== ""}
              isInvalidMessage={invalidName}
              required
              value={holderName}
              onChange={(e) => {
                setHolderName(e.target.value);
                setInvalidName(false);
              }}
            />
            <Checkbox
              size="big"
              fontSize="14px"
              letterSpacing="0.005em"
              lineHeight="23px"
              color="naturlDarkest"
              default
              checked={saveDeafult}
              onChange={() => setSaveDeafult(!saveDeafult)}
              text="שמור פרטי כרטיס לפעמים הבאות"
            ></Checkbox>
          </Flex>
          <Spacer h="4" />
          <Flex h="64px" justifyContent="space-between" alignItems="center">
            <Button.TextButton
              w="max"
              onClick={() =>
                props.setTabIndex(1, products, {
                  ccNumber,
                  ccExp: `${ccMonth}/${ccYear}`,
                  ccCVV,
                  holderName,
                })
              }
            >
              <ChevronRightIcon />
              חזרה לעידכון משלוח
            </Button.TextButton>
            <Button w="max" h="64px" onClick={() => checkCCAndMakeAnOrder()}>
              סיום
              <ArrowLeftIcon />
            </Button>
          </Flex>
        </Flex>
      </Box>

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
            {/* <Flex justifyContent="space-between" alignItems="center">
              <Flex gap="6">
                <Image
                  w="87px"
                  h="106px"
                  border="1px solid transparent"
                  borderRadius="12px"
                  src="/assets/Image.png"
                  borderColor="naturalLight"
                />

                <Flex flexDir="column" justifyContent="space-between">
                  <Box>
                    <Text fontWeight="500" color="naturalBlack">
                      כותרת שם המוצר
                    </Text>
                    <Text color="naturalDarkest">₪200</Text>
                  </Box>

                  <QuantityInput value="1" />
                </Flex>
              </Flex>

              <IconButton icon={<TrashIcon />} bg="transparent" />
            </Flex>*/}

            {/* <Spacer h="8" />
            <Flex justifyContent="end" alignItems="center" gap="2">
              <RefreshIcon />
              <Text>עדכן סל קניות</Text>
          </Flex>*/}
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
              <Text>₪{delivery["priceNum"]}</Text>
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
                      delivery["priceNum"] -
                      discount +
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
