import { useState, useEffect } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import ReactStars from "react-rating-stars-component";
import { BiHeart } from "react-icons/bi";
import { AiFillExclamationCircle } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  Divider,
  Flex,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spacer,
  Text,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import React from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import ProductBanner from "../components/ProductBanner";
import Button from "../components/Button";
import ImageGallery from "../components/ImageGallery";
import ProductTabs from "../components/ProductTabs";
import Tab1Component from "../components/ProductTab1/Tab1Component";
import Tab2Component from "../components/ProductTab1/Tab2Component";
import Tab3Component from "../components/ProductTab1/Tab3Component";
import Products from "../components/Products";
import ProductPriceInput from "../components/ProductPriceInput";
import {
  addNewWish,
  getUserWishList,
  deleteFromWishList,
} from "../utils/api/wishLists";
import {
  addToWishList,
  checkIfProductInWishList,
  removeFromWishList,
} from "../utils/wishList";
import { sortMostBuyProducts, sortProductsByCategory } from "../utils/sort";
import { getAuctionProduct } from "../utils/api/auctionProducts";
import { routes } from "../routes";
import Loader from "../components/Loader";
import { getTimeLeft } from "../utils/date";
import {
  HeartFullIcon,
  HeartIcon,
  StarEmptyIcon,
  StarHalfIcon,
  StarFullIcon,
  HeartMobileIcon,
  HeartFullMobileIcon,
} from "../components/Icons";
import ProductTimeClock from "../components/ProductTimeClock";
import ProductAccordings from "../components/ProductAccordings";

export default function ProductPageAuction() {
  const tabs = [
    { name: "פרטים טכניים", component: <Tab1Component /> },
    { name: "המלצות", component: <Tab2Component /> },
    { name: "משלוחים והחזרות", component: <Tab3Component /> },
  ];

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [productsInCategory, setProductsInCategory] = useState([]);
  const [mostByProducts, setMostByProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [inWishList, setInWishList] = useState(false);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (product === null) {
      setLoading(true);
      getAuctionProduct(window.location.href.split("/").pop().split("?")[0])
        .then((res) => {
          setProduct(res.product);
          setProductsInCategory(
            sortProductsByCategory(res.product.products, res.product.category)
          );
          setMostByProducts(sortMostBuyProducts(res.product.products));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          alert("מוצר לא נמצא");
          window.location.href = routes.HOME.path;
        });
    }
  }, []);

  const addWish = () => {
    if (token === null)
      addToWishList({
        product: {
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          discount: product.discount,
          images: product.images,
          quantityLeft: product.quantityLeft,
          pin: product.pin,
        },
        amount: 1,
        size: null,
        model: null,
      })
        .then((res) => {
          setInWishList(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else
      addNewWish({ productId: product.id, amount: 1, size: null, model: null })
        .then((res) => {
          setInWishList(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const removeWish = () => {
    if (token === null)
      removeFromWishList({
        productId: product.id,
        size: null,
        model: null,
      })
        .then((res) => {
          setInWishList(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else
      deleteFromWishList(product.id, null, null)
        .then((res) => {
          setInWishList(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const breadcrumb = [
    { name: "דף הבית", href: routes.HOME.path },
    { name: "קטגוריה", href: routes.Category.path },
    { name: "מחלקה", href: routes.Category.path + product.category },
    { name: "מוצר", href: routes.ProductPage.path + product.id },
  ];

  return (
    <Layout breadcrumb={breadcrumb}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {product && (
            <>
              <Box
                pt="20px"
                pb="20"
                dir="rtl"
                mx="auto"
                display={{ base: "none", md: "block" }}
              >
                <Container>
                  <ProductBanner />

                  <Flex mt="10" gap={{ md: "5", lg: "10" }} mx="auto">
                    <Flex justifyContent="end" w="50%">
                      {" "}
                      <ImageGallery images={product.product.images} />
                    </Flex>

                    <Box w="50%">
                      <Box w="80%">
                        <Flex flexDir="column" gap="2">
                          <Flex
                            alignItems="center"
                            textAlign="center"
                            justifyContent="center"
                            bg="white"
                            border="1px solid transparent"
                            borderColor="bright"
                            color="naturalDarkest"
                            w={{ md: "100px", lg: "150px" }}
                            h={{ md: "30px", lg: "39px" }}
                            borderRadius="8px"
                          >
                            <Text
                              fontWeight="medium"
                              fontSize={{ md: "14px", lg: "16px" }}
                            >
                              {product.status}
                            </Text>
                          </Flex>
                          {/*</Flex> <Text
                            fontWeight="medium"
                            fontSize="32px"
                            lineHeight="35px"
                            color="naturalBlack"
                          >
                            {product.product.title}
                          </Text>
                          <Flex
                            dir="ltr"
                            gap="3"
                            alignItems="center"
                            justifyContent="end"
                          >
                            <Text
                              fontSize="16px"
                              color="naturalDark"
                              lineHeight="18px"
                              letterSpacing="-0.02em"
                              dir="rtl"
                            >
                              
                              {product.product.reviews ? product.product.reviews.length : "0"}{" "}דירוגים
                            </Text>
                            <ReactStars
                              count={5}
                              value={
                                product.reviews &&
                                product.reviews.reduce(
                                  (a, b) => a + b.score,
                                  0
                                ) / product.reviews.length
                              }
                              size={30}
                              edit={false}
                              emptyIcon={<StarEmptyIcon />}
                              halfIcon={<StarHalfIcon />}
                              filledIcon={<StarFullIcon />}
                              activeColor="#69D6CF"
                            />
                          </Flex>
                          <Text fontSize="16px" lineHeight="26px" color="naturalDarkest">
                            {product.product.description}
                          </Text>
                        </Box>
                            */}
                          <Text
                            fontWeight="medium"
                            fontSize={{ md: "24px", lg: "32px" }}
                            lineHeight={{ md: "30px", lg: "35px" }}
                            color="naturalBlack"
                          >
                            {product.title}
                          </Text>
                          <Flex
                            dir="ltr"
                            gap="3"
                            alignItems="center"
                            justifyContent="end"
                          >
                            <Text
                              fontSize="16px"
                              color="naturalDark"
                              lineHeight="18px"
                              letterSpacing="-0.02em"
                              dir="rtl"
                            >
                              {product.reviews ? product.reviews.length : "0"}{" "}
                              דירוגים
                            </Text>
                            <ReactStars
                              count={5}
                              value={
                                product.reviews &&
                                product.reviews.reduce(
                                  (a, b) => a + b.score,
                                  0
                                ) / product.reviews.length
                              }
                              size={30}
                              edit={false}
                              emptyIcon={<StarEmptyIcon />}
                              halfIcon={<StarHalfIcon />}
                              filledIcon={<StarFullIcon />}
                              activeColor="#69D6CF"
                            />
                          </Flex>
                          <Text
                            fontSize="16px"
                            lineHeight={{ md: "18px", lg: "26px" }}
                            color="naturalDarkest"
                          >
                            {product.description}
                          </Text>
                          <Spacer h="16" />
                        </Flex>
                        <Box>
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Flex alignItems="center" gap="4">
                              <Box>
                                <Text fontSize="14px" lineHeight="18px">
                                  הערכת מחיר
                                </Text>
                                <Text
                                  color="naturalBlack"
                                  fontSize="18px"
                                  lineHeight="26px"
                                  letterSpacing="-0.02em"
                                >
                                  {product.product.currentPrice} ₪
                                </Text>
                              </Box>
                              <Divider bg="naturalLight" h="34px" w="1px" />
                              <Box>
                                <Text
                                  color="naturalBlack"
                                  fontSize="14px"
                                  lineHeight="18px"
                                >
                                  מחיר פתיחה
                                </Text>
                                <Text
                                  fontSize="18px"
                                  lineHeight="26px"
                                  letterSpacing="-0.02em"
                                >
                                  {product.product.openingPrice} ₪
                                </Text>
                              </Box>
                            </Flex>

                            <Flex gap="14px">
                              <Flex
                                alignItems="center"
                                borderRadius="8px"
                                gap="7px"
                                px="18px"
                                py="10px"
                                bg="othersLight"
                                color="primary"
                                fontSize="14px"
                              >
                                <Image h="14px" src={process.env.PUBLIC_URL + "/assets/tool.png"} />
                                <Text lineHeight="20px">הצעות</Text>
                                <Text lineHeight="20px">
                                  {product.product.offers}
                                </Text>
                              </Flex>
                              <Flex
                                    alignItems="center"
                                    borderRadius="8px"
                                    gap="7px"
                                    px="18px"
                                    py="10px"
                                    bg="othersLight"
                                    color="primary"
                                    fontSize="14px"
                              >
                                <Image h="3" src={process.env.PUBLIC_URL + "/assets/eye.png"} />
                                <Text lineHeight="20px">צופים</Text>
                                <Text lineHeight="20px">
                                  {product.product.viewed}
                                </Text>
                              </Flex>
                            </Flex>
                          </Flex>
                          <Spacer h="8" />
                          <Card p="25px">
                            <Flex gap="20" mb="4">
                              <Box>
                                <Text
                                  fontSize="14px"
                                  lineHeight="18px"
                                  fontWeight="medium"
                                  color="naturalDark"
                                >
                                  הצעה אחרונה
                                </Text>
                                <Text
                                  fontSize="30px"
                                  lineHeight="42px"
                                  color="primary"
                                >
                                  ₪{product.product.currentPrice}{" "}
                                </Text>
                              </Box>
                              <Box>
                                <Text
                                  fontSize="14px"
                                  lineHeight="18px"
                                  fontWeight="medium"
                                  color="naturalDark"
                                >
                                  מכירה מסתיימת בעוד
                                </Text>
                                <ProductTimeClock date={product.product.date} frame={product.product.timeFrame} showProduct />
                              </Box>
                            </Flex>

                            <Text
                              fontSize="16px"
                              fontWeight="medium"
                              color="naturalDarkest"
                            >
                              הכנס את ההצעה הגבוהה ביותר שלך
                            </Text>
                            <Flex gap="4" alignItems="center">
                              <ProductPriceInput
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder={
                                  "₪" +
                                  product.product.currentPrice +
                                  " או יותר"
                                }
                              />
                              <Button
                                w="260px"
                                h="60px"
                                onClick={() =>
                                  price >= product.product.currentPrice &&
                                  onOpen()
                                }
                              >
                                שלח הצעה
                              </Button>{" "}
                              {/*onClick={onOpen}*/}
                              <IconButton
                                w="64px"
                                h="64px"
                                bg="naturalLightest"
                                borderRadius="15px"
                                //color="naturalDark"
                                //fontSize="30px"
                                icon={
                                  inWishList ? <HeartFullIcon /> : <HeartIcon />
                                }
                                onClick={() =>
                                  !inWishList ? addWish() : removeWish()
                                }
                              />
                            </Flex>
                          </Card>

                          <Spacer h="6" />

                          <Flex alignItems="center" gap="2" fontSize="16px">
                            <Text
                              lineHeight="22px"
                              fontWeight="medium"
                              color="naturalBlack"
                            >
                              משלוח תוך 4 ימים
                            </Text>

                            <Text color="naturalLight">
                              <AiFillExclamationCircle />
                            </Text>
                          </Flex>
                          <Flex alignItems="center" gap="2" fontSize="14px">
                            <Text color="#1C274C">
                              <GrLocation />
                            </Text>
                            <Text lineHeight="22px" color="naturalDarkest">
                              נשלח אל ישראל באמצעות Fast Deliver Shipping
                            </Text>
                          </Flex>

                          <Spacer h={{ md: "4", lg: "6" }} />

                          <Box
                            border="1px solid transparent"
                            borderColor="naturalLight"
                            borderRadius="2xl"
                            w={{ md: "350px", lg: "450px", xl: "535px" }}
                          >
                            <Flex
                              alignItems="center"
                              gap="2"
                              p="4"
                              justifyContent="center"
                            >
                              <Image w="30px" src={process.env.PUBLIC_URL + "/assets/Shield Check.png"} />
                              <Text
                                fontSize="13px"
                                lineHeight="14.5px"
                                color="naturalDarkest"
                              >
                                <Text
                                  fontSize="14px"
                                  fontWeight="medium"
                                  as="span"
                                >
                                  הגנת הקונה למשך 45 ימים
                                </Text>{" "}
                                החזר כספי באחריות
                              </Text>
                            </Flex>
                            <Divider />
                            <Flex
                              gap="2"
                              alignItems="center"
                              p="4"
                              justifyContent="center"
                            >
                              <Text
                                color="naturalDarkest"
                                lineHeight="17.7px"
                                fontSize="14px"
                              >
                                תשלום מאובטח ומוגן
                              </Text>
                              <Image h="26px" src={process.env.PUBLIC_URL + "/assets/Norton Icon.png"} />
                              {/*h="26px"*/}
                              <Image h="26px" src={process.env.PUBLIC_URL + "/assets/logo1.png"} />
                            </Flex>
                          </Box>

                          <Spacer h="4" />
                          <Flex
                            alignItems="center"
                            gap="1"
                            justifyContent="center"
                            w={{ md: "350px", lg: "450px", xl: "535px" }}
                          >
                            <Text
                              color="naturalDark"
                              fontSize="14px"
                              lineHeight="22px"
                            >
                              נתקלתם בבעיה עם מוצר זה?
                            </Text>
                            <Flex gap="1" w="max" alignItems="center">
                              <Image src={process.env.PUBLIC_URL + "/assets/flag.png"} />
                              <Link
                                fontSize="14px"
                                lineHeight="22px"
                                href={routes.ContactUs.path}
                                textColor="primary"
                              >
                                דווחו לנו
                              </Link>
                            </Flex>
                          </Flex>
                        </Box>
                      </Box>
                    </Box>
                  </Flex>

                  <ProductTabs tabs={tabs} />
                  <Flex
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="5"
                  >
                    <Products
                      title="מוצרים דומים"
                      products={productsInCategory.slice(0, 25)}
                    />
                    <Products
                      title="מוצרים מובילים"
                      w="298px"
                      h="406px"
                      p="310px"
                      numberOfSlides={5}
                      products={mostByProducts.slice(0, 25)}
                    />
                  </Flex>
                </Container>
              </Box>

              <Box
                pb="18px"
                dir="rtl"
                display={{ base: "block", md: "none" }}
                mx="auto"
              >
                <Container>
                  <Image
                    w={{ base: "300px", sm: "420px" }}
                    h={{ base: "250px", sm: "370px" }}
                    mx="auto"
                    borderRadius="20px"
                    src={product.images && product.images[0]}
                  />
                  <Box display="block" r="10px" top="10px"><ProductTimeClock date={product.product.date} frame={product.product.timeFrame} showProduct /></Box>
                  <Flex dir="rtl" p="20px" borderBottomRadius="20px">
                    <Text
                      fontSize="17px"
                      lineHeight="18px"
                      color="naturalDarkest"
                    >
                      הצעה אחרונה
                    </Text>
                    <Text
                      fontSize="17px"
                      lineHeight="18px"
                      color="naturalBlack"
                    >
                      {product.product.currentPrice}
                    </Text>
                  </Flex>
                  <Flex
                    flexDir="column"
                    pt="18px"
                    gap="18px"
                    w={{ base: "320px", sm: "460px" }}
                    mx="auto"
                  >
                    <Flex w={{ base: "300px", sm: "440px" }}
                    mx="auto" flexDir="column" gap="10px">
                      <Flex gap="3">
                              <Flex
                                alignItems="center"
                                borderRadius="10px"
                                gap="7px"
                                px="10px"
                                py="1"
                                bg="primaryLightest"
                                color="primary"
                                fontSize="12px"
                              >
                                <Image h="14px" src={process.env.PUBLIC_URL + "/assets/tool.png"} />
                                <Text lineHeight="20px">הצעות</Text>
                                <Text lineHeight="20px">
                                  {product.product.offers}
                                </Text>
                              </Flex>
                              <Flex
                                  alignItems="center"
                                  borderRadius="10px"
                                  gap="7px"
                                  px="10px"
                                  py="1"
                                  bg="primaryLightest"
                                  color="primary"
                                  fontSize="12px"
                              >
                                <Image h="3" src={process.env.PUBLIC_URL + "/assets/eye.png"} />
                                <Text lineHeight="20px">צופים</Text>
                                <Text lineHeight="20px">
                                  {product.product.viewed}
                                </Text>
                              </Flex>
                            </Flex>
                          
                     
                        <Text
                          fontWeight="medium"
                          fontSize="20px"
                          lineHeight="21px"
                          color="naturalBlack"
                        >
                          {product.title}
                        </Text>
                      <ProductBanner />
                      <Text
                        fontSize="14px"
                        lineHeight="20px"
                        color="naturalDarkest"
                      >
                        {product.description}
                      </Text>
                    </Flex>
                    <Flex gap="11px">
                      <Button
                        bg="primaryLight"
                        h="60px"
                        w="249px"
                        onClick={() =>
                          (window.location.href =
                            routes.ShoppingCart.path.replace(":id", "") +
                            product.product.id
                              .toString()
                              .replace("[object%20Object]", ""))
                        }
                      >
                        קנו עכשיו
                      </Button>
                      <IconButton
                        w="60px"
                        h="60px"
                        bg="linear"
                        borderRadius="14px"
                        icon={inWishList ? <HeartFullMobileIcon /> : <HeartMobileIcon />}
                        onClick={() => (!inWishList ? addWish() : removeWish())}
                      />
                    </Flex>
                    <Flex flexDir="column" gap="4">
                      <Flex alignItems="center" gap="2">
                        <Text
                          fontSize="16px"
                          lineHeight="22px"
                          fontWeight="medium"
                          color="naturalBlack"
                        >
                          משלוח תוך 4 ימים
                        </Text>
                        <Text color="naturalLight">
                          <AiFillExclamationCircle />
                        </Text>
                      </Flex>
                      <Flex alignItems="center" gap="2" fontSize="14px">
                        <Text color="#1C274C">
                          <GrLocation />
                        </Text>
                        <Text lineHeight="22px" color="naturalBlack">
                          נשלח אל ישראל באמצעות Fast Deliver Shipping
                        </Text>
                      </Flex>
                      <Flex flexDir="column" pb="20px" gap="6px">
                        <Flex
                          alignItems="center"
                          gap="2"
                          py="2"
                          px="3"
                          justifyContent="center"
                          borderRadius="8px"
                          bg="borderBg"
                        >
                          <Image w="24px" src={process.env.PUBLIC_URL + "/assets/Shield Check.png"} />
                          <Text
                            fontSize="12px"
                            lineHeight="14.5px"
                            color="naturalDarkest"
                          >
                            <Text fontWeight="medium" as="span">
                              הגנת הקונה למשך 45 ימים
                            </Text>{" "}
                            החזר כספי באחריות
                          </Text>
                        </Flex>
                        <Flex
                          alignItems="center"
                          gap="11px"
                          py="2"
                          px="3"
                          justifyContent="center"
                          borderRadius="8px"
                          bg="borderBg"
                        >
                          <Text
                            color="naturalDarkest"
                            fontSize="12px"
                            lineHeight="17.7px"
                          >
                            תשלום מאובטח ומוגן
                          </Text>
                          <Image h="24px" src={process.env.PUBLIC_URL + "/assets/Norton Icon.png"} />
                          <Image h="17.19px" src={process.env.PUBLIC_URL + "/assets/logo1.png"} />
                        </Flex>
                      </Flex>
                    </Flex>
                    <ProductAccordings tabs={tabs} />
                    <Products
                      title="מוצרים דומים"
                      w="298px"
                      h="406px"
                      p="310px"
                      numberOfSlides={5}
                      products={productsInCategory.slice(0, 25)}
                    />{" "}
                  </Flex>
                </Container>
              </Box>
            </>
          )}

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
                  <Image h="150px" src={process.env.PUBLIC_URL + "/assets/popuo_success.png"} />
                  <Box w="252px" textAlign="center">
                    <Text
                      fontSize="28px"
                      fontWeight="semibold"
                      color="naturalBlack"
                    >
                      הצעתך התקבלה!
                    </Text>
                    <Text fontSize="16px" color="naturalDarkest">
                      נתת את ההצעה הכי גבוהה,
                      <br /> במידה והצעתך תזכה נעדכן אותך במייל
                    </Text>
                  </Box>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </Layout>
  );
}
