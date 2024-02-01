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
import { addCategory } from "../utils/api/categories";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [name, setNmae] = useState("");
  const [image, setImage] = useState({});
  const [number, setNumber] = useState(1);

  const addC = () => {
    addCategory({ title, name, image, number })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Input
        value={title}
        label="שם באנגלית"
        labelFontSize="14px"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        value={name}
        label="שם"
        labelFontSize="14px"
        onChange={(e) => setNmae(e.target.value)}
      />
      <Input
        value={number}
        label="מספר"
        labelFontSize="14px"
        type="number"
        onChange={(e) => setNumber(e.target.value)}
      />
      <ChakraInput
        id="fileInput"
        type="file"
        accept="image/*"
        //multiple
        onChange={(e) => {
          const files = e.target.files;
          console.log(files);
          if (files) {
            setImage(files);
          }
        }}
      ></ChakraInput>
      <Button onClick={() => addC()}>
        הוסף קטגוריה
      </Button>
    </>
  );
}
