import { useState } from "react";
import { Box, Button, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import ContactCard from "../components/ContactCard";
import Container from "../components/Container";
import { SendIcon } from "../components/Icons";
import Input from "../components/Input";
import Layout from "../components/Layout";
import TextArea from "../components/TextArea";
import Checkbox from "../components/CheckBox";
import { routes } from "../routes";
import { addContactForm } from "../utils/api/contactUsForms";
import { addToMailingList } from "../utils/api/mailingList";
import Loader from "../components/Loader";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [getEmail, setGetEmail] = useState(true);
  const [didSent, setDidSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidName, setInvalidName] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidSubject, setInvalidSubject] = useState("");
  const [invalidMessage, setInvalidMessage] = useState("");

  const breadcrumb = [
    { name: "דף הבית", href: routes.HOME.path },
    { name: "עזרה", href: routes.About.path },
    { name: "שירות לקוחות", href: routes.FAQ.path },
  ];

  const handleEmailChange = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) setInvalidEmail('כתובת דוא"ל אינה תקינה');
    else setInvalidEmail("");
  };

  const handleForm = () => {
    handleEmailChange(email);
    if (name === "") setInvalidName("שדה חובה");
    if (subject === "") setInvalidSubject("שדה חובה");
    if (message === "") setInvalidMessage("שדה חובה");
    if (email === "") setInvalidEmail("שדה חובה");
    if (
      name !== "" &&
      email !== "" &&
      subject !== "" &&
      message !== "" &&
      !invalidEmail
    ) {
      setDidSent(false);
      setIsLoading(true);
      addContactForm(name, email, subject, message)
        .then((res) => {
          setDidSent(true);
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          setIsLoading(false);
          if (getEmail)
            addToMailingList(email)
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Layout breadcrumb={breadcrumb}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box
            h="274px"
            borderRadius="30px"
            w="98%"
            bg="contactBannerBg"
            mx="auto"
            maxW="1808px"
            position="relative"
          >
            <Image
              position="absolute"
              maxW="1143.76px"
              h="full"
              borderRightRadius="30px"
              right="0"
              src={process.env.PUBLIC_URL + "/assets/contact_banner_bg.png"}
            />
            <Flex
              justifyContent="center"
              position="relative"
              w="full"
              pt="16"
              dir="rtl"
              h="full"
            >
              <Text
                fontSize="38px"
                fontWeight="500"
                letterSpacing="0.02em"
                textAlign="center"
                color="white"
              >
                כל הדרכים ליצירת קשר
              </Text>
            </Flex>

            <Flex
              borderRadius="8px"
              gap="8"
              h="64px"
              w="full"
              justifyContent="center"
              position="absolute"
              bottom="0px"
              dir="rtl"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <ContactCard phone="972509409200+" imageUrl={process.env.PUBLIC_URL + "/assets/19.png"} />
              <ContactCard
                email="salebid@salebid.com"
                imageUrl={process.env.PUBLIC_URL + "/assets/39.png"}
              />
              <ContactCard text="Tel-Aviv, Israel" imageUrl={process.env.PUBLIC_URL + "/assets/38.png"} />
            </Flex>
          </Box>

          <Spacer h="180px" />
          <Container>
            <Flex flexDir="column" gap="6" dir="rtl" w="622px" mx="auto">
              <Input
                placeholder="שם מלא"
                required
                isInvalid={invalidName !== ""}
                isInvalidMessage={invalidName}
                label="שם מלא"
                onChange={(e) => {
                  setName(e.target.value);
                  setInvalidName("");
                }}
                value={name}
              />
              <Input
                placeholder={"אימייל"}
                required
                isInvalid={invalidEmail !== ""}
                isInvalidMessage={invalidEmail}
                label="מייל"
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleEmailChange(email);
                }}
                value={email}
              />
              <Input
                placeholder={"כותרת"}
                isInvalid={invalidSubject !== ""}
                isInvalidMessage={invalidSubject}
                required
                label="תיאור"
                onChange={(e) => {
                  setSubject(e.target.value);
                  setInvalidSubject("");
                }}
                value={subject}
              />
              <TextArea
                placeholder="כתוב כאן את סיבה הפנייה"
                isInvalid={invalidMessage !== ""}
                isInvalidMessage={invalidMessage}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setInvalidMessage("");
                }}
                value={message}
              />
              <Checkbox
                size="big"
                checked={getEmail}
                default
                color="naturlDarkest"
                onChange={() => setGetEmail(!getEmail)}
                text="מעוניין לקבל התראות על מבצעים חדשים באתר ישירות למייל"
              ></Checkbox>
              {!didSent && (
                <Flex justifyContent="end">
                  <Button
                    color="white"
                    fontWeight="500"
                    fontSize="20px"
                    bg="primary"
                    _hover={{ bg: "primaryDark" }}
                    w="170px"
                    h="60px"
                    gap="12px"
                    p="20px 40px"
                    onClick={() => (didSent ? console.log("") : handleForm())}
                  >
                    שלח <SendIcon />
                  </Button>
                </Flex>
              )}
              {didSent && (
                <Text textAlign="center" color="green">
                  ההודעה נשלחה בהצלחה
                </Text>
              )}
            </Flex>
            <Spacer h="100px" />
          </Container>
        </>
      )}
    </Layout>
  );
}
