import React from "react";
import Tab1 from "../components/CartTabs/Tab1";
import Tab3 from "../components/CartTabs/Tab3";
import Tab4 from "../components/CartTabs/Tab4";
import { Icon1, Icon2, Icon3, Icon4 } from "../components/Icons";
import Layout from "../components/Layout";
import Tabs from "../components/Tabs";
import { useState } from "react";
//import { getCart, removeFromCart, clearCart, addToCart } from "../utils/cart";
/*import { getUserCart, deleteFromCart, updateCart } from "../utils/api/carts";
import { getUser } from "../utils/api/users";
import { getUserDefaultShippingAddress } from "../utils/api/shippingAddresses";*/
import { getProduct } from "../utils/api/api";
import Loader from "../components/Loader";
import Tab2 from "../components/CartTabs/Tab2";

export default function ShoppingCart() {
  const [tabIndex, setTabIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState({});
  const [details, setDetails] = useState({});  
  const [userCC, setUserCC] = useState({});            
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(false);

  /*const getProductsFromCart = async () => {
    const cart = await getCart();
    return cart.products;
  };*/

 /* const getProductsToPurchase = async () => {
    let products = [];
    let cart = [];
    try {
      cart = await getProductsFromCart();
    } catch (error) {
      // console.log(error);
    }

   const specificProduct = window.location.pathname
      .split("/")
      .pop()
      .split("?")[0];
    if (
      specificProduct &&
      specificProduct !== "all" &&
      specificProduct !== "undefined" &&
      specificProduct !== "null" &&
      specificProduct !== ""
    ) {
      try {
        console.log("fetching product: " + specificProduct);
        const product = await getProduct(specificProduct);
        products.push(product.product);
      } catch (err) {
        console.log("fetching product: " + specificProduct);
        const product = await getProduct(specificProduct);
        products.push(product.product);
      }
    } else {
      console.log("rely only on cart");
    }
    cart.map((product) => {
      products.push(product);
    });
    console.log(products);
    setProducts(products);
  };*/

 

 /* const paySubmit = () => {
    // payment process here
    clearAllFromCart();
    console.log("paySubmit");
    const payload = {
      firstName,
      lastName,
      email,
      phone,
      companyName,
      deliveryFirstName,
      deliveryLastName,
      deliveryPhone,
      deliveryAddress,
      deliveryCity,
      deliveryFloor,
      deliveryApartment,
      deliveryType,
      products,
      ccName,
      ccNumber,
      ccExpDate,
      ccCVV,
      ccMonth,
      ccYear,
    };
    window.location.href = routes.BuySuccess.path;
  };*/

  /*const getUserDetails = () => {
    return getUserDefaultShippingAddress()
      .then((res) => {
        const user = res.user;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhone(user.phoneNumber);
        // setCompanyName(user.companyName);

        setDeliveryFirstName(user.firstName);
        setDeliveryLastName(user.lastName);
        setDeliveryPhone(user.phone);
        setDeliveryAddress(user.address);
        setDeliveryCity(user.city);
        setDeliveryFloor(user.floor);
        setDeliveryApartment(user.apartment);
        setIsLogged(true);
      })
      .catch((err) => {
        setIsLogged(false);
      });
  };*/

  /*useEffect(() => {
    setLoading(true);
    if (token !== null) {
      getUserDetails();
      getUserCart()
        .then((res) => {
          setCart(res.cart);
          res.cart && setProducts(res.cart.products);
          if (cart === null || res.cart.products.length === 0)
            setNoProducts(true);
          console.log(res.cart);
        })
        .catch((err) => console.log(err));
    } else {
      getCart().then((cart) => {
        setCart(cart);
        setProducts(cart.products);
      });
    }
    setLoading(false);
  }, [token]);*/

  /* useEffect(() => {
    if (products.length === 0) {
      getProductsToPurchase();
    }

    if (!checkedAuth) {
      setLoading(true);
          const user = settings.user;
          if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPhone(user.phone);
            // setCompanyName(user.companyName);
            setDeliveryFirstName(user.firstName);
            setDeliveryLastName(user.lastName);
            setDeliveryPhone(user.phone);
            setDeliveryAddress(user.address);
            setDeliveryCity(user.city);
            setDeliveryFloor(user.floor);
            setDeliveryApartment(user.apartment);
          }
          setIsLogged(true);
          setLoading(false);
        } else {
          setIsLogged(false);
          setLoading(false);
        }
        setCheckedAuth(true);
      }).catch(err => {
        setCheckedAuth(true);
        setIsLogged(false);
        setLoading(false);
      });
    }
  
  }, []);*/


  const tabs = [
    {
      name: "עגלת קניות",
      imgUrl: "/assets/icon4.svg",
      component: (
        <Tab1
        products={products}
        delivery={delivery}
          proceedToCheckout={(products, discount) => {
            setProducts(products);
            setDiscount(discount);
            setTabIndex(1);
          }}
        />
      ),
      icon: Icon4,
    },
    {
      name: "משלוח",
      imgUrl: "/assets/icon3.svg",
      component: <Tab2 products={products} discount={discount}
      setTabIndex={(index, products = [], delivery, details={}, userCC={}) => {setProducts(products); setDelivery(delivery); setDetails(details); setUserCC(userCC); setTabIndex(index)}}/>,
      icon: Icon3,
    },
    {
      name: "תשלום",
      imgUrl: "/assets/icon2.svg",
      component: (
        <Tab3
        setTabIndex={(index, products = [], userCC) => {setProducts(products); setUserCC(userCC); setTabIndex(index) }}
        products={products}
        delivery={delivery}
        discount={discount}
        userCC={userCC}
        />
      ),
      icon: Icon2,
    },
    {
      name: "אישור הזמנה",
      imgUrl: "/assets/icon1.svg",
      component: <Tab4 order details={details} userCC={userCC} products={products}/>,
      icon: Icon1,
    },
  ];

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <Tabs
          defaultIndex={tab}
          tabs={tabs}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />
      )}
    </Layout>
  );
}
