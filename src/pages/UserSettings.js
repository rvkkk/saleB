import { Box, Card, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";
import { getSettings } from "../utils/api/api";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
export default function UserSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    if (!fetchedData) {
      setFetchedData(false);
      setLoading(true);

      getSettings().then((res) => {
        setSettings(res);
        setLoading(false);
        setFetchedData(true);
      });
    }
  }, [settings, fetchedData]);

  return (
    <Layout withSidebar>
      {loading ? (
        <Loader />
      ) : (
        <>
        <Box py="20" ml="15%">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="32px" lineHeight="20px" fontWeight="medium" color="naturalBlack">
            פורטפוליו
          </Text>

          {/* <Button variant="outline">
            <Flex alignItems="center" gap="2">
              <FilterIcon />
              <Text fontWeight="normal" fontSize="18px">
                סינון
              </Text>
            </Flex>
          </Button> */}
        </Flex>
      </Box>

      {settings && (
        <>
          <Card bg="white" p="10" borderRadius="30px" shadow="xl">
        <Flex
          alignItems="center"
          borderRadius="8px"
          w="40px"
          h="40px"
          bg="othersLight"
          color="primary"
          justifyContent="center" 
        >
          <Image h="3" src="/assets/eye.png" />
        </Flex>
        <Flex flexDir="column" mt="4">
        <Text fontSize="18px" lineHeight="20px" fontWeight="medium" color="naturalDark">צפיות</Text>
        <Text fontSize="36px" lineHeight="20px" color="naturalBlack">{settings.total_views}</Text>
        <Text fontSize="18px" lineHeight="20px" fontWeight="medium" color="naturalDark">כל יום</Text>
        </Flex>
      </Card>
        </>
      )}
        </>
      )}
    </Layout>
  );
}
