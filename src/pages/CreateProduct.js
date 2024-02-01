import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Image,
  Spacer,
  Switch,
  Text,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CloseButton,
  Stack,
  ChakraProvider,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  Input as ChakraInput,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import Bbutton from "../components/Button";
import { DatePicker, TimePicker } from "react-rainbow-components";
import { format } from "date-fns";
import { AiFillExclamationCircle, AiOutlinePicture } from "react-icons/ai";
import Container from "../components/Container";
import FileUploader from "../components/FileUploader";
import { RightIcon2, ShareIcon, TrashIcon } from "../components/Icons";
import Input, { CategoryInput } from "../components/Input";
import Layout from "../components/Layout";
import ProductImageSelect from "../components/ProductImageSelect";
import TextArea from "../components/TextArea";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { addProduct } from "../utils/api/products";
import { addAuctionProduct } from "../utils/api/auctionProducts";
import { routes } from "../routes";
import { RiPictureInPicture2Fill } from "react-icons/ri";
import { CloseIcon } from "@chakra-ui/icons";
import { getCategories } from "../utils/api/categories";
import { getSubcategoriesOfCategory } from "../utils/api/subcategories";

export default function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const [auction, setAuction] = useState(true);
  const [shadow, setShadow] = useState(1);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fragile, setFragile] = useState(false);
  const [status, setStatus] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [thickness, setThickness] = useState(0);
  const [weight, setWeight] = useState(0);
  const [openingPrice, setOpeningPrice] = useState("");
  const [closingPrice, setClosingPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [time, setTime] = useState(0);
  const [timeFrame, setTimeFrame] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [amount, setAmount] = useState("");
  const [pictures, setPictures] = useState([]);
  const [mainPicture, setMainPicture] = useState({});
  const [video, setVideo] = useState("");
  const [disable, setDisable] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleDateTimeSubmit = () => {
    if (selectedDate && selectedTime) {
      const [hour, minute] = selectedTime.split(":");
      const fullDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hour,
        minute
      );
      setStartTime(fullDateTime);
      console.log("Selected Date & Time:", fullDateTime);
    }
  };

  const createProduct = () => {
    if (name !== "" && description !== "" && status !== "" && pictures[0]) {
      const images = mainPicture.url
        ? [mainPicture, ...pictures.filter((p) => p.url !== mainPicture.url)]
        : pictures;
      setLoading(true);
      if (!auction) {
        addProduct(
          name,
          description,
          {
            width,
            height,
            thickness,
            weight,
          },
          { fragile },
          status,
          category,
          "no",
          price,
          discount,
          images,
          video,
          amount,
          true
        )
          .then((res) => {
            console.log(res);
            if (res.status === "ok") {
              setLoading(false);
              window.location.href = routes.UserSettingsMySales.path;
            } else {
              setLoading(false);
              alert("שגיאה ביצירת מכירה חדשה");
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            alert("שגיאה ביצירת מכירה חדשה");
          });
      } else {
        addAuctionProduct(
          name,
          description,
          {
            width,
            height,
            thickness,
            weight,
          },
          { fragile },
          status,
          category,
          "no",
          openingPrice,
          closingPrice,
          minPrice,
          maxPrice,
          startTime,
          timeFrame,
          images,
          video
        ).then((res) => {
          console.log(res);
          if (res.status === "ok") {
            setLoading(false);
            window.localStorage.setItem("token", res.token);
            window.location.href = routes.UserSettingsMySales.path;
          } else {
            setLoading(false);
            alert("שגיאה ביצירת מכירה חדשה");
          }
        });
      }
    }
  };

  const deleteAll = () => {
    setAuction(false);
    setCategory("");
    setName("");
    setDescription("");
    setFragile(false);
    setStatus(0);
    setWidth(0);
    setHeight(0);
    setThickness(0);
    setWeight(0);
    setPrice(0);
    setDiscount(0);
    setAmount(0);
    setPictures([]);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.categories);
        console.log(res.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  /*useEffect(() => {
    if (categories.length > 0) {
      console.log(category)
      const index = categories.findIndex((c) => c.title === category);
      const categoryId = categories[index]._id;
      getSubcategoriesOfCategory(categoryId)
        .then((res) => setSubcategories(res.subcategories))
        .catch((err) => console.log(err));
    }
  }, [category]);*/
  return (
    <Layout logo>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Box
              pb={{ base: "20px", md: "120px" }}
              pt={{ md: "100px", lg: "10" }}
              dir="rtl"
              w="full"
              maxW="780px"
              mx="auto"
            >
              <Flex
                alignItems="center"
                display={{ base: "none", md: "flex" }}
                gap="2"
                onClick={() => {
                  window.location.href = routes.HOME.path;
                }}
              >
                <ShareIcon />
                <Text>בחזרה לאתר</Text>
              </Flex>
              <Flex
                display={{ base: "flex", md: "none" }}
                alignItems="center"
                justifyContent="center"
                px="10%"
                borderBottom="1px solid"
                borderColor="naturalLight"
                h="75px"
              >
                <Flex position="absolute" right="10%">
                  <RightIcon2
                    onClick={() => {
                      window.location.href = routes.HOME.path;
                    }}
                  />
                </Flex>
                <Flex justifyContent="center">
                  <Text
                    fontSize={{ base: "20px", sm: "24px" }}
                    fontWeight="medium"
                    color="naturalDarkest"
                  >
                    פתיחת מכירה חדשה
                  </Text>
                </Flex>
              </Flex>
              <Box w={{ base: "320px", sm: "460px", md: "full" }} mx="auto">
                <Title name="בחר את סוג המכירה " />
                <Flex
                  p={{ base: "0", md: "30px" }}
                  alignItems="center"
                  gap={{ base: "12px", sm: "20px", md: "40px" }}
                  justifyContent="center"
                >
                  <Flex flexDir="column" gap="2" alighItems="center">
                    <Button
                      w={{base: "154px", sm: "220px", md: "290px"}}
                      h={{ base: "110px", sm: "160px", md: "210px" }}
                      bg="white"
                      _hover={{ bg: "white" }}
                      boxShadow={
                        shadow === 1
                          ? "4px 8px 40px 0 rgba(13, 47, 153, 0.15)"
                          : "none"
                      }
                      alignItems="center"
                      border="2px solid transparent"
                      borderColor={shadow === 1 ? "transparent" : "borderBg"}
                      justifyContent="center"
                      gap={{ base: "7px", sm: "8px" }}
                      borderRadius="20px"
                      flexDir="column"
                      px={{ base: "30px", md: "60px" }}
                      py={{ base: "20px", md: "30px" }}
                      onClick={() => {
                        setAuction(true);
                        setShadow(1);
                      }}
                    >
                      <Image
                        w={{ base: "80px", sm: "110px", md: "140px" }}
                        h={{ base: "60px", sm: "95px", md: "115px" }}
                        src={process.env.PUBLIC_URL + "/assets/25.svg"}
                      />
                      <Text
                        fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                        fontWeight="semibold"
                        color="primary"
                      >
                        מכירה פומבית
                      </Text>
                    </Button>
                    <Text
                      textAlign="center"
                      fontSize={{base: "12px", sm: "14px", md: "16px"}}
                      color="primaryDark"
                      cursor="pointer"
                      onClick={() =>
                        (window.location.href =
                          routes.CreatePArticle.path.replace(
                            ":id",
                            ""
                          ) + 0)
                      }
                    >
                      *מדריך בנושא מכירה פומבית
                    </Text>
                  </Flex>
                  <Flex flexDir="column" gap="2">
                    <Button
                      border="2px solid transparent"
                      borderColor={shadow === 2 ? "transparent" : "borderBg"}
                      bg="white"
                      _hover={{ bg: "white" }}
                      w={{base: "154px", sm: "220px", md: "290px"}}
                      h={{ base: "110px", sm: "160px", md: "210px" }}
                      boxShadow={
                        shadow === 2
                          ? "4px 8px 40px 0 rgba(13, 47, 153, 0.15)"
                          : "none"
                      }
                      alignItems="center"
                      justifyContent="center"
                      gap={{ base: "10px", md: "18px" }}
                      borderRadius="20px"
                      flexDir="column"
                      px={{ base: "30px", md: "60px" }}
                      py={{ base: "20px", md: "30px" }}
                      onClick={() => {
                        setAuction(false);
                        setShadow(2);
                      }}
                    >
                      <Image
                        w={{ base: "70px", sm: "100px", md: "120px" }}
                        h={{ base: "55px", sm: "85px", md: "105px" }}
                        src={process.env.PUBLIC_URL + "/assets/5.svg"}
                      />
                      <Text
                        fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                        fontWeight="semibold"
                        color="primary"
                      >
                        מכירה רגילה
                      </Text>
                    </Button>
                    <Text
                      textAlign="center"
                      fontSize={{base: "12px", sm: "14px", md: "16px"}}
                      color="primaryDark"
                      cursor="pointer"
                      onClick={() =>
                        (window.location.href = routes.CreatePArticle.path.replace(
                          ":id",
                          ""
                        ) + 1)
                      }
                    >
                      *מדריך בנושא מכירה רגילה
                    </Text>
                  </Flex>
                </Flex>
                <Title name="פרטי מוצר" />
                <Flex flexDir="column" gap="4">
                  <CategoryInput
                    value={category}
                    light
                    label="קטגוריה"
                    labelFontSize="14px"
                    categories={categories}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <CategoryInput
                    value={subcategory}
                    light
                    label="תת קטגוריה"
                    labelFontSize="14px"
                    subcategories={subcategories}
                    onChange={(e) => setSubcategory(e.target.value)}
                  />
                  <Input
                    light
                    label="שם המוצר"
                    labelFontSize="14px"
                    value={name}
                    withCounter
                    maxLength="40"
                    onChange={(e) => setName(e.target.value)}
                    hint={
                      <Flex alignItems="center" gap="2">
                        <Text color="primary">
                          <AiFillExclamationCircle />
                        </Text>
                        <Text fontSize="14px" color="naturalDarkest">
                          יופיע ככותרת של המוצר
                        </Text>
                      </Flex>
                    }
                  />
                  <TextArea
                    value={description}
                    light
                    label="תיאור פורמט על המוצר"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Flex>

                <Title name="מידות המוצר" />
                <Box>
                  <Grid
                    gridTemplateColumns={{
                      base: "repeat(2, 1fr)",
                      md: "repeat(4, 1fr)",
                    }}
                    gap={{ base: "10px", md: "4" }}
                  >
                    <Input
                      value={width}
                      label="רוחב"
                      labelFontSize="14px"
                      type="number"
                      light
                      onChange={(e) => setWidth(e.target.value)}
                    />
                    <Input
                      value={height}
                      label="גובה"
                      labelFontSize="14px"
                      type="number"
                      light
                      onChange={(e) => setHeight(e.target.value)}
                    />
                    <Input
                      value={thickness}
                      label="עובי"
                      labelFontSize="14px"
                      type="number"
                      light
                      onChange={(e) => setThickness(e.target.value)}
                    />
                    <Input
                      value={weight}
                      label="משקל"
                      labelFontSize="14px"
                      type="number"
                      light
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </Grid>
                  <Spacer h="6" />
                  <Checkbox
                    isChecked={fragile}
                    borderRadius="full"
                    onChange={() =>
                      fragile ? setFragile(false) : setFragile(true)
                    }
                  >
                    מוצר שביר
                  </Checkbox>
                </Box>

                <Title name="מצב המוצר" />
                <Flex
                  flexWrap="wrap"
                  justifyContent="space-between"
                  fontSize="16px"
                  gap={{ base: "3" }}
                >
                  <Button
                    variant="outline"
                    h={{ base: "50px", md: "40px" }}
                    borderRadius={{ base: "12px", md: "10px" }}
                    borderColor={{
                      base:
                        status === "חדש, באריזה מקורית"
                          ? "primaryLight"
                          : "transparent",
                      md:
                        status === "חדש, באריזה מקורית" ? "primary" : "bright",
                    }}
                    fontWeight="normal"
                    _hover={
                      status === "חדש, באריזה מקורית"
                        ? { bg: "primary" }
                        : { bg: "bright" }
                    }
                    color={{
                      base:
                        status === "חדש, באריזה מקורית"
                          ? "primary"
                          : "naturalDarkest",
                      md:
                        status === "חדש, באריזה מקורית"
                          ? "white"
                          : "naturalDarkest",
                    }}
                    bg={{
                      base:
                        status === "חדש, באריזה מקורית"
                          ? "primaryLightest"
                          : "inputBg",
                      md: status === "חדש, באריזה מקורית" ? "primary" : "white",
                    }}
                    onClick={() => setStatus("חדש, באריזה מקורית")}
                  >
                    חדש, באריזה מקורית
                  </Button>
                  <Button
                    variant="outline"
                    h={{ base: "50px", md: "40px" }}
                    borderRadius={{ base: "12px", md: "10px" }}
                    borderColor={{
                      base:
                        status === "כחדש, בשימוש קצר"
                          ? "primaryLight"
                          : "transparent",
                      md: status === "כחדש, בשימוש קצר" ? "primary" : "bright",
                    }}
                    fontWeight="normal"
                    _hover={
                      status === "כחדש, בשימוש קצר"
                        ? { bg: "primary" }
                        : { bg: "bright" }
                    }
                    color={{
                      base:
                        status === "כחדש, בשימוש קצר"
                          ? "primary"
                          : "naturalDarkest",
                      md:
                        status === "כחדש, בשימוש קצר"
                          ? "white"
                          : "naturalDarkest",
                    }}
                    bgColor={{
                      base:
                        status === "כחדש, בשימוש קצר"
                          ? "primaryLightest"
                          : "inputBg",
                      md: status === "כחדש, בשימוש קצר" ? "primary" : "white",
                    }}
                    onClick={() => setStatus("כחדש, בשימוש קצר")}
                  >
                    כחדש, בשימוש קצר
                  </Button>
                  <Button
                    variant="outline"
                    h={{ base: "50px", md: "40px" }}
                    borderRadius={{ base: "12px", md: "10px" }}
                    borderColor={{
                      base:
                        status === "משומש, במצב טוב"
                          ? "primaryLight"
                          : "transparent",
                      md: status === "משומש, במצב טוב" ? "primary" : "bright",
                    }}
                    fontWeight="normal"
                    _hover={
                      status === "משומש, במצב טוב"
                        ? { bg: "primary" }
                        : { bg: "bright" }
                    }
                    color={{
                      base:
                        status === "משומש, במצב טוב"
                          ? "primary"
                          : "naturalDarkest",
                      md:
                        status === "משומש, במצב טוב"
                          ? "white"
                          : "naturalDarkest",
                    }}
                    bg={{
                      base:
                        status === "משומש, במצב טוב"
                          ? "primaryLightest"
                          : "inputBg",
                      md: status === "משומש, במצב טוב" ? "primary" : "white",
                    }}
                    onClick={() => setStatus("משומש, במצב טוב")}
                  >
                    משומש, במצב טוב
                  </Button>
                  <Button
                    variant="outline"
                    h={{ base: "50px", md: "40px" }}
                    borderRadius={{ base: "12px", md: "10px" }}
                    borderColor={{
                      base:
                        status === "לא עובד" ? "primaryLight" : "transparent",
                      md: status === "לא עובד" ? "primary" : "bright",
                    }}
                    fontWeight="normal"
                    _hover={
                      status === "לא עובד"
                        ? { bg: "primary" }
                        : { bg: "bright" }
                    }
                    color={{
                      base: status === "לא עובד" ? "primary" : "naturalDarkest",
                      md: status === "לא עובד" ? "white" : "naturalDarkest",
                    }}
                    bgColor={{
                      base:
                        status === "לא עובד" ? "primaryLightest" : "inputBg",
                      md: status === "לא עובד" ? "primary" : "white",
                    }}
                    onClick={() => setStatus("לא עובד")}
                  >
                    לא עובד
                  </Button>
                  <Button
                    variant="outline"
                    h={{ base: "50px", md: "40px" }}
                    borderRadius={{ base: "12px", md: "10px" }}
                    borderColor={{
                      base:
                        status === "לא רלוונטי"
                          ? "primaryLight"
                          : "transparent",
                      md: status === "לא רלוונטי" ? "primary" : "bright",
                    }}
                    fontWeight="normal"
                    _hover={
                      status === "לא רלוונטי"
                        ? { bg: "primary" }
                        : { bg: "bright" }
                    }
                    color={{
                      base:
                        status === "לא רלוונטי" ? "primary" : "naturalDarkest",
                      md: status === "לא רלוונטי" ? "white" : "naturalDarkest",
                    }}
                    bgColor={{
                      base:
                        status === "לא רלוונטי" ? "primaryLightest" : "inputBg",
                      md: status === "לא רלוונטי" ? "primary" : "white",
                    }}
                    onClick={() => setStatus("לא רלוונטי")}
                  >
                    לא רלוונטי
                  </Button>
                </Flex>
                <>
                  {auction ? (
                    <>
                      <Title name="תמחור" />
                      <Grid
                        gridTemplateColumns="1fr 1fr"
                        gap="4"
                        pb={{ base: "20px", md: "35px" }}
                        //alignItems="end"
                      >
                        <Input
                          light
                          label="הצעת מחיר פתיחה"
                          value={openingPrice}
                          onChange={(e) => setOpeningPrice(e.target.value)}
                        />
                        <Input
                          light
                          label="הצעת מחיר סופי"
                          value={closingPrice}
                          onChange={(e) => setClosingPrice(e.target.value)}
                        />
                      </Grid>

                      <Box pb="3">
                        <FormControl display="flex" gap="3" alignItems="center">
                          <Switch
                            id=""
                            size="lg"
                            onChange={() => setDisable(!disable)}
                          />
                          <FormLabel
                            mb="0"
                            letterSpacing="0.005em"
                            lineHeight="18px"
                            fontSize={{ base: "14px", md: "16px" }}
                            fontWeight={{ base: "normal", md: "medium" }}
                          >
                            אפשר הצעות
                          </FormLabel>
                        </FormControl>
                      </Box>

                      <Grid
                        gridTemplateColumns="1fr 1fr"
                        gap="4"
                        alignItems="end"
                      >
                        <Input
                          light
                          label="מחיר מינימלי"
                          disabled={disable}
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <Input
                          light
                          label="מחיר מקסימלי"
                          disabled={disable}
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </Grid>

                      <Title name="זמן פתיחה" />
                      <Flex
                        flexWrap="wrap"
                        gap={{ base: "10px", md: "5" }}
                        justifyContent={{ base: "space-between", md: "start" }}
                        fontSize="16px"
                      >
                        <Button
                          h={{ base: "50px", md: "40px" }}
                          w={{
                            base: "154px",
                            sm: "220px",
                            md: "-webkit-fit-content",
                          }}
                          variant="outline"
                          borderColor={{
                            base: time === 1 ? "primaryLight" : "transparent",
                            md: time === 1 ? "primary" : "bright",
                          }}
                          fontWeight="normal"
                          _hover={
                            time === 1 ? { bg: "primary" } : { bg: "bright" }
                          }
                          color={{
                            base: time === 1 ? "primary" : "naturalDarkest",
                            md: time === 1 ? "white" : "naturalDarkest",
                          }}
                          bgColor={{
                            base: time === 1 ? "primaryLightest" : "inputBg",
                            md: time === 1 ? "primary" : "white",
                          }}
                          borderRadius={{ base: "12px", md: "10px" }}
                          onClick={() => {
                            setStartTime(new Date());
                            setTime(1);
                          }}
                        >
                          התחל מיידית
                        </Button>
                        <Popover>
                          <PopoverTrigger>
                            <Button
                              h={{ base: "50px", md: "40px" }}
                              w={{
                                base: "154px",
                                sm: "220px",
                                md: "-webkit-fit-content",
                              }}
                              variant="outline"
                              borderColor={{
                                base:
                                  time === 2 ? "primaryLight" : "transparent",
                                md: time === 2 ? "primary" : "bright",
                              }}
                              fontWeight="normal"
                              _hover={
                                time === 2
                                  ? { bg: "primary" }
                                  : { bg: "bright" }
                              }
                              color={{
                                base: time === 2 ? "primary" : "naturalDarkest",
                                md: time === 2 ? "white" : "naturalDarkest",
                              }}
                              bgColor={{
                                base:
                                  time === 2 ? "primaryLightest" : "inputBg",
                                md: time === 2 ? "primary" : "white",
                              }}
                              borderRadius={{ base: "12px", md: "10px" }}
                              onClick={() => {
                                setTime(2);
                              }}
                            >
                              קבע תאריך ושעה
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>קבע תאריך ושעה</PopoverHeader>
                            <PopoverBody>
                              <DatePicker
                                value={selectedDate}
                                onChange={setSelectedDate}
                                minDate={new Date()}
                              />
                              <TimePicker
                                value={selectedTime}
                                onChange={setSelectedTime}
                              />
                              <Button onClick={handleDateTimeSubmit}>
                                קבע
                              </Button>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Flex>

                      <Title name="משך המכרז" />
                      <Flex
                        flexWrap="wrap"
                        gap="4"
                        fontSize="16px"
                        color="naturalDarkest"
                      >
                        <Button
                          h={{ base: "50px", md: "40px" }}
                          w={{ base: "66px", md: "113.33px" }}
                          variant="outline"
                          borderColor={{
                            base:
                              timeFrame === 2 ? "primaryLight" : "transparent",
                            md: timeFrame === 2 ? "primary" : "bright",
                          }}
                          fontWeight="normal"
                          _hover={
                            timeFrame === 2
                              ? { bg: "primary" }
                              : { bg: "bright" }
                          }
                          color={{
                            base:
                              timeFrame === 2 ? "primary" : "naturalDarkest",
                            md: timeFrame === 2 ? "white" : "naturalDarkest",
                          }}
                          bgColor={{
                            base:
                              timeFrame === 2 ? "primaryLightest" : "inputBg",
                            md: timeFrame === 2 ? "primary" : "white",
                          }}
                          borderRadius={{ base: "12px", md: "10px" }}
                          onClick={() => setTimeFrame(2)}
                        >
                          2 ימים
                        </Button>
                        <Button
                          h={{ base: "50px", md: "40px" }}
                          w={{ base: "66px", md: "133.33px" }}
                          variant="outline"
                          borderColor={{
                            base:
                              timeFrame === 4 ? "primaryLight" : "transparent",
                            md: timeFrame === 4 ? "primary" : "bright",
                          }}
                          fontWeight="normal"
                          _hover={
                            timeFrame === 4
                              ? { bg: "primary" }
                              : { bg: "bright" }
                          }
                          color={{
                            base:
                              timeFrame === 4 ? "primary" : "naturalDarkest",
                            md: timeFrame === 4 ? "white" : "naturalDarkest",
                          }}
                          bgColor={{
                            base:
                              timeFrame === 4 ? "primaryLightest" : "inputBg",
                            md: timeFrame === 4 ? "primary" : "white",
                          }}
                          borderRadius={{ base: "12px", md: "10px" }}
                          onClick={() => setTimeFrame(4)}
                        >
                          4 ימים
                        </Button>
                        <Button
                          h={{ base: "50px", md: "40px" }}
                          w={{ base: "66px", md: "113.33px" }}
                          variant="outline"
                          borderColor={{
                            base:
                              timeFrame === 7 ? "primaryLight" : "transparent",
                            md: timeFrame === 7 ? "primary" : "bright",
                          }}
                          fontWeight="normal"
                          _hover={
                            timeFrame === 7
                              ? { bg: "primary" }
                              : { bg: "bright" }
                          }
                          color={{
                            base:
                              timeFrame === 7 ? "primary" : "naturalDarkest",
                            md: timeFrame === 7 ? "white" : "naturalDarkest",
                          }}
                          bgColor={{
                            base:
                              timeFrame === 7 ? "primaryLightest" : "inputBg",
                            md: timeFrame === 7 ? "primary" : "white",
                          }}
                          borderRadius={{ base: "12px", md: "10px" }}
                          onClick={() => setTimeFrame(7)}
                        >
                          7 ימים
                        </Button>
                        <Button
                          h={{ base: "50px", md: "40px" }}
                          w={{ base: "66px", md: "113.33px" }}
                          variant="outline"
                          borderColor={{
                            base:
                              timeFrame === 14 ? "primaryLight" : "transparent",
                            md: timeFrame === 14 ? "primary" : "bright",
                          }}
                          fontWeight="normal"
                          _hover={
                            timeFrame === 14
                              ? { bg: "primary" }
                              : { bg: "bright" }
                          }
                          color={{
                            base:
                              timeFrame === 14 ? "primary" : "naturalDarkest",
                            md: timeFrame === 14 ? "white" : "naturalDarkest",
                          }}
                          bgColor={{
                            base:
                              timeFrame === 14 ? "primaryLightest" : "inputBg",
                            md: timeFrame === 14 ? "primary" : "white",
                          }}
                          borderRadius={{ base: "12px", md: "10px" }}
                          onClick={() => setTimeFrame(14)}
                        >
                          14 ימים
                        </Button>
                        <Button
                          h={{ base: "50px", md: "40px" }}
                          w={{ base: "66px", md: "113.33px" }}
                          variant="outline"
                          borderColor={{
                            base:
                              timeFrame === 30 ? "primaryLight" : "transparent",
                            md: timeFrame === 30 ? "primary" : "bright",
                          }}
                          fontWeight="normal"
                          _hover={
                            timeFrame === 30
                              ? { bg: "primary" }
                              : { bg: "bright" }
                          }
                          color={{
                            base:
                              timeFrame === 30 ? "primary" : "naturalDarkest",
                            md: timeFrame === 30 ? "white" : "naturalDarkest",
                          }}
                          bgColor={{
                            base:
                              timeFrame === 30 ? "primaryLightest" : "inputBg",
                            md: timeFrame === 30 ? "primary" : "white",
                          }}
                          borderRadius={{ base: "12px", md: "10px" }}
                          onClick={() => setTimeFrame(30)}
                        >
                          30 יום
                        </Button>
                        <ChakraInput
                          h={{ base: "50px", md: "40px" }}
                          w={{ base: "66px", md: "113.33px" }}
                          bg="naturalLightest"
                          border="1px solid"
                          borderColor="naturalLight"
                          placeHolder="אחר"
                          textColor="naturalDark"
                          _focus={{
                            borderColor: "primary",
                            boxShadow: "0 0 0 3px #E8F0FF",
                            textColor: "black",
                          }}
                          _hover={{
                            border: "2px solid",
                            borderColor: "#E8F0FF",
                          }}
                        ></ChakraInput>
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Title name="מחיר ומלאי" />
                      <Grid
                        gridTemplateColumns={{
                          base: "repeat(2, 1fr)",
                          md: "repeat(3, 1fr)",
                        }}
                        gap={{ base: "10px", md: "4" }}
                      >
                        <Input
                          value={price}
                          type="number"
                          label="מחיר"
                          labelFontSize="14px"
                          light
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <Input
                          value={discount}
                          type="number"
                          label="הנחה"
                          labelFontSize="14px"
                          light
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                          <Input
                            value={amount}
                            type="number"
                            label="כמות במלאי"
                            labelFontSize="14px"
                            light
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </GridItem>
                      </Grid>
                    </>
                  )}
                </>
                <Title name="הוסף תמונות" />
                <Box>
                  <FileUploader
                    number={pictures.length}
                    onClick={handleButtonClick}
                    onDrop={(files) => {
                      if (files) {
                        let p = [];
                        for (const file of files)
                          p.push({
                            url: URL.createObjectURL(file),
                            name: file.name,
                            size: file.size,
                          });
                        if (pictures.length < 6)
                          setPictures([...pictures, ...p]);
                      }
                    }}
                  />
                  <ChakraInput
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    multiple
                    display="none"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        let p = [];
                        for (const file of files)
                          p.push({
                            url: URL.createObjectURL(file),
                            name: file.name,
                            size: file.size,
                          });
                        if (pictures.length < 6)
                          setPictures([...pictures, ...p]);
                      }
                    }}
                  ></ChakraInput>
                  {pictures[0] ? (
                    <>
                      {pictures.map((image, index) => (
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          px="14px"
                          py="11px"
                          mt="4"
                          borderRadius="10px"
                          w={{ base: "320px", sm: "460px", md: "780px" }}
                          h="54px"
                          bg={{ base: "inputBg", md: "naturalLightest" }}
                          key={index}
                        >
                          <IconButton
                            size="xs"
                            bg="naturalLightest"
                            borderRadius="full"
                            border="1px solid transparent"
                            borderColor="naturalDarkest"
                            color="naturalDarkest"
                            _hover={{ bg: "white" }}
                            icon={<CloseIcon />}
                            onClick={() =>
                              setPictures(
                                pictures.filter((p) => p.url !== image.url)
                              )
                            }
                          />
                          <Flex
                            gap="3"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Flex dir="ltr" flexDir="column">
                              <Text fontSize="16px">{image.name}</Text>
                              <Text
                                fontWeight="light"
                                fontSize="12px"
                                lineHeight="16px"
                              >
                                {Math.ceil(image.size / 1000)}Kb
                              </Text>
                            </Flex>
                            {image.name.split(".")[1] === "png" ? (
                              <Image
                                h="28px"
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/FILE PNG.svg"
                                }
                              />
                            ) : (
                              <Image
                                h="28px"
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/FILE JPG.svg"
                                }
                              />
                            )}
                          </Flex>
                        </Flex>
                      ))}
                      <Flex
                        justifyContent={{ base: "start", md: "end" }}
                        mt="4"
                      >
                        <Button
                          variant="unstyled"
                          fontWeight="normal"
                          onClick={() => setPictures([])}
                        >
                          <Flex gap="2">
                            <TrashIcon />
                            <Text fontSize="16px">מחק את כל התמונות</Text>
                          </Flex>
                        </Button>
                      </Flex>
                    </>
                  ) : (
                    ""
                  )}
                </Box>

                <Title name="איזו תמונה תרצה שתופיע כתמונה ראשית" />
                <Box
                  pt={{ base: "10px", md: "20px" }}
                  pb={{ base: "40px", md: "50px" }}
                >
                  <ProductImageSelect
                    images={pictures}
                    select={(picture) => setMainPicture(picture)}
                  />
                </Box>

                <Flex justifyContent="space-between" alignItems="center">
                  <Flex alignItems="center" gap="4">
                    <Bbutton
                      w={{ base: "232px", sm: "360px", md: "184px" }}
                      h={{ base: "60px", md: "64px" }}
                      bg={{ base: "primaryLight", md: "primary" }}
                      borderRadius={{ base: "14px", md: "12px" }}
                      onClick={() => createProduct()}
                    >
                      הפעל מכירה
                    </Bbutton>
                    <Bbutton.Secondary
                      color="primary"
                      bg="white"
                      borderColor="primary"
                      border="2px solid"
                      display={{ base: "none", md: "block" }}
                      borderRadius={{ base: "14px", md: "12px" }}
                      w="278px"
                      h={{ base: "60px", md: "64px" }}
                      fontSize="20px"
                    >
                      שמור למועד מאוחר יותר
                    </Bbutton.Secondary>
                  </Flex>
                  <IconButton
                    w={{ base: "60px", md: "64px" }}
                    h={{ base: "60px", md: "64px" }}
                    bg={{ base: "primaryLightest", md: "naturalLightest" }}
                    size="lg"
                    borderRadius="14px"
                    icon={<TrashIcon fill="#0738D2" />}
                    onClick={onOpen}
                  />
                </Flex>
              </Box>
            </Box>
          </Container>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
              dir="rtl"
              borderRadius="21px"
              shadow="0px 5px 40px rgba(0, 0, 0, 0.1)"
              w="600px"
              h="378px"
            >
              <ModalCloseButton
                bg="naturalLightest"
                color="naturalDarkest"
                w="34.94px"
                h="34.94px"
                borderRadius="full"
                right="10px"
                top="10px"
              />

              <ModalBody>
                <Flex
                  mt="2"
                  flexDirection="column"
                  alignItems="center"
                  h="full"
                  gap="4"
                  justifyContent="center"
                >
                  <Box w="252px" textAlign="center">
                    <Text
                      fontSize="28px"
                      fontWeight="semibold"
                      color="naturalBlack"
                    >
                      למחוק את הפרטים?
                    </Text>
                  </Box>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Flex
                  justifyContent="center"
                  alighItems="center"
                  w="full"
                  gap="4"
                >
                  <Button
                    w="96px"
                    h="52px"
                    fontSize="18px"
                    color="white"
                    bg="primary"
                    onClick={() => {
                      deleteAll();
                      return onClose();
                    }}
                  >
                    אישור
                  </Button>
                  <Button
                    w="96px"
                    h="52px"
                    fontSize="18px"
                    borderColor="primary"
                    border="2px solid"
                    color="primary"
                    bg="white"
                    onClick={onClose}
                  >
                    ביטול
                  </Button>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Layout>
  );
}

const Title = ({ name }) => {
  return (
    <>
      <Flex
        display={{ base: "none", md: "flex" }}
        gap="2"
        alignItems="center"
        mt="50px"
        mb="16px"
      >
        <Text fontWeight="semibold" letterSpacing="0.005em">
          {name}
        </Text>
        <Divider bg="naturalLight" h="2px" flex="1" />
      </Flex>
      <Flex
        display={{ base: "flex", md: "none" }}
        bg="inputBg"
        p="10px"
        borderRadius="8px"
        alignItems="center"
        mt="40px"
        mb="10px"
      >
        <Text
          fontWeight="medium"
          fontSize={{ base: "14px", sm: "16px" }}
          letterSpacing="0.005em"
          color="naturlDarkest"
        >
          {name}
        </Text>
      </Flex>
    </>
  );
};
