import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";
import PasswordInput from "../../components/auth/PasswordInput";
import EmailInput from "../../components/auth/EmailInput";
import ResendVerificationEmail from "./ResendVerificationEmail";

function SignUp() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
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

    if (password1 !== password2) {
      toast({
        title: "Error.",
        description: "The two passwords did not match",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const user = {
        email: email,
        password1: password1,
        password2: password2,
      };

      fetch(`${BASE_URL}/auth/registration/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.detail === "Verification e-mail sent.") {
            toast({
              title: "Verification Email Sent.",
              description: "Please check your email to confirm your account",
              position: "top",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          } else {
            setEmail("");
            setPassword1("");
            setPassword2("");
            localStorage.clear();
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
    }
  };

  return (
    <Flex justify="center">
      <VStack w="full" h="full" p={10} spacing={5} alignItems="center">
        <Heading size="2xl">Sign Up</Heading>
        <Text>Start tracking your lifts.</Text>
        <form onSubmit={onSubmit}>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={2}>
              <FormControl>Email</FormControl>
              <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl>Password</FormControl>
              <PasswordInput
                confirmField={false}
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl>Confirm Password</FormControl>
              <PasswordInput
                confirmField={false}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Button type="submit" w="full" isLoading={loading}>
                Sign Up
              </Button>
            </GridItem>
          </SimpleGrid>
        </form>
        <ResendVerificationEmail email={email} />
      </VStack>
    </Flex>
  );
}

export default SignUp;
