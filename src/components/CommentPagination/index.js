import { LeftIcon, RightIcon } from "../Icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";

export default function CommentPagination(props) {
  let amount = 1;
  let opositeAmount = 6;
  return (
    <Flex>
      <IconButton
        size="sm"
        borderRadius="full"
        bg={props.currentPage === 1 ? "Gray30" : "white"}
        textColor={props.currentPage === 1 ? "naturalDarkest" : "naturalDark"}
        _hover={props.currentPage !== 1 && { bg: "primaryLightest" }}
        shadow={props.currentPage === 1 ? "none" : "lg"}
        fontSize="24px"
        width="40px"
        height="40px"
        icon={
          <RightIcon fill={props.currentPage === 1 ? "#91929D" : "#4F5162"} />
        }
        onClick={() => props.onBack()}
      />
      {CommentPagination &&
        [1, 2, 3, 4, 5].map((_, i) => (
          <>
            {props.currentPage === i + 1 ? (
              <PaginationButton
                color="primary"
                onClick={() => props.onPageChange(i + 1)}
              >
                {i + 1}
              </PaginationButton>
            ) : props.currentPage <= i + 1 && amount++ < 4 ? (
              <PaginationButton onClick={() => props.onPageChange(i + 1)}>
                {i + 1}
              </PaginationButton>
            ) : props.currentPage + 4 >= props.pages &&
              props.currentPage - opositeAmount === i &&
              opositeAmount-- ? (
              <PaginationButton onClick={() => props.onPageChange(i + 1)}>
                {i + 1}
              </PaginationButton>
            ) : props.pages === i + 1 ? (
              <PaginationButton onClick={() => props.onPageChange(i + 1)}>
                {i + 1}
              </PaginationButton>
            ) : (
              <></>
            )}
          </>
        ))}
      <IconButton
        size="sm"
        borderRadius="full"
        bg={props.currentPage === props.pages ? "Gray30" : "white"}
        textColor={
          props.currentPage === props.pages ? "naturalDarkest" : "naturalDark"
        }
        _hover={props.currentPage !== props.pages && { bg: "primaryLightest" }}
        shadow={props.currentPage === props.pages ? "none" : "lg"}
        fontSize="24px"
        width="40px"
        height="40px"
        icon={
          <LeftIcon
            fill={props.currentPage === props.pages ? "#91929D" : "#4F5162"}
          />
        }
        onClick={() => props.onForward()}
      />
    </Flex>
  );
}

const PaginationButton = (props) => {
  return (
    <Flex
      w="40px"
      h="40px"
      justifyContent="center"
      alignItems="center"
      fontSize="16px"
      color="naturalDark"
      _hover={{ color: "primary" }}
      {...props}
      cursor="pointer"
    ></Flex>
  );
};
