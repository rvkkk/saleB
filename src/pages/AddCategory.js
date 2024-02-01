import {
  Button,
  Input as ChakraInput,
} from "@chakra-ui/react";
import React from "react";
import Input from "../components/Input";
import { useState } from "react";
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
