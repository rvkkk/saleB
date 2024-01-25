import { Text, Flex } from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { BigCheckedIcon, BigDefaultIcon, BigPartialIcon, MediumCheckedIcon, MediumDefaultIcon, MediumPartialIcon, SmallCheckedIcon, SmallDefaultIcon, SmallPartialIcon } from "../CheckboxIcons";

export default function Checkbox(props) {
  const [defaultC, setDefaultC] = useState(props.default || props.unChecked ? true : false);
  const [checked, setChecked] = useState(props.checked);
  //const [unChecked, setUnChecked] = useState(props.unChecked)
  useEffect(() => {setChecked(props.checked)}, [])
  return (
    <Flex mt={props.mt} gap="7px" alignItems="center" justifyContent="start" onClick={() => (defaultC && !props.disabled) ? (setDefaultC(false), setChecked(true), props.onChange()) : (checked || props.checked) && (setDefaultC(true), setChecked(false), props.onChange()) }>
    <Flex>{props.size === "small" ? (
props.checked ? <SmallCheckedIcon/>
:
 <SmallDefaultIcon/>
/*:<SmallPartialIcon/>*/

    )
    :
    props.size === "medium" ? (
      (checked) && !props.unChecked ? <MediumCheckedIcon/>
      :
      <MediumDefaultIcon fill="white" _hover={{fill: "#F8FAFF", stroke: "#BED0FB"}} disabled={props.disabled}/>
          )
    :
    (
      (props.checked || checked) && !props.unChecked ? <BigCheckedIcon/>
      :
     <BigDefaultIcon/>
      /*:<BigPartialIcon/>*/
          )}</Flex>
<Text fontWeight={props.fontWeight} fontSize={props.fontSize} lineHeight={props.lineHeight} color={props.color || "naturalBlack"}>{props.text}</Text>
    </Flex>
  );
}

Checkbox.propTypes = {
  size: PropTypes.string,
  default: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  children: PropTypes.any,
  text: PropTypes.string,
};

/*  const [defaultC, setDefaultC] = useState(props.default || props.unChecked ? true : false);
  const [checked, setChecked] = useState(false);
  const [unChecked, setUnChecked] = useState(props.unChecked)
  useEffect(() => {setChecked(props.checked)}, [])
  return (
    <Flex mt={props.mt} gap="7px" alignItems="center" justifyContent="start" onClick={() => (defaultC && !props.disabled) ? (setDefaultC(false), setChecked(true), props.onChange()) : checked && (setDefaultC(true), setChecked(false), props.onChange()) }>
    <Flex>{props.size === "small" ? (
checked && !unChecked ? <SmallCheckedIcon/>
:
defaultC  ? <SmallDefaultIcon/>
:<SmallPartialIcon/>

    )
    :
    props.size === "medium" ? (
      checked && !unChecked ? <MediumCheckedIcon/>
      :
      defaultC || unChecked ? <MediumDefaultIcon fill="white" _hover={{fill: "#F8FAFF", stroke: "#BED0FB"}} disabled={props.disabled}/>
      :<MediumPartialIcon/>
          )
    :
    (
      checked && !unChecked ? <BigCheckedIcon/>
      :
      defaultC ? <BigDefaultIcon/>
      :<BigPartialIcon/>
          )}</Flex>
<Text fontWeight={props.fontWeight} fontSize={props.fontSize} lineHeight={props.lineHeight} color={props.color || "naturalBlack"}>{props.text}</Text>
    </Flex>*/