import {
  Flex,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
/*import Button from "../Button";
import Checkbox from "../CheckBox";
import { ArrowLeftIcon, TrashIcon } from "../Icons";
import Input from "../Input";
import QuantityInput from "../QuantityInput";
import { TiArrowForwardOutline } from "react-icons/ti";
import { addOrder } from "../../utils/api/orders";
import { routes } from "../../routes";
*/
export default function Tab4(order) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([
    process.env.PUBLIC_URL + "/assets/Linear/Submit/1.png",
    process.env.PUBLIC_URL + "/assets/Linear/Submit/2.png",
    process.env.PUBLIC_URL + "/assets/Linear/Submit/3.png",
    process.env.PUBLIC_URL + "/assets/Linear/Submit/4.png",
    process.env.PUBLIC_URL + "/assets/Linear/Submit/5.png",
    process.env.PUBLIC_URL + "/assets/Linear/Submit/6.png",
    process.env.PUBLIC_URL + "/assets/Linear/Submit/7.png",
    process.env.PUBLIC_URL + "/assets/Linear/Submit/8.png",
  ]);
  //const token = window.localStorage.getItem("token");


 /* const removeProductFromCart = (productId, size, model) => {
    if (token === null)
      removeFromCart({ productId, size, model })
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });
    else
      deleteFromCart(productId, size, model)
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });
  };
*/
/*  useEffect(() => {
   /* if(token)
    {
      //להעביר תשלום ואז למחוק מהסל
      products.forEach(product => {
        removeProductFromCart(product.product.id, product.size, product.model)
      });

    }*/
//להוסיף לקוח חדש ואז להעביר תשלום ואז למחוק מהסל ואז ליצור הזמנה חדשה
    //props.details={details} userCC={userCC} products={products}
   // window.location.href = routes.BuySuccess.path.replace(":id", "") + 546515;
   /* addOrder(order)
      .then((res) => (window.location.href = routes.BuySuccess.path.replace(":id", "") + res.order._id))
      .catch((err) => console.log(err));
  }, []);*/

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 100);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <Flex alignItems="center" justifyContent="center" m="40">
      <Image w="120px" src={images[currentImageIndex]}></Image>
    </Flex>
  );
}
