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

function LogIn({ setLoggedIn }) {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      password: password,
    };

    fetch(`${BASE_URL}/auth/login/`, {
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
          setPassword("");
          localStorage.clear();
          setLoggedIn(false);
          setErrors(true);
        }
      });
  };

  return (
    <Flex justify="Center" h={[300, 400, 500]}>
      <VStack w="full" h="full" p={10} spacing={10} alignItems="center">
        {loading === false && <Heading size="2xl">Log In</Heading>}
        {errors === true && (
          <Heading size="2xl">Cannot Log In with Provided Credentials</Heading>
        )}
        <Text>What will your next lift be?</Text>
        {loading === false && (
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
              <GridItem colSpan={2}>
                <FormControl>Password</FormControl>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    name="password"
                    type={show ? "text" : "password"}
                    value={password}
                    placeholder="Enter Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
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
                  Log In
                </Button>
              </GridItem>
            </SimpleGrid>
          </form>
        )}
      </VStack>
    </Flex>
  );
}

export default LogIn;
