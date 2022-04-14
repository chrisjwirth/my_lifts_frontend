import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  useToast,
  VStack,
} from "@chakra-ui/react";

function SignUpVerification() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const toast = useToast();

  const { key } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/all-workouts");
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${BASE_URL}/auth/registration/verify-email/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: key }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.detail === "ok") {
          toast({
            title: "Email Address Confirmed.",
            description: "Please log in",
            position: "top",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/log-in");
        } else {
          toast({
            title: "Error.",
            description: "Please try again",
            position: "top",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Flex justify="center">
      <VStack w="full" h="full" p={10} spacing={5} alignItems="center">
        <Heading size="2xl" textAlign="center">
          Confirm Email Address
        </Heading>
        <form onSubmit={onSubmit}>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={2}>
              <Button type="submit" w="full" isLoading={loading}>
                Confirm
              </Button>
            </GridItem>
          </SimpleGrid>
        </form>
      </VStack>
    </Flex>
  );
}

export default SignUpVerification;
