import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

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
  }, [navigate, setLoading]);

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
      .then(() => {
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
      <VStack w="full" h="full" p={10} spacing={5} alignItems="center">
        <Heading size="2xl">{demoInProgress ? "End Demo" : "Log Out"}</Heading>
        <Text>Are you sure?</Text>
        <form onSubmit={handleLogout}>
          <Button type="submit" w="full" isLoading={loading}>
            {demoInProgress ? "End Demo" : "Log Out"}
          </Button>
        </form>
      </VStack>
    </Flex>
  );
}

export default LogOut;
