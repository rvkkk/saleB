import { Box, Flex, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { RadioButtonChecked2Icon } from "../Icons";

export default function ProductImageSelect(props) {
  const [selected, setSelected] = useState(1);
  return (
    <Flex flexWrap justifyContent="space-between">
      <ImageSelect
        checked={props.images[0] && selected === 1}
        choose={(img) => {
          props.select(img);
          setSelected(1);
        }}
        image={props.images[0]}
      />
      <ImageSelect
        checked={selected === 2}
        choose={(img) => {
          props.select(img);
          setSelected(2);
        }}
        image={props.images[1]}
      />
      <ImageSelect
        checked={selected === 3}
        choose={(img) => {
          props.select(img);
          setSelected(3);
        }}
        image={props.images[2]}
      />
      <ImageSelect
        checked={selected === 4}
        choose={(img) => {
          props.select(img);
          setSelected(4);
        }}
        image={props.images[3]}
      />
    </Flex>
  );
}

const ImageSelect = ({ checked = false, image, choose }) => {
  return (
    <Box
      w={{ base: "80px", sm: "100px", md: "147px" }}
      h={{ base: "80px", sm: "100px", md: "169px" }}
      position="relative"
      onClick={() => image && choose(image)}
    >
      <Flex
        display={{ base: "none", md: "flex" }}
        position="absolute"
        left="50%"
        top="0"
        transform="translate(-50%, -50%)"
      >
        {checked && image ? (
          <RadioButtonChecked2Icon />
        ) : (
          <Flex
            bg="naturalLightest"
            borderRadius="full"
            border="2px"
            h="26.48px"
            w="26.48px"
            borderColor="#D3D4D8"
            opacity="90%"
          />
        )}
      </Flex>
      <Flex
        display={{ base: "flex", md: "none" }}
        position="absolute"
        transform="translate(20%, -30%)"
      >
        {checked && image && <RadioButtonChecked2Icon />}
      </Flex>
      <Image
        w="full"
        h="full"
        objectFit="cover"
        borderRadius="12px"
        border="1px solid transparent"
        borderColor={{ base: checked && image && "primaryLight", md: "transparent" }}
        src={image ? image.url : process.env.PUBLIC_URL + "/assets/Image.png"}
      />
    </Box>
  );
};

//<Radio isChecked={isChecked} position="absolute" size="lg" bg="naturalLight" left="50%" top="0" transform="translate(-50%, -50%)" />
