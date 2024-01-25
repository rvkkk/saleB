import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Button from '../components/Button'
import Container from '../components/Container'
import { OrderIcon2 } from '../components/Icons'
import Layout from '../components/Layout'

export default function BuySuccess() {
  const orderId = window.location.href.split("/").pop();
  return (
    <Layout>
      <Container>
        <Flex flexDir="column" alignItems="center" py="20" >
          <Image w="300px" src={process.env.PUBLIC_URL + "/assets/buy_success.png"} />
          <Box>
            <Text fontSize="24px" color="naturalBlack" textAlign="center">
            הזמנתך {orderId} התקבלה בהצלחה
            </Text>
            <Text fontWeight="500" direction="rtl" fontSize="32px" lineHeight="38px" textAlign="center">
            !תודה שקנית אצלינו
            </Text>
          </Box>

          <Flex flexDirection="column" gap="6" mt="16" alignItems="center">
            <Button w="252px" h="64px" onClick={() => window.location.href = '/'}>
            חזרה לאתר
            </Button>
            <Button.Secondary w="252px" h="64px" fontSize="20px" color="primary" borderColor="primary"> 
            הורד את הקבלה <OrderIcon2 />
            </Button.Secondary> 
          </Flex>
        </Flex>
      </Container>
    </Layout>
  )
}
