import {
  Input as ChakraInput,
  Box,
  Image
} from "@chakra-ui/react";
import React from "react";
import Input from "../components/Input";
import { useState } from "react";
import { addCategory } from "../utils/api/categories";
import Button from "../components/Button";
import { transliterate } from 'transliteration';

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState({});
  const [imageURL, setImageURL] = useState("");

  const addC = () => {
    addCategory(title, name, image)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Box dir="rtl" mx="100px" my="50px">
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
        onChange={(e) => setName(e.target.value)}
      />
      <ChakraInput
        id="fileInput"
        type="file"
        accept="image/*"
        //multiple
        onChange={(e) => {
          const files = e.target.files;
          console.log(files);
          if (files[0]) {
            setImage(files[0]);
            console.log(files[0])
            setName(files[0].name.split(".")[0])
           // setTitle(transliterate(files[0].name.split(".")[0]))
            setImageURL(URL.createObjectURL(files[0]))
          }
        }}
      ></ChakraInput>
      <Image w="200px" h="200px" src={imageURL}></Image>
      <Button onClick={() => addC()}>
        הוסף קטגוריה
      </Button>
    </Box>
  );
}
