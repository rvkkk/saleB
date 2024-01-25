import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  IconButton,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function FileUploader({ onClick, onDrop, number }) {
  const [color, setColor] = useState("naturalDarkest");

  const handleDragOver = (e) => {
    e.preventDefault();
    setColor("primary");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setColor("naturalDarkest");
    console.log(3);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setColor("naturalDarkest");
    const files = e.dataTransfer.files;
    onDrop(files);
  };

  return (
    <Box>
      <Flex justifyContent="space-between" mb={{base: "10px", md:"16px"}}>
        <FormLabel fontSize={{base: "14px", md: "16px"}} m="0" lineHeight="24px" fontWeight="normal">
          העלה קבצי PNG, או JPG עד משקל של 3Mb
        </FormLabel>
        <Text display={{base: "none", md:"block"}} fontSize="16px" lineHeight="24px" color="naturalDarkest">
          {number}/6
        </Text>
      </Flex>

      <Flex
        cursor="pointer"
        onClick={onClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        w="full"
        h={{base: "170px", md: "293px"}}
        justifyContent="center"
        alignItems="center"
        bg={{base: "inputBg", md: "naturalLightest"}}
        border="1px"
        borderStyle="dashed"
        borderColor="naturalDark"
        borderRadius="16px"
      >
        <Flex flexDirection="column" alignItems="center" gap="4">
          <Flex
            w="72px"
            h="72px"
            justifyContent="center"
            alignItems="center"
            bg={{base: "naturalLight", md: "white"}}
            borderRadius="full"
          >
            <Image src={process.env.PUBLIC_URL + "/assets/image_icon.svg"} />
          </Flex>

          <Box textAlign="center" display={{base: "none", md: "block"}}>
            <Text fontSize="18px" fontWeight="medium" color="naturalBlack">
              הוסף תמונה
            </Text>
            <Text color={color}>גרור ושחרר או לחץ כאן כדי להעלות תמונה</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

const FileComponent = () => {
  return (
    <Flex
      dir="ltr"
      justifyContent="space-between"
      alignItems="center"
      p="4"
      bg="naturalLightest"
      borderRadius="10px"
    >
      <Flex alignItems="center" gap="2">
        <Image h="28px" src={process.env.PUBLIC_URL + "/assets/FILE FORMAT.svg"}/>
        <Box>
          <Text>אגרטל מצרי זוית ישרה.jpg</Text>

          <Text fontSize="12px">120Kb</Text>
        </Box>
      </Flex>

      <IconButton
        bg="white"
        size="sm"
        borderRadius="full"
        border="1px solid transparent"
        borderColor="naturalDarkest"
        icon={<CloseIcon />}
      />
    </Flex>
  );
};
