import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function InfoBox({imgUrl, title, desc, link}) {
  return (
    <Flex dir="rtl" flexDir="column" alignItems="center" borderRadius="3xl" bg="white" pt={{base: "35px", lg:"30px"}} pb={{base:"20px", "2xl":"30px"}} px={{base:"10px", "2xl":"60px"}} w={["320px", "360px", "360px", "320px", "360px", "426px"]} maxW="100%" gap="6">
        <Image w="120px" src={imgUrl} />
        <Box textAlign="center">
            <Text fontSize="20px" fontWeight="semibold" textColor="primary">{title}</Text>
            <Text fontSize="16px" color="naturalBlack">{desc}</Text>
            <Text onClick={link} cursor="pointer" fontSize="14px" fontWeight="semibold" color="naturalDarkest">לפרטים נוספים {'>'}</Text>
        </Box>
    </Flex>
  )
}
