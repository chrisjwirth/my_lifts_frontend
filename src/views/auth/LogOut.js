import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

function LogOut({ setLoggedIn, demoInProgress, setDemoInProgress }) {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/log-in");
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.clear();
        setLoggedIn(false);
        if (demoInProgress) {
          setDemoInProgress(false);
          navigate("/");
        } else {
          navigate("/log-in");
        }
      });
  };

  return (
    <Flex justify="center">
      <VStack w="full" h="full" p={10} spacing={10} alignItems="center">
        <Heading size="2xl">{demoInProgress ? "End Demo" : "Log Out"}</Heading>
        <Text>Are you sure?</Text>
        <form onSubmit={handleLogout}>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={2}>
              <Button type="submit" w="full">
                {demoInProgress ? "End Demo" : "Log Out"}
              </Button>
            </GridItem>
          </SimpleGrid>
        </form>
      </VStack>
    </Flex>
  );
}

export default LogOut;
