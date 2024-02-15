import { Input as ChakraInput, Box, Image, Text, Spacer } from "@chakra-ui/react";
import React from "react";
import Input from "../components/Input";
import { useState } from "react";
import { addCategory } from "../utils/api/categories";
import { addSubcategory } from "../utils/api/subcategories";
import Button from "../components/Button";
import { addProducts } from "../utils/api/products";

export default function AddCategory() {
  const [file, setFile] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState({});
  const [imageURL, setImageURL] = useState("");
  const [message, setMessage] = useState("");

  const addC = () => {
    addCategory(title, name, image)
      .then((res) => {console.log(res); setMessage("הקטגוריה נוספה בהצלחה")})
      .catch((err) => {console.log(err); setMessage("קרתה תקלה בעת ההוספה")});
  };

  const addSubC = () => {
    addSubcategory(categoryName, title, name, image)
    .then((res) => {console.log(res); setMessage("הקטגוריה המשנית נוספה בהצלחה")})
    .catch((err) => {console.log(err); setMessage("קרתה תקלה בעת ההוספה")});
  };

  const addFile = () => {
    addProducts(name, file)
    .then((res) => {console.log(res); setMessage("המוצרים נוספו בהצלחה לאתר")})
    .catch((err) => {console.log(err); setMessage("קרתה תקלה בעת ההוספה")});
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
        onChange={(e) => {
          const files = e.target.files;
          console.log(files);
          if (files[0]) {
            setImage(files[0]);
            console.log(files[0]);
            setName(files[0].name.split(".")[0]);
            setImageURL(URL.createObjectURL(files[0]));
          }
        }}
      ></ChakraInput>
      <Image w="200px" h="200px" alt={name} src={imageURL}></Image>
      <Button onClick={() => addC()}>הוסף קטגוריה</Button>
      <Text>להוספת תת קטגוריה הוסף שם קטגוריה ראשית</Text>
      <Input
        value={categoryName}
        label="שם קטגוריה ראשית"
        labelFontSize="14px"
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <Button onClick={() => addSubC()}>הוסף קטגוריה משנית</Button>
<Spacer h="10"></Spacer>

<ChakraInput
        id="fileInput"
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          console.log(files);
          if (files[0])
            setFile(files[0]);
        }}
      ></ChakraInput>
      <Button onClick={() => addFile()}>הוסף קובץ csv</Button>
      {message ===! "" && <Text>{message}</Text>}
    </Box>
  );
}
