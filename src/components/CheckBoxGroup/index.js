import { CheckboxGroup, Stack } from "@chakra-ui/react";
import React from "react";
import Checkbox from "../CheckBox";

export default function CheckBoxGroup({
  list = [],
  title,
  deleteTag,
  value,
  defaultValue,
  addTag,
}) {
  return (
    <CheckboxGroup
      colorScheme="green"
      defaultValue={defaultValue}
      value={value}
    >
      <Stack spacing="2.5" direction="column">
        {list.map((text, key) => (
          deleteTag && deleteTag === text ? 
          <Checkbox
            key={key}
            text={text}
            size="medium"
            fontSize="14px"
            lineHeight="18px"
            fontWeight="normal"
            checked={false}
            //unChecked={(deleteTag && deleteTag === text) ? true : false}
            default={true}
            onChange={() => addTag({ title: title, text: text })}
          ></Checkbox>
          :
          <Checkbox
            key={key}
            text={text}
            size="medium"
            fontSize="14px"
            lineHeight="18px"
            fontWeight="normal"
            default={true}
            onChange={() => addTag({ title: title, text: text })}
          ></Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
}


/* return (
    <CheckboxGroup
      colorScheme="green"
      defaultValue={defaultValue}
      value={value}
    >
      <Stack spacing="2.5" direction="column">
        {list.map((text, key) => (
          <Checkbox
            key={key}
            text={text}
            size="medium"
            fontSize="14px"
            lineHeight="18px"
            fontWeight="normal"
            unChecked={(deleteTag && deleteTag === text) ? true : false}
            default={true}
            onChange={() => addTag({ title: title, text: text })}
          ></Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );*/