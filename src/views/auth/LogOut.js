import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

const LogOut = props => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/log-in");
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = e => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/v1/dj-rest-auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        localStorage.clear();
        props.setLoggedIn(false);
        navigate("/log-in");
      });
  };

  return (
    <Flex justify="Center" h={[300, 400, 500]}>
      <VStack w="full" h="full" p={10} spacing={10} alignItems="center">
        <Heading size="2xl">Log Out</Heading>
        <Text>Are you sure?</Text>
        <form onSubmit={handleLogout}>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={2}>
              <Button type="submit" w="full">
                Log Out
              </Button>
            </GridItem>
          </SimpleGrid>
        </form>
      </VStack>
    </Flex>
  );
};

export default LogOut;
