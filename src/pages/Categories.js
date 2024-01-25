/*import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  PopoverArrow,
  Spacer,
  Grid,
} from "@chakra-ui/react";
import { FaListUl } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import CategorySidebar from "../components/CategorySidebar";
import Container from "../components/Container";
import Layout from "../components/Layout";
import CartListItem from "../components/CartListItem";
import Pagination from "../components/Pagination";
import CartGalleryItem from "../components/CartGalleryItem";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../utils/api/products";
import {
  sortNewest,
  sortPopularAuction,
  sortPriceDown,
  sortPriceUp,
  sortMostBuyProducts,
} from "../utils/sort";
import Loader from "../components/Loader";
import { routes } from "../routes";
import { getCategory } from "../utils/api/categories";

export default function Categories() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);

  const breadcrumb = [
    { name: "דף הבית", href: routes.HOME.path },
    { name: category.name, href: routes.Category.path.replace(":category", "") + category.title || "/" },
  ];

  useEffect(() => {
    const category = window.location.href.split("/").pop().split("/")[0]; //צריך להיות באנגלית
    getCategory(category).then((res) => setCategory(res.category))
    .catch((err) => console.log(err));
  }, [])
}
*/