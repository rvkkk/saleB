import {
  Box,
  Card,
  Flex,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  Tooltip
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HeartIcon, HeartFullIcon } from "../Icons";
import { routes } from "../../routes";
import Badge from "../Badge";
import Button from "../Button";
import ProductBuyCard from "../ProductBuyCard";
import ProductTimeClock from "../ProductTimeClock";
//import { deleteProduct } from "../../utils/api/products";
import { addToWishList, removeFromWishList } from "../../utils/wishList";
import { addNewWish, deleteFromWishList } from "../../utils/api/wishLists";
import { addOffer } from "../../utils/api/offers";
import { useDisclosure } from "@chakra-ui/react";

export default function CartItemGallery(props) {
  const [inWishList, setInWishList] = useState(false);
  const token = window.localStorage.getItem("token");
  const product = props.data;
  const [hover, setHover] = useState(false);
  const { onOpen, onClose, isOpen } = useDisclosure();

  const addNewOffer = (price) => {
    addOffer(product._id, price)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const addWish = () => {
    if (token === null)
      addToWishList({
        product: {
          id: product._id,
          title: product.title,
          description: product.description,
          price: product.price,
          discount: product.discount,
          images: product.images,
          quantityLeft: product.quantityLeft,
          pin: product.pin,
        },
        amount: 1,
        size: "S",
        model: "1",
      })
        .then((res) => {
          setInWishList(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else
      addNewWish({ productId: product._id, amount: 1, size: "S", model: "1" })
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
        productId: product._id,
        size: "S",
        model: "1",
      })
        .then((res) => {
          setInWishList(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else
      deleteFromWishList(product._id, "S", "1")
        .then((res) => {
          setInWishList(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  /*const deleteP = () => {
    deleteProduct(product._id).then().catch();
  };*/

  const removeDecimal = (num) => {
    try {
      return num.toString().split(".")[0];
    } catch (err) {
      return num;
    }
  };

  if (product !== undefined) {
    let images = product.images || [];
    if (images.length === 0) {
      images = ["/assets/placeholder.png"];
    }
    return (
      <>
      <Card
        className="galleryCard"
        cursor="pointer"
        w="370px"
        borderRadius="32px"
        dir="rtl"
        p="20px"
        bg="white"
        position="relative"
        border="2px solid"
        borderColor="naturalLightest"
        shadow="none"
        _hover={{ shadow: "xl", border: "none" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        display={{base: "none", md: "block"}}
      >
        <Image
          w="350px"
          h="338px"
          borderRadius="26px"
          objectFit="cover"
          src={images && images[0]}
        />
        <Box px="2">
          {product.openingPrice && (
            <Box pb="6">
              <Flex justifyContent="center" transform="translateY(-50%)">
                <ProductTimeClock
                  date={product.startTime}
                  frame={product.timeFrame}
                />
              </Flex>
            </Box>
          )}
          <Spacer h="10" />
          <Text fontSize="20px" letterSpacing="-0.01em" lineHeight="24px">
            {product.title}
          </Text>
          <Spacer h="6" />
          <Flex gap="8" alignItems="center">
            {product.currentPrice ? (
              <>
                {product.winningPrice === 0 ? (
                  <Box flex="1">
                    <Text fontSize="18px" color="naturalDark">
                      הצעה מובילה
                    </Text>
                    <Text fontWeight="medium" fontSize="24px" lineHeight="30px">
                      ₪ {removeDecimal(product.currentPrice)}
                    </Text>
                  </Box>
                ) : (
                  <Box flex="1">
                    <Text fontSize="18px" color="naturalDark">
                      נמכר
                    </Text>
                    <Text
                      dir="rtl"
                      fontWeight="medium"
                      fontSize="24px"
                      lineHeight="30px"
                    >
                      ₪ {product.winningPrice}
                    </Text>
                  </Box>
                )}
              </>
            ) : (
              <Box flex="1">
                <Text fontSize="18px" color="naturalDark">
                  מחיר
                </Text>
                <Text fontWeight="medium" fontSize="24px" lineHeight="30px">
                  ₪{" "}
                  {removeDecimal(
                    (product.price * (100 - product.discount)) / 100
                  )}
                </Text>
              </Box>
            )}
            {!props.myItem && (
              <>
                {product.currentPrice ? (
                  <>
                    {product.winningPrice === 0 ? (
                      <Box>
                        <Popover
                          postion="relative"
                          zIndex={4}
                          id="offer"
                          className="addOffer"
                          placement="top"
                          isOpen={isOpen}
                          onOpen={onOpen}
                          onClose={onClose}
                          closeOnBlur={false}
                        >
                          <PopoverTrigger>
                            <Button
                              w="126px"
                              h="60px"
                              fontSize="18px"
                              lineHeight="20px"
                            >
                              הצע מחיר
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            w="370px"
                            border="none"
                            px="4"
                            py="6"
                            pt="12"
                            boxShadow="md"
                            borderRadius="16px"
                          >
                            <PopoverBody border="none">
                              <ProductBuyCard
                                title="אשר את הצעתך"
                                value={product.price}
                                onClose={onClose}
                                addNewOffer={(price) => addNewOffer(price)}
                              />
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Box>
                    ) : (
                      <Box position="relative">
                        <Button
                          w="126px"
                          h="60px"
                          fontSize="18px"
                          lineHeight="20px"
                          isDisabled
                        >
                          הצע מחיר
                        </Button>
                      </Box>
                    )}
                  </>
                ) : (
                  <Box position="relative">
                    <Button
                      w="126px"
                      h="60px"
                      fontSize="18px"
                      lineHeight="20px"
                      onClick={() =>
                        (window.location.href = product.openingPrice
                          ? routes.ProductPageAuction.path.replace(":id", "") +
                            product._id
                          : routes.ProductPage.path.replace(":id", "") +
                            product._id)
                      }
                    >
                      קנו עכשיו
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Flex>
        </Box>
        {hover && (
          <Flex
            gap="4"
            pos="absolute"
            top="9"
            left="-3"
            w="full"
            alignItems="center"
            justifyContent="space-between"
            px="6"
          >
            {product.offers ? (
              <Badge>{product.offers ? product.offers.length : 0} הצעות</Badge>
            ) : (
              <Box></Box>
            )}
            {!props.myItem && (
              <Tooltip
              placement="top"
              p="2"
              border="1px solid transparent"
              borderColor="naturalDark"
              borderRadius="10px"
              bg="white"
              dir="rtl"
              color="naturalDarkest"
              label={!inWishList ? "הוסף למועדפים" : "הסר מהמועדפים"}
            >
              <IconButton
                right="-6"
                w="40px"
                h="40px"
                bg="white"
                borderRadius="full"
                //color="naturalDark"
                fontSize="25"
              >
                {!inWishList ? (
                  <HeartIcon onClick={addWish} />
                ) : (
                  <HeartFullIcon onClick={removeWish} />
                )}
              </IconButton>
            </Tooltip>
            )}
          </Flex>
        )}
      </Card>
      <Box display={{base: "none", md: "block"}} w="162px">
      <Image
          w="full"
          h="168px"
          borderRadius="8px"
          objectFit="cover"
          src={images && images[0]}
        />
       
          {product.openingPrice && (
            <Box pb="3">
              <Flex justifyContent="center" transform="translateY(-50%)">
                <ProductTimeClock
                  date={product.startTime}
                  frame={product.timeFrame}
                />
              </Flex>
            </Box>
          )}
          <Flex gap="10px" flexDir="column" justifyContent="center">
          <Text fontSize="14px" letterSpacing="-0.01em" lineHeight="18px">
            {product.title}
          </Text>
            {product.currentPrice ? (
              <>
                {product.winningPrice === 0 ? (
                  <Box>
                    <Text fontSize="14px" lineHeight="18px" color="naturalDark">
                      הצעה מובילה
                    </Text>
                    <Text fontSize="20px" lineHeight="30px">
                      ₪ {removeDecimal(product.currentPrice)}
                    </Text>
                  </Box>
                ) : (
                  <Box>
                    <Text fontSize="14px" lineHeight="18px" color="naturalDark">
                      נמכר
                    </Text>
                    <Text
                      dir="rtl"
                      fontSize="20px"
                      lineHeight="30px"
                    >
                      ₪ {product.winningPrice}
                    </Text>
                  </Box>
                )}
              </>
            ) : (
              <Box>
                <Text fontSize="14px" lineHeight="18px" color="naturalDark">
                  מחיר
                </Text>
                <Text fontSize="20px" lineHeight="30px">
                  ₪{" "}
                  {removeDecimal(
                    (product.price * (100 - product.discount)) / 100
                  )}
                </Text>
              </Box>
            )}
            {!props.myItem && (
              <>
                {product.currentPrice ? (
                  <>
                    {product.winningPrice === 0 ? (
                      <Box>
                        <Popover
                          postion="relative"
                          zIndex={4}
                          id="offer"
                          className="addOffer"
                          placement="top"
                          isOpen={isOpen}
                          onOpen={onOpen}
                          onClose={onClose}
                          closeOnBlur={false}
                        >
                          <PopoverTrigger>
                            <Button
                              w="162px"
                              h="46px"
                              fontSize="16px"
                              lineHeight="26px"
                            >
                              הצע מחיר
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            w="360px"
                            border="none"                 
                            boxShadow="md"
                            borderRadius="16px"
                          >
                            <PopoverBody border="none">
                              <ProductBuyCard
                                title="אשר את הצעתך"
                                value={product.price}
                                onClose={onClose}
                                addNewOffer={(price) => addNewOffer(price)}
                              />
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Box>
                    ) : (
                      <Box position="relative">
                        <Button
                          w="162px"
                          h="46px"
                          fontSize="16px"
                          lineHeight="26px"
                          isDisabled
                        >
                          הצע מחיר
                        </Button>
                      </Box>
                    )}
                  </>
                ) : (
                  <Box position="relative">
                    <Button
                      w="162px"
                      h="46px"
                      fontSize="16px"
                      lineHeight="26px"
                      onClick={() =>
                        (window.location.href = product.openingPrice
                          ? routes.ProductPageAuction.path.replace(":id", "") +
                            product._id
                          : routes.ProductPage.path.replace(":id", "") +
                            product._id)
                      }
                    >
                      קנו עכשיו
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Flex>
        </Box>
      </>
    );
  }
}
