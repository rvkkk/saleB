import {
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  Image,
  Img,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Button from "../components/Button";
import CardPayment from "../components/CardPayment";
import Checkbox from "../components/CheckBox";
import DetailsHeader from "../components/DetailsHeader";
import { PlusButton } from "../components/Icons";
import Input from "../components/Input";
import Layout from "../components/Layout";
import WalletCard from "../components/WalletCard";
import { useEffect } from "react";
import {
  getUserCCs,
  addCC,
  updateCC,
  deleteCC,
} from "../utils/api/creditCards";
import Loader from "../components/Loader";
import { sortDefultCC } from "../utils/sort";

export default function UserSettingsWallet() {
  const toogleShow = () => {
    setShow(!show);
    setShowDetails(!showDetails);
  };

  const currentYear = new Date().getFullYear();

  const [creditCards, setCreditCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState();
  const [dataFetched, setDataFetched] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [ccNumber, setCCNumber] = useState("");
  const [ccMonth, setCCMonth] = useState(1);
  const [ccYear, setCCYear] = useState(currentYear);
  const [ccCVV, setCCCVV] = useState("");
  const [ccType, setCCtype] = useState("");
  const [ccId, setCcId] = useState("0");
  const [holderName, setHolderName] = useState("");
  const [defaultCC, setDefaultCC] = useState(false);
  const [invalidNumber, setInvalidNumber] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [invalidCvv, setInvalidCvv] = useState(false);

  const handleSave = () => {
    validateCreditCardNumber(ccNumber);
    if (holderName === "") setInvalidName(true);
    if (ccCVV === "") setInvalidCvv(true);
    if (ccNumber !== "" && holderName !== "" && ccCVV !== "" && !invalidNumber)
      if (ccId === "0")
        addCC({
          ccNumber,
          ccExp: `${ccMonth}/${ccYear}`,
          ccCVV,
          ccName: holderName,
          ccType,
          defaultCC,
        })
          .then((res) => {
            console.log(res);
            setDataFetched(false);
          })
          .catch((err) => {
            console.log(err);
          });
      else
        updateCC(ccId, {
          ccNumber,
          ccExp: `${ccMonth}/${ccYear}`,
          ccCVV,
          ccName: holderName,
          ccType,
          defaultCC,
        })
          .then((res) => {
            console.log(res);
            setDataFetched(false);
          })
          .catch((err) => {
            console.log(err);
          });
  };

  useEffect(() => {
    if (!dataFetched) {
      setLoading(true);
      getUserCCs()
        .then((res) => {
          setShowDetails(false);
          setCreditCards(sortDefultCC(res.ccs));
          setLoading(false);
          setDataFetched(true);
          if (res.ccs.length >= 1) {
            setShow(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [dataFetched]);

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
            setInvalidNumber(false);
          } else setInvalidNumber(true);
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
                פרטי תשלום
              </Text>
            </Flex>
            <Spacer h="5" />
            {show ? (
              <Card
                p="6"
                pb="10"
                shadow="none"
                border="none"
                bg="white"
                borderRadius="12px"
              >
                <Flex alignItems="center" gap="10">
                  {creditCards.map((cc) => {
                    return (
                      <WalletCard
                        ccNumber={cc.ccNumber}
                        ccExp={cc.ccExp}
                        ccType={cc.ccType}
                        onChangeD={() => {
                          setCCNumber(cc.ccNumber);
                          setCCMonth(() => {
                            const [month, year] = cc.ccExp.split("/");
                            return Number(month);
                          });
                          setCCYear(() => {
                            const [month, year] = cc.ccExp.split("/");
                            return Number(year);
                          });
                          setCCCVV(cc.ccCVV);
                          setHolderName(cc.ccName);
                          setDefaultCC(cc.defaultCC);
                          setShowDetails(true);
                          setCcId(cc._id);
                        }}
                        onDelete={() => {
                          const a = window.confirm(
                            "האם אתה בטוח שברצונך למחוק כרטיס זה?"
                          );
                          if (a) {
                            deleteCC(cc._id)
                              .then((res) => {
                                console.log(res);
                                setCreditCards(
                                  sortDefultCC(
                                    creditCards.filter(
                                      (c) =>
                                        c._id.toString() !== cc._id.toString()
                                    )
                                  )
                                );
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }
                        }}
                      />
                    );
                  })}
                  {creditCards && creditCards.length < 3 && (
                    <AddButton
                      text="הוסף כרטיס חדש"
                      onClick={() => {
                        setCCNumber("");
                        setCCMonth(1);
                        setCCYear(currentYear);
                        setCCCVV("");
                        setHolderName("");
                        setDefaultCC(false);
                        setShowDetails(true);
                        setCcId("0");
                      }}
                    />
                  )}
                </Flex>
                {showDetails ? (
                  <>
                    <Box w="60%">
                      <Spacer h="10" />
                      <DetailsHeader name="פרטי אשראי" />
                      <Spacer h="2" />
                      <Flex flexDir="column" gap="4">
                        <Input
                          label="מספר כרטיס"
                          isInvalid={invalidNumber}
                          isInvalidMessage="שדה חובה"
                          labelFontSize="14px"
                          labelFontWeight="medium"
                          borderRadius="8px"
                          borderColor="bright"
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
                              e.target.value
                                .replace(/(\d{4})(?=\d)/g, "$1 ")
                                .trim()
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
                          isInvalid={invalidName}
                          isInvalidMessage="שדה חובה"
                          labelFontSize="14px"
                          labelFontWeight="medium"
                          borderRadius="8px"
                          borderColor="bright"
                          required
                          value={holderName}
                          onChange={(e) => {
                            setHolderName(e.target.value);
                            setInvalidName(false);
                          }}
                        />
                        <Box mt="28px" mb="15px">
                          <Checkbox
                            size="big"
                            default
                            fontSize="16px"
                            letterSpacing="0.005em"
                            color="naturlDarkest"
                            checked={defaultCC}
                            onChange={() => setDefaultCC(!defaultCC)}
                          >
                            שמור את הפרטים כברירת מחדל
                          </Checkbox>
                        </Box>
                        <Flex gap="4">
                          <Button
                            w="93px"
                            h="52px"
                            fontSize="18px"
                            lineHeight="20px"
                            onClick={() => handleSave()}
                          >
                            עדכון
                          </Button>
                          <Button.Secondary
                            w="93px"
                            h="52px"
                            fontSize="18px"
                            lineHeight="20px"
                            borderColor="primary"
                            color="primary"
                            onClick={() => {
                              const a = window.confirm(
                                "האם אתה בטוח שברצונך לבטל?"
                              );
                              if (a) {
                                setShowDetails(false);
                              }
                            }}
                          >
                            ביטול
                          </Button.Secondary>
                        </Flex>
                      </Flex>
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </Card>
            ) : (
              <Empty toogleShow={toogleShow} />
            )}
          </Box>
        </>
      )}
    </Layout>
  );
}

const AddButton = ({ text, ...rest }) => {
  return (
    <Button
      w="327px"
      gap="4"
      flexDir="column"
      h="182px"
      _hover={{ bg: "othersLight" }}
      alignItems="center"
      justifyContent="center"
      bg="naturalLightest"
      borderRadius="12px"
      {...rest}
    >
      <PlusButton />
      <Text
        fontWeight="500"
        fontSize="16px"
        lineHeight="20px"
        color="naturalDarkest"
      >
        {" "}
        {text}
      </Text>
    </Button>
  );
};

const Empty = ({ toogleShow }) => {
  return (
    <Card
      p="6"
      pb="10"
      shadow="none"
      border="none"
      height="632px"
      bg="white"
      borderRadius="12px"
    >
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        h="full"
        gap="16"
      >
        <Flex flexDir="column" justifyContent="center" alignItems="center">
          <Image src={process.env.PUBLIC_URL + "/assets/empty card.png"} w="381.2px" />
          <Text
            fontSize="36px"
            w="max"
            lineHeight="24px"
            letterSpacing="-0.015em"
            color="naturalDarkest"
          >
            אין פרטים במערכת
          </Text>
        </Flex>
        <AddButton onClick={toogleShow} text="הוסף כרטיס חדש" />
      </Flex>
    </Card>
  );
};
