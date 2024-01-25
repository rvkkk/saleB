import BuySuccess from "../pages/BuySuccess";
import Category from "../pages/Category";
import CheckOut from "../pages/CheckOut";
import ContactUs from "../pages/ContactUs";
import CreateProduct from "../pages/CreateProduct";
import FAQ from "../pages/FAQ";
import About from "../pages/About";
import Article from "../pages/Article";
import Regulations from "../pages/Regulations";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import EmailAuth from "../pages/EmailAuth";
import PaymentInfo from "../pages/PaymentInfo";
import ProductPage from "../pages/ProductPage";
import ProductPageAuction from "../pages/ProductPageAuction";
import ShippingDetails from "../pages/ShippingDetails";
import ShoppingCart from "../pages/ShoppingCart";
import SignUp from "../pages/SignUp";
import UserSettings from "../pages/UserSettings";
import UserSettingsDetails from "../pages/UserSettingsDetails";
import UserSettingsDeliveryTraker from "../pages/UserSettingsDeliveryTraker";
import UserSettingsMyOrders from "../pages/UserSettingsMyOrders";
import UserSettingsMySales from "../pages/UserSettingsMySales";
import UserSettingsShippingAddress from "../pages/UserSettingsShippingAddress";
import UserSettingsWallet from "../pages/UserSettingsWallet";
import UserSettingsWishList from "../pages/UserSettingsWishList";

export const routes = {
    LOGIN: {
        path: "/auth/login",
        component: Login
    },
    ForgetPassword: {
        path: "/auth/login/no_password",
        component: ForgetPassword
    },
    EmailAuth: {
        path: "/auth/login/email_authentication",
        component: EmailAuth
    },
    SIGNUP: {
        path: "/auth/sign-up",
        component: SignUp
    },
    HOME: {
        path: "/",
        component: Home
    },
    ShoppingCart: {
        path: "/cart/:id",
        component: ShoppingCart
    },
    Category: {
        path: "/category/:category",
        component: Category
    },
    ProductPage: {
        path: "/product/:id",
        component: ProductPage
    },
    ProductPageAuction: {
        path: "/product-auction/:id",
        component: ProductPageAuction
    },
    CreateProduct: {
        path: "/product/create",
        component: CreateProduct
    },
    FAQ: {
        path: "/faq",
        component: FAQ
    },
    Regulations: {
        path: "/regulations",
        component: Regulations
    },
    ShippingDetails: {
        path: "/shipping-details",
        component: ShippingDetails
    },
    PaymentInfo: {
        path: "/payment-info/:id",
        component: PaymentInfo
    },
    UserSettingsDeliveryTraker: {
        path: "/delivery-tracker",
        component: UserSettingsDeliveryTraker
    },
    UserSettingsMyOrders: {
        path: "/orders",
        component: UserSettingsMyOrders
    },
    UserSettingsMySales: {
        path: "/sales",
        component: UserSettingsMySales
    },
    UserSettingsWhiteList: {
        path: "/wishlist",
        component: UserSettingsWishList
    },
    UserSettingsShippingAddress: {
        path: "/shipping-address",
        component: UserSettingsShippingAddress
    },
    UserSettingsWallet: {
        path: "/wallets",
        component: UserSettingsWallet
    },
    UserSettingsDetails: {
        path: "/profile",
        component: UserSettingsDetails
    },
    UserSettings: {
        path: "/setting",
        component: UserSettings
    },
    ContactUs: {
        path: "/contact",
        component: ContactUs
    },
    About: {
        path: "/about",
        component: About
    },
    Article: {
        path: "/article/:id",
        component: Article
    },
    BuySuccess: {
        path: "/buy-success/:id",
        component: BuySuccess
    },
    CheckOut: {
        path: "/check/:id",
        component: CheckOut
    },

}