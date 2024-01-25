import React from 'react'
import {Box} from "@chakra-ui/react"

export default function Container({children}) {
  return (
    <Box mx="auto" w="full">
        {children}
    </Box>
  )
}
