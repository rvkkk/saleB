import {
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import AddressCard from "../components/AddressCard";
import Button from "../components/Button";
import Checkbox from "../components/CheckBox";
import DetailsHeader from "../components/DetailsHeader";
import { PlusButton } from "../components/Icons";
import Input from "../components/Input";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import {
  getUserShippingAddresses,
  addShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
} from "../utils/api/shippingAddresses";
import { sortDefultAddress } from "../utils/sort";

export default function UserSettingsShippingAddress() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [id, setId] = useState("0");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  const [invalidCountry, setInvalidCountry] = useState(false);
  const [invalidCity, setInvalidCity] = useState(false);
  const [invalidStreet, setInvalidStreet] = useState(false);
  const [invalidBuildingNumber, setInvalidBuildingNumber] = useState(false);
  const [invalidFloor, setInvalidFloor] = useState(false);
  const [invalidApartmentNumber, setInvalidApartmentNumber] = useState(false);
  const [shippingAddresses, setShippingAddresses] = useState([]);

  const handleSave = () => {
    handlePhoneNumberChange(phoneNumber);
    if (name === "") setInvalidName(true);
    if (country === "") setInvalidCountry(true);
    if (city === "") setInvalidCity(true);
    if (street === "") setInvalidStreet(true);
    if (buildingNumber === "") setInvalidBuildingNumber(true);
    if (floor === "") setInvalidFloor(true);
    if (apartmentNumber === "") setInvalidApartmentNumber(true);
    if (
      name !== "" &&
      phoneNumber !== "" &&
      country !== "" &&
      city !== "" &&
      street !== "" &&
      buildingNumber !== "" &&
      floor !== "" &&
      apartmentNumber !== "" &&
      !invalidPhoneNumber
    ) {
      setLoading(true);
      if (id === "0") {
        addShippingAddress({
          name,
          phoneNumber,
          country,
          city,
          street,
          buildingNumber,
          floor,
          apartmentNumber,
          zipCode,
          defaultAddress: isDefault,
        })
          .then((res) => {
            console.log(res);
            setShippingAddresses(
              sortDefultAddress([...shippingAddresses, res.shippingAddress])
            );
          })
          .catch((err) => {
            setLoading(false);
          });
      } else {
        updateShippingAddress(id, {
          name,
          phoneNumber,
          country,
          city,
          street,
          buildingNumber,
          floor,
          apartmentNumber,
          zipCode,
          defaultAddress: isDefault,
        })
          .then((res) => {
            setShippingAddresses(
              sortDefultAddress((prevAddresses) => {
                const newAddresses = prevAddresses.map((a) => {
                  if (a._id === id) {
                    return res.shippingAddress;
                  }
                  return a;
                });
                return newAddresses;
              })
            );
          })
          .catch((err) => {
            setLoading(false);
          });
      }
      setShowDetails(false);
      setLoading(false);
    }
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    const phoneRegex = /^05\d{1}-?\d{7}$/;
    const phoneHomeRegex = /^0\d{1}-?\d{7}$/;
    if (!phoneRegex.test(phoneNumber) && !phoneHomeRegex.test(phoneNumber))
      setInvalidPhoneNumber(true);
    else setInvalidPhoneNumber(false);
  };

  useEffect(() => {
    if (!dataFetched) {
      setLoading(true);
      getUserShippingAddresses()
        .then((res) => {
          setShippingAddresses(sortDefultAddress(res.shippingAddresses));
          setLoading(false);
          setDataFetched(true);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [dataFetched]);

  return (
    <Layout withSidebar>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box py="20" ml="15%">
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="32px" lineHeight="20px" fontWeight="medium" color="naturalBlack">
                הכתובת שלי למשלוח
              </Text>
            </Flex>
            <Spacer h="10" />
            <Card
              p="6"
              pb="10"
              shadow="none"
              border="none"
              bg="white"
              borderRadius="12px"
            >
              <Box w="60%">
                <Grid gridTemplateColumns="1fr 1fr 1fr" gap="10">
                  {shippingAddresses[0] &&
                    shippingAddresses.map((address, key) => (
                      <AddressCard
                        key={key}
                        name={address.name}
                        phoneNumber={address.phoneNumber}
                        country={address.country}
                        city={address.city}
                        street={address.street}
                        buildingNumber={address.buildingNumber}
                        floor={address.floor}
                        apartmentNumber={address.apartmentNumber}
                        zipCode={address.zipCode}
                        editCard={() => {
                          setId(address._id);
                          setName(address.name);
                          setPhoneNumber(address.phoneNumber);
                          setCountry(address.country);
                          setCity(address.city);
                          setStreet(address.street);
                          setBuildingNumber(address.buildingNumber);
                          setFloor(address.floor);
                          setApartmentNumber(address.apartmentNumber);
                          setZipCode(address.zipCode);
                          setIsDefault(address.defaultAddress);
                          setShowDetails(true);
                        }}
                        deleteCard={() => {
                          const a = window.confirm(
                            "האם אתה בטוח שברצונך למחוק את הכרטיס?"
                          );
                          if (a) {
                            setLoading(true);
                            deleteShippingAddress(address._id)
                              .then((res) => {
                                alert("הנתונים נמחקו בהצלחה");
                                setLoading(false);
                                setShippingAddresses(
                                  shippingAddresses.filter(
                                    (a) => a._id !== address._id
                                  )
                                );
                              })
                              .catch((err) => {
                                setLoading(false);
                              });
                          }
                        }}
                      />
                    ))}
                  {shippingAddresses.length < 6 && (
                    <>
                      <Button
                        w="327px"
                        gap="4"
                        flexDir="column"
                        h="190px"
                        _hover={{ bg: "othersLight" }}
                        alignItems="center"
                        justifyContent="center"
                        bg="naturalLightest"
                        borderRadius="12px"
                        onClick={() => {
                          setId("0");
                          setName("");
                          setPhoneNumber("");
                          setCountry("");
                          setCity("");
                          setStreet("");
                          setBuildingNumber("");
                          setFloor("");
                          setApartmentNumber("");
                          setZipCode("");
                          setIsDefault(false);
                          setShowDetails(!showDetails);
                        }}
                      >
                        <PlusButton />
                        <Text
                          fontWeight="500"
                          fontSize="16px"
                          lineHeight="20px"
                          color="naturalDarkest"
                        >
                          הוסף כרטיס חדש
                        </Text>
                      </Button>
                    </>
                  )}
                </Grid>

                {showDetails ? (
                  <>
                    <Spacer h="10" />
                    <DetailsHeader name="פרטי משלוח" />
                    <Spacer h="6" />
                    <Grid gridTemplateColumns="1fr 1fr" gap="6">
                      <Input
                        label="שם איש קשר"
                        isInvalid={invalidName}
                        isInvalidMessage="שדה חובה"
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderRadius="8px"
                        borderColor="bright"
                        required
                        placeholder="שם איש קשר"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setInvalidName(false);
                        }}
                      />
                      <Input
                        label="טלפון"
                        type="phone"
                        isInvalid={invalidPhoneNumber}
                        isInvalidMessage="שדה חובה"
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderRadius="8px"
                        borderColor="bright"
                        required
                        placeholder="טלפון"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          handlePhoneNumberChange(e.target.value);
                        }}
                      />
                      <Input
                        label="ארץ"
                        isInvalid={invalidCountry}
                        isInvalidMessage="שדה חובה"
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderRadius="8px"
                        borderColor="bright"
                        required
                        placeholder=""
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          setInvalidCountry(false);
                        }}
                      />
                      <Input
                        label="עיר"
                        isInvalid={invalidCity}
                        isInvalidMessage="שדה חובה"
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderRadius="8px"
                        borderColor="bright"
                        required
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          setInvalidCity(false);
                        }}
                      />
                      <Input
                        label="רחוב"
                        isInvalid={invalidStreet}
                        isInvalidMessage="שדה חובה"
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderRadius="8px"
                        borderColor="bright"
                        placeholder=""
                        required
                        value={street}
                        onChange={(e) => {
                          setStreet(e.target.value);
                          setInvalidStreet(false);
                        }}
                      />
                      <Input
                        label="מספר בניין"
                        isInvalid={invalidBuildingNumber}
                        isInvalidMessage="שדה חובה"
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderRadius="8px"
                        borderColor="bright"
                        placeholder=""
                        required
                        value={buildingNumber}
                        onChange={(e) => {
                          setBuildingNumber(e.target.value);
                          setInvalidBuildingNumber(false);
                        }}
                      />
                    </Grid>

                    <Spacer h="6" />

                    <Grid gridTemplateColumns="1fr 1fr 1fr 1fr " gap="6">
                      <GridItem colSpan={2}>
                        <Input
                          label="קומה"
                          type="number"
                          isInvalid={invalidFloor}
                          isInvalidMessage="שדה חובה"
                          labelFontSize="14px"
                          labelFontWeight="medium"
                          borderRadius="8px"
                          borderColor="bright"
                          placeholder=""
                          required
                          value={floor}
                          onChange={(e) => {
                            setFloor(e.target.value);
                            setInvalidFloor(false);
                          }}
                        />
                      </GridItem>
                      <Input
                        label="דירה"
                        type="number"
                        isInvalid={invalidApartmentNumber}
                        isInvalidMessage="שדה חובה"
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderRadius="8px"
                        borderColor="bright"
                        placeholder=""
                        required
                        value={apartmentNumber}
                        onChange={(e) => {
                          setApartmentNumber(e.target.value);
                          setInvalidApartmentNumber(false);
                        }}
                      />
                      <Input
                        label="מיקוד"
                        type="number"
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderRadius="8px"
                        borderColor="bright"
                        placeholder=""
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </Grid>

                    <Spacer h="4" />

                    <Box mt="28px"
                        mb="15px">
                      <Checkbox
                        size="big"
                        fontSize="16px"
                        color="naturlDarkest"
                        letterSpacing="0.005em"
                        checked={isDefault}
                        default
                        onChange={() => setIsDefault(!isDefault)}
                        text="שמור את הפרטים כברירת מחדל"
                      >  
                      </Checkbox>
                    </Box>
                    <Spacer h="6" />
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
                            setInvalidName(false);
                            setInvalidPhoneNumber(false);
                            setInvalidCountry(false);
                            setInvalidCity(false);
                            setInvalidStreet(false);
                            setInvalidBuildingNumber(false);
                            setInvalidFloor(false);
                            setInvalidApartmentNumber(false);
                          }
                        }}
                      >
                        ביטול
                      </Button.Secondary>
                    </Flex>
                  </>
                ) : (
                  ""
                )}
              </Box>
            </Card>
          </Box>
        </>
      )}
    </Layout>
  );
}


  /*<Grid gridTemplateColumns="1fr 1fr 1fr 1fr " gap="6">
                      <GridItem colSpan={2}>
                        <Input
                          label="מספר בניין"
                          labelFontSize="14px"
                          labelFontWeight="medium"
                          borderRadius="8px"
                          borderColor="bright"
                          placeholder=""
                          required
                          value={buildingNumber}
                          onChange={(e) => setBuildingNumber(e.target.value)}
                        />
                      </GridItem>

                      <Input
                        label="קומה"
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderRadius="8px"
                        borderColor="bright"
                        placeholder=""
                        required
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                      />

                      <Input
                        label="דירה"
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderRadius="8px"
                        borderColor="bright"
                        placeholder=""
                        required
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                      />
</Grid>*/

