import React, { useEffect, useState } from "react";
import { Link as ReactRouter, useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  VStack,
  FormControl,
  useToast,
  Link,
} from "@chakra-ui/react";
import EmailInput from "../../components/auth/EmailInput";

function ResetPasswordRequest() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/all-workouts");
    } else {
      setLoading(false);
    }
  }, [navigate, setLoading]);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${BASE_URL}/auth/password/reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.detail === "Password reset e-mail has been sent.") {
          toast({
            title: "Email sent.",
            description: "A password reset email has been sent",
            position: "top",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          setEmail("");
        }
      });
  };

  return (
    <Flex justify="center" align="center">
      <VStack w="full" h="full" p={10} spacing={5} alignItems="center">
        <Heading size="2xl">Reset Password</Heading>
        <Text>Please enter your email address.</Text>
        <form onSubmit={onSubmit}>
          <SimpleGrid rowGap={6} w="full">
            <GridItem>
              <FormControl>Email</FormControl>
              <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </GridItem>
            <GridItem>
              <Button type="submit" w="full" isLoading={loading}>
                Send Reset Link
              </Button>
            </GridItem>
          </SimpleGrid>
        </form>
        <Link as={ReactRouter} to="/log-in">
          Back to Log In Page
        </Link>
      </VStack>
    </Flex>
  );
}

export default ResetPasswordRequest;
