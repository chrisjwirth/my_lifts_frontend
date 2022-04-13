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
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

function SignUp({ setLoggedIn }) {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState(false);
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
        if (data.key) {
          localStorage.clear();
          localStorage.setItem("token", data.key);
          setLoggedIn(true);
          navigate("/all-workouts");
        } else {
          setEmail("");
          setPassword1("");
          setPassword2("");
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <Flex justify="center">
      <VStack w="full" h="full" p={10} spacing={10} alignItems="center">
        <Heading size="2xl">Sign Up</Heading>
        <Text>Start tracking your lifts.</Text>
        <form onSubmit={onSubmit}>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={2}>
              <FormControl>Email</FormControl>
              <Input
                name="email"
                type="email"
                value={email}
                placeholder="jack@chinchilla.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl>Password</FormControl>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  name="password"
                  type={show ? "text" : "password"}
                  value={password1}
                  placeholder="Enter Password"
                  required
                  onChange={(e) => setPassword1(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl>Confirm Password</FormControl>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  name="password"
                  type={show ? "text" : "password"}
                  value={password2}
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </GridItem>
            <GridItem colSpan={2}>
              <Button type="submit" w="full">
                Sign Up
              </Button>
            </GridItem>
          </SimpleGrid>
        </form>
      </VStack>
    </Flex>
  );
}

export default SignUp;
