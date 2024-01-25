import { Box, Flex, Radio, Text, useRadio } from "@chakra-ui/react";
import { RadioButtonIcon, RadioButtonUncheckedIcon } from "../Icons";

export default function CustomRadio({ w="190px", h="68px", checked, onClick, children, ...rest }) {
  const { getInputProps, getCheckboxProps } = useRadio(rest);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  let isChecked = checkbox["data-checked"] === "";

  return (
    <Box as="label" onClick={() => onClick()}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="12px"
        px={w ==="190px" ? "6" : "4"}
        bg="naturalLightest"
        w={w} h={h}
        _checked={{bg: "othersLight"}}
        py="2"
      >
        <Flex justifyContent="space-between" h="full" alignItems="center">
          <Box>
            {isChecked ? <RadioButtonIcon /> : <RadioButtonUncheckedIcon />}
          </Box>
          <Box>{children}</Box>
        </Flex>
      </Box>
    </Box>
  );
}
