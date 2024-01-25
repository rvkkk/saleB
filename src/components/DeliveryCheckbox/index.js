import { Box, Flex, Text, useRadio } from "@chakra-ui/react";
import { RadioButtonIcon, RadioButtonUncheckedIcon } from "../Icons";

export default function DeliveryCheckbox({
  deliveryName,
  deliveryDesc,
  price,
  ...rest
}) {
  const { getInputProps, getCheckboxProps } = useRadio(rest);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  let isChecked = checkbox["data-checked"] === "";

  return (
    <Box as="label" w="full">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        w="full"
        border="2px solid transparent"
        borderColor="naturalLight"
        borderRadius="12px"
        h="80px"
        px="8"
        filter="drop-shadow(4px 4px 10px rgba(79, 81, 98, 0.05))"
        _checked={{
          borderColor: "primary",
        }}
        py="2"
      >
        <Flex justifyContent="space-between" h="full" alignItems="center">
          <Flex alignItems="center" gap="5">
            <Box>
              {isChecked ? <RadioButtonIcon /> : <RadioButtonUncheckedIcon />}
            </Box>
            <Box>
              <Text
                fontSize="18px"
                fontWeight="medium"
                color="naturalBlack"
                letterSpacing="0.005em"
                lineHeight="130%"
              >
                {deliveryName}
              </Text>
              <Text
                fontSize="16px"
                color="naturalBlack"
                letterSpacing="0.005em"
                lineHeight="130%"
              >
                {deliveryDesc}
              </Text>
            </Box>
          </Flex>

          <Text color="primary">{price}</Text>
        </Flex>
      </Box>
    </Box>
  );
}
