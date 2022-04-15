import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function ResetPassword() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const toast = useToast();

  const { uid, token } = useParams();

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
      setLoading(false);
    } else {
      const user = {
        uid: uid,
        token: token,
        new_password1: password1,
        new_password2: password2,
      };

      fetch(`${BASE_URL}/auth/password/reset/confirm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (
            data.detail === "Password has been reset with the new password."
          ) {
            toast({
              title: "Success.",
              description: "Please log in with the new password",
              position: "top",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            navigate("/log-in");
          } else {
            setPassword1("");
            setPassword2("");
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
        <Heading size="2xl">Reset Password</Heading>
        <Text>Enter your new password.</Text>
        <form onSubmit={onSubmit}>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
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
                confirmField={true}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Button type="submit" w="full" isLoading={loading}>
                Reset Password
              </Button>
            </GridItem>
          </SimpleGrid>
        </form>
      </VStack>
    </Flex>
  );
}

export default ResetPassword;
